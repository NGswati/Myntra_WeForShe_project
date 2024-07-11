const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { markAsUntransferable } = require('worker_threads');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from these directories
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/data', express.static(path.join(__dirname, 'data')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.get('/inde', (req, res) => {
    res.sendFile(path.join(__dirname, 'inde.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});
app.get('/bag', (req, res) => {
    res.sendFile(path.join(__dirname, 'bag.html'));
});
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'profile.html'));
});



const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'myntra_data',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.post('/api/negotiate', async (req, res) => {
    const { productId, userId, userOffer, argument } = req.body;

    try {
        const connection = await pool.getConnection();

        const [productRows] = await connection.execute(
            'SELECT base_price, min_price FROM products WHERE id = ?',
            [productId]
        );

        if (productRows.length === 0) {
            connection.release();
            return res.status(404).json({ error: 'Product not found' });
        }

        const { base_price: basePrice, min_price: minPrice } = productRows[0];
        const [userRows] = await connection.execute(
            'SELECT SoTD_count, total_purchase_count, total_credit_points FROM users WHERE id = ?',
            [userId]
        );
        if (userRows.length === 0) {
            connection.release();
            return res.status(404).json({ error: 'User not found' });
        }

        const user = userRows[0];

        let avgReward = 0;

        if (argument === "highSoTD") {
            if (user.SoTD_count<100){
                avgReward = 0.01 * user.SoTD_count/2;
            }
            else{
                avgReward=.9;
            }
        } else if (argument === "loyalCustomer") {
            if (user.total_purchase_count < 100) {
                avgReward = 0.01 * user.total_purchase_count / 2;
            }
            else {
                avgReward = .9;
            }
        } else if (argument === "creditPoints") {
            if ((basePrice - minPrice) < user.total_credit_points){
                avgReward = 1;
            }
            else{
                avgReward=(basePrice-user.total_credit_points)/basePrice;
            }
            
        } else if (argument === "bulkPurchase" && basePrice > 50000) {
            avgReward = 0.7;
        } else {
            avgReward = 0;
        }

        const maxDiscount = basePrice-minPrice;
        const discount = maxDiscount * avgReward;

        let finalPrice = Math.max(basePrice - discount, userOffer, minPrice);
        finalPrice = Math.round(finalPrice * 100) / 100;
        connection.release();

        const response = `Based on your ${argument}, I can offer the product at ₹${finalPrice.toFixed(2)}.`;
        res.json({ finalPrice, response });

    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'An error occurred during negotiation' });
    }
});

app.post('/api/finalize-purchase', async (req, res) => {
    const { productId, userId, finalPrice } = req.body;

    if (!finalPrice) {
        return res.status(400).json({ error: 'Final price is required' });
    }

    try {
        const connection = await pool.getConnection();

        await connection.execute(
            'INSERT INTO orders (user_id, product_id, price) VALUES (?, ?, ?)',
            [userId, productId, finalPrice]
        );

        await connection.execute(
            'UPDATE products SET quantity = quantity - 1 WHERE id = ?',
            [productId]
        );

        connection.release();

        res.json({ message: 'Purchase successful! The item has been added to your bag.' });

    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'An error occurred while finalizing the purchase' });
    }
});


app.post('/update-sotd',async (req, res) => {
    const userId = req.body.userId;
    try {
        const connection = await pool.getConnection();

        const [productRows] = await connection.execute(
            'UPDATE users SET SoTD_count = SoTD_count +1 , total_credit_points= total_credit_points + 4 WHERE id = ?',
            [userId]
            
        );
       
        connection.release();

        res.json({ message: 'Congratulation, your snap is Snap of the Day Now!' });

    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'An error occurred while finalizing the purchase' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


