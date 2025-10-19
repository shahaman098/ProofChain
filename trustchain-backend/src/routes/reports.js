import express from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { runQuery, getQuery, allQuery } from '../database/init.js';

const router = express.Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation Error',
      details: errors.array()
    });
  }
  next();
};

// GET /api/reports - Get all reports
router.get('/', 
  [
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('offset').optional().isInt({ min: 0 }).withMessage('Offset must be a non-negative integer'),
    query('status').optional().isIn(['pending', 'confirmed', 'failed']).withMessage('Invalid status'),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { limit = 50, offset = 0, status } = req.query;
      
      let query = 'SELECT * FROM reports';
      let params = [];
      
      if (status) {
        query += ' WHERE status = ?';
        params.push(status);
      }
      
      query += ' ORDER BY timestamp DESC LIMIT ? OFFSET ?';
      params.push(parseInt(limit), parseInt(offset));
      
      const reports = await allQuery(query, params);
      
      // Convert boolean fields and parse dates
      const formattedReports = reports.map(report => ({
        ...report,
        isAnonymous: Boolean(report.isAnonymous),
        incidentDate: report.incidentDate ? new Date(report.incidentDate).toISOString() : null
      }));
      
      res.json(formattedReports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      res.status(500).json({ error: 'Failed to fetch reports' });
    }
  }
);

// GET /api/reports/:id - Get specific report
router.get('/:id',
  [
    param('id').isUUID().withMessage('Invalid report ID format')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const report = await getQuery('SELECT * FROM reports WHERE id = ?', [id]);
      
      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }
      
      // Format response
      const formattedReport = {
        ...report,
        isAnonymous: Boolean(report.isAnonymous),
        incidentDate: report.incidentDate ? new Date(report.incidentDate).toISOString() : null
      };
      
      res.json(formattedReport);
    } catch (error) {
      console.error('Error fetching report:', error);
      res.status(500).json({ error: 'Failed to fetch report' });
    }
  }
);

// POST /api/reports - Create new report
router.post('/',
  [
    body('message').isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters'),
    body('txId').isLength({ min: 1 }).withMessage('Transaction ID is required'),
    body('timestamp').isInt({ min: 0 }).withMessage('Timestamp must be a positive integer'),
    body('isAnonymous').isBoolean().withMessage('isAnonymous must be a boolean'),
    body('policeRef').optional().isLength({ max: 100 }).withMessage('Police reference must be under 100 characters'),
    body('ipfsCid').optional().isLength({ max: 100 }).withMessage('IPFS CID must be under 100 characters'),
    body('incidentDate').optional().isISO8601().withMessage('Incident date must be in ISO8601 format'),
    body('status').optional().isIn(['pending', 'confirmed', 'failed']).withMessage('Invalid status'),
    body('accountAddress').optional().isLength({ min: 1, max: 100 }).withMessage('Invalid account address')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const {
        message,
        txId,
        timestamp,
        isAnonymous = false,
        policeRef,
        ipfsCid,
        incidentDate,
        status = 'confirmed',
        accountAddress
      } = req.body;
      
      const id = uuidv4();
      
      // Check if txId already exists
      const existingReport = await getQuery('SELECT id FROM reports WHERE txId = ?', [txId]);
      if (existingReport) {
        return res.status(409).json({ error: 'Report with this transaction ID already exists' });
      }
      
      const insertQuery = `
        INSERT INTO reports (
          id, message, txId, timestamp, isAnonymous, policeRef, 
          ipfsCid, incidentDate, status, accountAddress
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const insertParams = [
        id, message, txId, timestamp, isAnonymous ? 1 : 0, 
        policeRef, ipfsCid, incidentDate, status, 
        isAnonymous ? null : accountAddress
      ];
      
      await runQuery(insertQuery, insertParams);
      
      // Fetch the created report
      const newReport = await getQuery('SELECT * FROM reports WHERE id = ?', [id]);
      
      // Format response
      const formattedReport = {
        ...newReport,
        isAnonymous: Boolean(newReport.isAnonymous),
        incidentDate: newReport.incidentDate ? new Date(newReport.incidentDate).toISOString() : null
      };
      
      res.status(201).json(formattedReport);
    } catch (error) {
      console.error('Error creating report:', error);
      res.status(500).json({ error: 'Failed to create report' });
    }
  }
);

// PATCH /api/reports/:id/status - Update report status
router.patch('/:id/status',
  [
    param('id').isUUID().withMessage('Invalid report ID format'),
    body('status').isIn(['pending', 'confirmed', 'failed']).withMessage('Invalid status')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const result = await runQuery(
        'UPDATE reports SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [status, id]
      );
      
      if (result.changes === 0) {
        return res.status(404).json({ error: 'Report not found' });
      }
      
      // Fetch updated report
      const updatedReport = await getQuery('SELECT * FROM reports WHERE id = ?', [id]);
      
      // Format response
      const formattedReport = {
        ...updatedReport,
        isAnonymous: Boolean(updatedReport.isAnonymous),
        incidentDate: updatedReport.incidentDate ? new Date(updatedReport.incidentDate).toISOString() : null
      };
      
      res.json(formattedReport);
    } catch (error) {
      console.error('Error updating report status:', error);
      res.status(500).json({ error: 'Failed to update report status' });
    }
  }
);

// GET /api/search - Search reports
router.get('/search',
  [
    query('q').isLength({ min: 1, max: 100 }).withMessage('Search query must be between 1 and 100 characters')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { q } = req.query;
      
      const searchQuery = `
        SELECT * FROM reports 
        WHERE message LIKE ? OR policeRef LIKE ?
        ORDER BY timestamp DESC 
        LIMIT 50
      `;
      
      const searchTerm = `%${q}%`;
      const reports = await allQuery(searchQuery, [searchTerm, searchTerm]);
      
      // Format response
      const formattedReports = reports.map(report => ({
        ...report,
        isAnonymous: Boolean(report.isAnonymous),
        incidentDate: report.incidentDate ? new Date(report.incidentDate).toISOString() : null
      }));
      
      res.json(formattedReports);
    } catch (error) {
      console.error('Error searching reports:', error);
      res.status(500).json({ error: 'Failed to search reports' });
    }
  }
);

export default router;
