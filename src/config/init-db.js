import mysql from 'mysql2/promise';

async function initializeDatabase() {
  // Create connection without database selected
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kavyachan090905#' // Updated password
  });

  try {
    // Create database if it doesn't exist
    await connection.query('CREATE DATABASE IF NOT EXISTS skincare_analyzer');
    
    // Use the database
    await connection.query('USE skincare_analyzer');

    // Create ingredients_history table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS ingredients_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ingredient_list TEXT NOT NULL,
        analysis_result TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database and tables created successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await connection.end();
  }
}

initializeDatabase(); 