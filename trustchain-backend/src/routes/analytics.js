import express from 'express';
import { allQuery } from '../database/init.js';

const router = express.Router();

// GET /api/analytics - Get analytics data
router.get('/', async (req, res) => {
  try {
    // Get total reports count
    const totalReportsResult = await allQuery('SELECT COUNT(*) as count FROM reports');
    const totalReports = totalReportsResult[0]?.count || 0;
    
    // Get reports from this month
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);
    const monthTimestamp = currentMonth.getTime();
    
    const monthlyReportsResult = await allQuery(
      'SELECT COUNT(*) as count FROM reports WHERE timestamp >= ?',
      [monthTimestamp]
    );
    const reportsThisMonth = monthlyReportsResult[0]?.count || 0;
    
    // Get anonymous reports count
    const anonymousReportsResult = await allQuery(
      'SELECT COUNT(*) as count FROM reports WHERE isAnonymous = 1'
    );
    const anonymousReports = anonymousReportsResult[0]?.count || 0;
    
    // Get reports with evidence count
    const evidenceReportsResult = await allQuery(
      'SELECT COUNT(*) as count FROM reports WHERE ipfsCid IS NOT NULL AND ipfsCid != ""'
    );
    const reportsWithEvidence = evidenceReportsResult[0]?.count || 0;
    
    // Get recent activity (last 10 reports)
    const recentActivityResult = await allQuery(`
      SELECT id, message, timestamp, isAnonymous, status, created_at
      FROM reports 
      ORDER BY timestamp DESC 
      LIMIT 10
    `);
    
    const recentActivity = recentActivityResult.map(report => ({
      ...report,
      isAnonymous: Boolean(report.isAnonymous),
      // Truncate message for preview
      message: report.message.length > 100 
        ? report.message.substring(0, 100) + '...' 
        : report.message
    }));
    
    // Get reports by status
    const statusStatsResult = await allQuery(`
      SELECT status, COUNT(*) as count 
      FROM reports 
      GROUP BY status
    `);
    
    const statusStats = statusStatsResult.reduce((acc, row) => {
      acc[row.status] = row.count;
      return acc;
    }, {});
    
    // Get daily report counts for the last 30 days
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const dailyStatsResult = await allQuery(`
      SELECT 
        DATE(timestamp/1000, 'unixepoch') as date,
        COUNT(*) as count
      FROM reports 
      WHERE timestamp >= ?
      GROUP BY DATE(timestamp/1000, 'unixepoch')
      ORDER BY date DESC
    `, [thirtyDaysAgo]);
    
    const analytics = {
      totalReports,
      reportsThisMonth,
      anonymousReports,
      reportsWithEvidence,
      recentActivity,
      statusStats: {
        pending: statusStats.pending || 0,
        confirmed: statusStats.confirmed || 0,
        failed: statusStats.failed || 0
      },
      dailyStats: dailyStatsResult,
      lastUpdated: new Date().toISOString()
    };
    
    res.json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

// GET /api/analytics/summary - Get quick summary stats
router.get('/summary', async (req, res) => {
  try {
    const totalReportsResult = await allQuery('SELECT COUNT(*) as count FROM reports');
    const totalReports = totalReportsResult[0]?.count || 0;
    
    const confirmedReportsResult = await allQuery(
      'SELECT COUNT(*) as count FROM reports WHERE status = "confirmed"'
    );
    const confirmedReports = confirmedReportsResult[0]?.count || 0;
    
    const anonymousReportsResult = await allQuery(
      'SELECT COUNT(*) as count FROM reports WHERE isAnonymous = 1'
    );
    const anonymousReports = anonymousReportsResult[0]?.count || 0;
    
    res.json({
      totalReports,
      confirmedReports,
      anonymousReports,
      successRate: totalReports > 0 ? ((confirmedReports / totalReports) * 100).toFixed(1) : 0
    });
  } catch (error) {
    console.error('Error fetching summary analytics:', error);
    res.status(500).json({ error: 'Failed to fetch summary analytics' });
  }
});

export default router;
