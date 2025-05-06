 import express from 'express';
 import cors from 'cors';
 import pool from './config/db.js'; // Assuming you have a db.js file for database connection
 import productRouter from './Routes/productRoute.js';
 import path from 'path';
 import warrantyRouter from './Routes/warrantyRouter.js';
 import brandRouter from './Routes/brandRoute.js';
 import categoryRouter from './Routes/categoryRoute.js';


 //app config
 const app = express();
 const port = 4000; 

 //middleware
    app.use(express.json());
    app.use(cors());

// db connection

pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ MySQL Connection Error: ", err.message);
    } else {
        console.log("✅ MySQL Connected");
        connection.release(); // 🔹 Important: release connection back to pool
    }
});

// API routes
app.use('/api/products', productRouter);

app.use('/api/warranties', warrantyRouter);

app.use('/api/brands', brandRouter);

app.use('/api/categories', categoryRouter);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

    app.get('/', (req, res) => {
        res.send('API is working...')
    })

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    })