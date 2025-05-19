 import express from 'express';
 import cors from 'cors';
 import pool from './config/db.js'; // Assuming you have a db.js file for database connection
 import productRouter from './Routes/productRoute.js';
 import path from 'path';
 import warrantyRouter from './Routes/warrantyRouter.js';
 import brandRouter from './Routes/brandRoute.js';
 import categoryRouter from './Routes/categoryRoute.js';
 import userRouter from './Routes/userRoute.js'; // Import userRouter
 import 'dotenv/config';
 import cartRouter from './Routes/cartRoute.js'; // Import cartRouter
 import orderRouter from './Routes/orderRoute.js'; // Import orderRouter
 import salesRouter from './Routes/salesRoute.js';




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


app.use('/api/warranties', warrantyRouter);

app.use('/api/brands', brandRouter);

app.use('/api/categories', categoryRouter);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Serve static files (images) from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

app.use('/api/products', productRouter);
app.use('/api/users', userRouter); 
app.use('/api/cart', cartRouter); // Add this line to use the cart routes

// Mount order routes at /order
app.use('/api/order', orderRouter);


//Physical sales 
app.use('/api/sales', salesRouter);

    app.get('/', (req, res) => {
        res.send('API is working...')
    })

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    })