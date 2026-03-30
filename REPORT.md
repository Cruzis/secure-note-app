# รายงานสรุปแนวคิด (Conceptual Report) - โปรเจกต์ SecureNote

## 1. JS Engine vs. Runtime
**คำถาม:** JS Engine vs. Runtime: Explain where your JavaScript code is being executed in the Frontend vs. the Backend. Mention the specific JavaScript Engine (e.g., V8) and the Runtime Environment (Browser vs. Node).

**คำตอบ:**
* **JavaScript Engine:** ทั้งโค้ดฝั่ง Frontend และ Backend ในโปรเจกต์นี้ ล้วนต้องอาศัย JavaScript Engine (เช่น V8 Engine ที่อยู่ใน Google Chrome และใน Node.js) เพื่อทำหน้าที่อ่าน (Parse), แปลง (Compile), และประมวลผลคำสั่งภาษา JavaScript ขั้นพื้นฐาน
* **Frontend Runtime (Browser):** โค้ดในไฟล์ `script.js` ของเรา ทำงานอยู่ในสภาพแวดล้อม (Runtime Environment) ของ **เว็บเบราว์เซอร์** ซึ่งเบราว์เซอร์จะเตรียม Web APIs ต่างๆ ไว้ให้ใช้งานเพิ่มเติม (เช่น `DOM`, `fetch`, `setTimeout`) ทำให้ JS Engine สามารถโต้ตอบกับหน้าเว็บและส่ง Request ผ่านเครือข่ายอินเทอร์เน็ตได้
* **Backend Runtime (Node.js):** โค้ดในไฟล์ `server.js` ทำงานอยู่ในสภาพแวดล้อมของ **Node.js** ซึ่งมีชุด API ที่แตกต่างจากเบราว์เซอร์ (เช่น `fs` สำหรับจัดการไฟล์, `http` สำหรับสร้างเซิร์ฟเวอร์, และ `process.env` สำหรับอ่านตัวแปรระบบ) ทำให้ JavaScript สามารถทำงานเสมือนเป็นเซิร์ฟเวอร์หลังบ้านได้

---

## 2.DOM (DOM Manipulation)
**คำถาม:** DOM: Explain how your frontend updates the screen. If using Vanilla JS, describe the DOM tree manipulation. If using React, explain the Virtual DOM concept.

**คำตอบ:**
เนื่องจากโปรเจกต์นี้เลือกใช้ Vanilla JavaScript สำหรับฝั่ง Frontend การอัปเดตหน้าจอจึงเป็นการเข้าไปจัดการกับ Document Object Model (DOM) tree โดยตรงผ่านขั้นตอนดังนี้:
* เมื่อหน้าเว็บถูกโหลด หรือเมื่อมีการเพิ่ม/ลบโน้ต ฟังก์ชัน `fetchNotes()` จะถูกเรียกใช้งาน
* อันดับแรก ฟังก์ชันจะทำการล้างข้อมูลเก่าในกล่องแสดงผล (`notesList`) ออกทั้งหมด โดยการตั้งค่า `innerHTML = ''`
* จากนั้น จะทำการนำข้อมูลโน้ตที่ดึงมาจาก Backend มาวนลูป (Loop) ในแต่ละรอบจะสร้าง HTML element ใหม่ขึ้นมาด้วยคำสั่ง `document.createElement('div')`
* จากนั้นจะนำข้อมูล หัวข้อ (Title), เนื้อหา (Content), และปุ่มลบ (Delete) ใส่เข้าไปใน `div` ใหม่นี้
* ขั้นตอนสุดท้ายคือการนำ element ที่สร้างและใส่ข้อมูลเสร็จแล้ว ไปแปะเชื่อมเข้ากับ DOM tree หลักบนหน้าเว็บด้วยคำสั่ง `notesList.appendChild(noteDiv)` วิธีนี้ทำให้หน้าจอแสดงข้อมูลใหม่ได้ทันทีในรูปแบบไดนามิก โดยที่ผู้ใช้ไม่ต้องกดรีเฟรชหน้าเว็บเลย

---

## 3. วงจร HTTP/HTTPS Request/Response
**คำถาม:** HTTP/HTTPS: Describe the request/response cycle that happens when you click "Submit". What headers are sent? Why is HTTPS important for production, even if you used HTTP locally?

**คำตอบ:**
* **วงจร (Cycle):** เมื่อผู้ใช้กรอกข้อมูลและกดปุ่ม "Submit" ตัว Event Listener จะหยุดพฤติกรรมการรีเฟรชหน้าเว็บแบบปกติของฟอร์มเอาไว้ จากนั้นเบราว์เซอร์ (Client) จะทำการสร้าง HTTP `POST` Request ส่งไปหาเซิร์ฟเวอร์ Node.js ของเรา (`http://localhost:3000/api/notes`)
* **Headers:** ใน Request นั้นจะมีการแนบ Header ที่สำคัญไป 2 ตัว คือ:
    1.  `Content-Type: application/json` (เพื่อบอกให้เซิร์ฟเวอร์รู้ว่าข้อมูลที่ส่งไปนั้นอยู่ในรูปแบบ JSON)
    2.  `Authorization: <SECRET_TOKEN>` (โทเค็นความลับที่ใช้สำหรับยืนยันสิทธิ์การใช้งาน)
* **Response:** เมื่อเซิร์ฟเวอร์ Node.js ได้รับ Request ก็จะตรวจสอบโทเค็นว่าถูกต้องหรือไม่ หากถูกต้องก็จะส่งข้อมูลต่อไปบันทึกที่ PocketHost และตอบกลับเบราว์เซอร์ด้วยสถานะ HTTP `201 Created` ซึ่งเมื่อเบราว์เซอร์ได้รับคำตอบว่าสำเร็จ ก็จะสั่งให้รีโหลดข้อมูลและอัปเดต DOM 
* **ความสำคัญของ HTTPS:** ในการพัฒนาบนเครื่องตัวเอง (Localhost) การใช้ HTTP ธรรมดานั้นไม่มีปัญหา แต่เมื่อนำระบบไปใช้งานจริง (Production) บนอินเทอร์เน็ต การใช้ HTTPS (ซึ่งมีการเข้ารหัสข้อมูลด้วย SSL/TLS) เป็นสิ่งจำเป็นอย่างยิ่ง หากไม่เข้ารหัส ข้อมูลความลับอย่าง `SECRET_TOKEN` และเนื้อหาของโน้ตต่างๆ จะถูกส่งผ่านเครือข่ายเป็นข้อความธรรมดา (Plain text) ทำให้ผู้ไม่หวังดีสามารถดักจับและขโมยข้อมูลระหว่างทางได้โดยง่าย (Man-in-the-Middle attack)

---

## 4. ตัวแปรสภาพแวดล้อม (Environment Variables)
**คำถาม:** Environment Variables: Why did we store the SECRET_TOKEN in the backend .env file instead of the frontend code? What would happen if we put it in the frontend?

**คำตอบ:**
* **เหตุผลที่เก็บใน `.env` ฝั่ง Backend:** เราเก็บข้อมูลความลับอย่าง `SECRET_TOKEN` (และ `POCKETHOST_TOKEN`) ไว้ในไฟล์ `.env` ของระบบ Backend เพราะโค้ดในส่วนนี้จะรันอยู่บนเซิร์ฟเวอร์ ซึ่งผู้ใช้งานทั่วไปหรือผู้ไม่หวังดีจะไม่สามารถเข้าถึงหรือมองเห็นไฟล์เหล่านี้ได้ 
* **ความเสี่ยงหากใส่ใน Frontend:** หากเรานำ Token เหล่านี้ไปใส่ไว้ในโค้ดฝั่ง Frontend (เช่น ในไฟล์ `script.js`) โค้ดทั้งหมดจะถูกดาวน์โหลดไปประมวลผลที่เบราว์เซอร์ของผู้ใช้งาน ใครก็ตามที่เปิดหน้าเว็บของเราขึ้นมา ก็สามารถกดเปิด "Developer Tools" (F12) และอ่าน Source Code เพื่อดูรหัสความลับนี้ได้อย่างเปิดเผย
* **ผลกระทบ:** เมื่อแฮกเกอร์ขโมย Token ไปได้ พวกเขาจะไม่จำเป็นต้องใช้งานผ่านหน้าเว็บที่เราสร้างขึ้นอีกต่อไป แต่จะสามารถส่ง API Request เข้ามาที่ Backend หรือ PocketHost ของเราได้โดยตรง (เช่น ยิงผ่านโปรแกรม Postman) เพื่อแอบดูข้อมูลความลับของคนอื่น, สแปมสร้างโน้ตขยะจำนวนมหาศาล, หรือแม้แต่สั่งลบข้อมูลโน้ตทั้งหมดในฐานข้อมูลทิ้งก็สามารถทำได้