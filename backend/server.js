import express from 'express';
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const dbConfig = {
    user: 'diegoAdmin',
    password: '123',
    server: 'localhost',
    database: 'Diego',
    options: {
        trustServerCertificate: true
    }
};

sql.connect(dbConfig).then(pool => {
    if (pool.connected) {
        console.log('Connected to SQL Server');
    }

    app.get('/api/data', async (req, res) => {
        try {
            const result = await pool.request().query('SELECT * FROM Videojuegos');
            res.json(result.recordset);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

}).catch(err => console.error('Database connection failed:', err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
