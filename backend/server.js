const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
// ดึงค่า PORT จากไฟล์ .env ถ้าไม่มีให้ใช้ 3000
const PORT = process.env.PORT || 3000;

// อนุญาตให้ Frontend เรียกข้ามโดเมนได้ และให้เซิร์ฟเวอร์อ่านข้อมูล JSON ได้
app.use(cors());
app.use(express.json());

// ข้อมูลเชื่อมต่อ PocketHost
const POCKETHOST_URL = 'https://app-tracking.pockethost.io/api/collections/notes/records';
const POCKETHOST_TOKEN = process.env.POCKETHOST_TOKEN;

// ฟังก์ชันตรวจสอบ SECRET_TOKEN จาก Frontend (ทำ Authorization)
const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // ตรวจสอบว่าตรงกับ SECRET_TOKEN ในไฟล์ .env หรือไม่
    if (!authHeader || authHeader !== process.env.SECRET_TOKEN) {
        return res.status(401).json({ error: 'Unauthorized: Invalid or missing token' });
    }
    next(); // ถ้าถูกต้อง ให้ทำงานต่อไปได้
};

// 1. GET /api/notes: ดึงข้อมูลโน้ตทั้งหมด
app.get('/api/notes', async (req, res) => {
    try {
        const response = await fetch(POCKETHOST_URL);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
});

// 2. POST /api/notes: สร้างโน้ตใหม่ (ต้องยืนยันตัวตนด้วย SECRET_TOKEN)
app.post('/api/notes', authenticateUser, async (req, res) => {
    const { title, content } = req.body;

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${POCKETHOST_TOKEN}`,
            'Content-Type': 'application/json'
        },
        // ส่งข้อมูลไปยัง PocketHost ตามรูปแบบที่กำหนด
        body: JSON.stringify({ title, content, user_id: 2 })
    };

    try {
        const response = await fetch(POCKETHOST_URL, options);
        const data = await response.json();
        
        if (!response.ok) throw new Error('PocketHost error');
        
        res.status(201).json({ message: 'Note created successfully', data });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create note' });
    }
});

// 3. DELETE /api/notes/:id: ลบโน้ต (ต้องยืนยันตัวตนด้วย SECRET_TOKEN)
app.delete('/api/notes/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const url = `${POCKETHOST_URL}/${id}`;

    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${POCKETHOST_TOKEN}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete note' });
    }
});

// สั่งให้เซิร์ฟเวอร์เริ่มทำงาน
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});