import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = join(__dirname, '../../data/trustchain.db');

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = join(__dirname, '../../data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Create database connection
export function createConnection() {
  return new sqlite3.Database(DB_PATH);
}

// Initialize database with tables
export async function initDatabase() {
  await ensureDataDirectory();
  
  return new Promise((resolve, reject) => {
    const db = createConnection();
    
    // Create reports table
    const createReportsTable = `
      CREATE TABLE IF NOT EXISTS reports (
        id TEXT PRIMARY KEY,
        message TEXT NOT NULL,
        txId TEXT UNIQUE NOT NULL,
        timestamp INTEGER NOT NULL,
        isAnonymous BOOLEAN NOT NULL DEFAULT 0,
        policeRef TEXT,
        ipfsCid TEXT,
        incidentDate TEXT,
        status TEXT DEFAULT 'confirmed',
        accountAddress TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    // Create indexes for better performance
    const createIndexes = [
      'CREATE INDEX IF NOT EXISTS idx_reports_timestamp ON reports(timestamp)',
      'CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status)',
      'CREATE INDEX IF NOT EXISTS idx_reports_txId ON reports(txId)',
      'CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at)'
    ];
    
    db.serialize(() => {
      db.run(createReportsTable, (err) => {
        if (err) {
          console.error('Error creating reports table:', err);
          reject(err);
          return;
        }
      });
      
      // Create indexes
      createIndexes.forEach(indexQuery => {
        db.run(indexQuery, (err) => {
          if (err) {
            console.error('Error creating index:', err);
          }
        });
      });
      
      console.log('Database tables and indexes created successfully');
    });
    
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Database helper functions
export function runQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    const db = createConnection();
    db.run(query, params, function(err) {
      db.close();
      if (err) {
        reject(err);
      } else {
        resolve({ 
          id: this.lastID, 
          changes: this.changes 
        });
      }
    });
  });
}

export function getQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    const db = createConnection();
    db.get(query, params, (err, row) => {
      db.close();
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

export function allQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    const db = createConnection();
    db.all(query, params, (err, rows) => {
      db.close();
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
