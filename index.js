const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Kết nối cơ sở dữ liệu
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'your_database_name'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected...');
});

// API: Lấy danh sách lịch đặt chỗ
app.get('/bookings', (req, res) => {
    db.query('SELECT * FROM Bookings', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// API: Thêm lịch đặt chỗ
app.post('/bookings', (req, res) => {
    const { customerName, date, time } = req.body;
    const sql = 'INSERT INTO Bookings (customerName, date, time) VALUES (?, ?, ?)';
    db.query(sql, [customerName, date, time], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Booking added', id: result.insertId });
    });
});

// API: Cập nhật trạng thái
app.put('/bookings/:id', (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Bookings SET status = ? WHERE id = ?';
    db.query(sql, [status, id], (err) => {
        if (err) throw err;
        res.json({ message: 'Booking status updated' });
    });
});

// API: Xóa lịch đặt chỗ
app.delete('/bookings/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Bookings WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Booking deleted' });
    });
});

// Chạy server
app.listen(3000, () => {
    console.log('Server running on port 3000...');
});
