# 🔒 แอปพลิเคชัน SecureNote

เว็บแอปพลิเคชันแบบ Full-stack ที่ใช้งานง่ายและปลอดภัย อนุญาตให้ผู้ใช้งานที่ได้รับสิทธิ์สามารถสร้าง ดู และลบโน้ตข้อความได้ โปรเจกต์นี้จัดทำขึ้นเพื่อแสดงให้เห็นถึงความเข้าใจที่ชัดเจนเกี่ยวกับสถาปัตยกรรมแบบไคลเอนต์-เซิร์ฟเวอร์ (Client-Server architecture) สภาพแวดล้อมการทำงานของ JavaScript (Execution environment) และโปรโตคอลการสื่อสารที่ปลอดภัย

## 🚀 เทคโนโลยีที่ใช้
- **ส่วนหน้าบ้าน (Frontend):** HTML5, CSS3, Vanilla JavaScript (การจัดการ DOM และ Fetch API)
- **ส่วนหลังบ้าน (Backend):** Node.js, Express.js, CORS, dotenv
- **ฐานข้อมูล (โบนัส):** PocketHost API

## 📁 โครงสร้างโปรเจกต์
```text
secure-note-app/
├── backend/
│   ├── node_modules/
│   ├── .env                 # ไฟล์ตั้งค่าความลับ (ไม่ถูกอัปโหลดขึ้น GitHub)
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js            # ไฟล์หลักสำหรับรัน Node.js
├── frontend/
│   ├── index.html           # หน้าจอผู้ใช้งาน (UI) หลัก
│   ├── style.css            # การตกแต่งหน้าเว็บ
│   └── script.js            # โค้ดการทำงานฝั่งหน้าบ้านและการจัดการ DOM
├──  README.md               # ไฟล์อธิบาย Project และวิธีการใช้งาน
└──  REPORT.md               # ไฟล์รายงานตอบคำถามเชิงแนวคิด

## 🛠️ คู่มือการติดตั้งและตั้งค่า (Installation & Setup Guide)

หากต้องการรันแอปพลิเคชันนี้บนคอมพิวเตอร์ โปรดทำตามขั้นตอนด้านล่างสำหรับทั้งฝั่งหลังบ้านและหน้าบ้าน

### 1. การตั้งค่าฝั่งหลังบ้าน (Node.js Server)

1. เปิด Terminal ของคุณแล้วเข้าไปที่โฟลเดอร์ `backend`:
   ```bash
   cd backend

2. ติดตั้งเครื่องมือ (Dependencies) ที่จำเป็น:
    ```bash
   npm install

3. **การตั้งค่าไฟล์ความลับ:** สร้างไฟล์ชื่อ `.env` ในโฟลเดอร์ `backend` (ห้ามอัปโหลดไฟล์นี้ขึ้น GitHub เด็ดขาด) และเพิ่มตัวแปรระบบดังนี้:
   ```env
   PORT=3000
   SECRET_TOKEN=my_frontend_secret_123
   POCKETHOST_TOKEN=20260301eink

4. สั่งรันเซิร์ฟเวอร์หลังบ้าน:
    ```bash
   node server.js

คุณควรจะเห็นข้อความ: Backend server is running on http://localhost:3000

### 2. การตั้งค่าฝั่งหน้าบ้าน (Client-Side)
1.ตรวจสอบให้แน่ใจว่าเซิร์ฟเวอร์หลังบ้านกำลังรันอยู่ (ทำตามขั้นตอนที่ 1 แล้ว)
2.เข้าไปที่โฟลเดอร์ frontend
3.คุณสามารถรันฝั่งหน้าบ้านได้ 2 วิธี:
   3.1 วิธีที่ A (แนะนำ): คลิกขวาที่ไฟล์ index.html ใน VS Code แล้วเลือก "Open with Live Server" (ต้องติดตั้ง Extension ที่ชื่อ Live Server ก่อน)
   3.2 วิธีที่ B: ดับเบิลคลิกที่ไฟล์ index.html เพื่อเปิดผ่านเว็บเบราว์เซอร์ (เช่น Chrome) ได้เลย
4.วิธีใช้งาน: กรอกรหัส my_frontend_secret_123 ลงในช่อง Secret Token เพื่อยืนยันตัวตนก่อนการเพิ่ม (POST) หรือลบ (DELETE) โน้ต

รายงานสรุปแนวคิด (Conceptual Report)
โปรดดูไฟล์ REPORT.md ที่โฟลเดอร์หลักของโปรเจกต์ สำหรับคำตอบเกี่ยวกับความแตกต่างระหว่าง JS Engine vs. Runtime, การจัดการ DOM, วงจร HTTP/HTTPS Request/Response และความสำคัญของ Environment Variables