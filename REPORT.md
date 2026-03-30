# รายงานสรุปแนวคิด (Conceptual Report) โปรเจกต์ SecureNote

## 1. JS Engine vs. Runtime
**คำถาม:** อธิบายว่าโค้ด JavaScript ของคุณทำงานอยู่ที่ไหนในฝั่ง Frontend และ Backend พร้อมระบุชื่อ JS Engine (เช่น V8) และ Runtime Environment (Browser vs. Node)

**คำตอบ:**
* **JavaScript Engine:** ทั้งโค้ดฝั่ง Frontend และ Backend ในโปรเจกต์นี้ ล้วนต้องอาศัย JavaScript Engine (เช่น V8 Engine ที่อยู่ใน Google Chrome และใน Node.js) เพื่อทำหน้าที่อ่าน (Parse), แปลง (Compile), และประมวลผลคำสั่งภาษา JavaScript ขั้นพื้นฐาน
* **Frontend Runtime (Browser):** โค้ดในไฟล์ `script.js` ของเรา ทำงานอยู่ในสภาพแวดล้อม (Runtime Environment) ของ **เว็บเบราว์เซอร์** ซึ่งเบราว์เซอร์จะเตรียม Web APIs ต่างๆ ไว้ให้ใช้งานเพิ่มเติม (เช่น `DOM`, `fetch`, `setTimeout`) ทำให้ JS Engine สามารถโต้ตอบกับหน้าเว็บและส่ง Request ผ่านเครือข่ายอินเทอร์เน็ตได้
* **Backend Runtime (Node.js):** โค้ดในไฟล์ `server.js` ทำงานอยู่ในสภาพแวดล้อมของ **Node.js** ซึ่งมีชุด API ที่แตกต่างจากเบราว์เซอร์ (เช่น `fs` สำหรับจัดการไฟล์, `http` สำหรับสร้างเซิร์ฟเวอร์, และ `process.env` สำหรับอ่านตัวแปรระบบ) ทำให้ JavaScript สามารถทำงานเสมือนเป็นเซิร์ฟเวอร์หลังบ้านได้

---

## 2. การจัดการ DOM (DOM Manipulation)
**คำถาม:** อธิบายว่าฝั่ง Frontend ของคุณอัปเดตหน้าจออย่างไร หากใช้ Vanilla JS ให้อธิบายการจัดการ DOM tree

**คำตอบ:**
เนื่องจากโปรเจกต์นี้เลือกใช้ Vanilla JavaScript สำหรับฝั่ง Frontend การอัปเดตหน้าจอจึงเป็นการเข้าไปจัดการกับ Document Object Model (DOM) tree โดยตรงผ่านขั้นตอนดังนี้:
* เมื่อหน้าเว็บถูกโหลด หรือเมื่อมีการเพิ่ม/ลบโน้ต ฟังก์ชัน `fetch