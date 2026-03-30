const API_URL = 'http://localhost:3000/api/notes';

// อ้างอิงถึงส่วนต่างๆ บนหน้าเว็บ (DOM Elements)
const noteForm = document.getElementById('noteForm');
const notesList = document.getElementById('notesList');
const errorMessage = document.getElementById('errorMessage');

// ฟังก์ชันแสดง Error บนหน้าเว็บ
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000); // ปิดข้อความเองใน 5 วินาที
}

// 1. GET: ฟังก์ชันดึงโน้ตทั้งหมดมาแสดง
async function fetchNotes() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        notesList.innerHTML = ''; // ล้างข้อความ Loading ออก

        if (data.items && data.items.length > 0) {
            // วนลูปสร้าง HTML สำหรับแต่ละโน้ต
            data.items.forEach(note => {
                const noteDiv = document.createElement('div');
                noteDiv.className = 'note-item';
                noteDiv.innerHTML = `
                    <div>
                        <h3 style="margin-top:0;">${note.title}</h3>
                        <p style="margin-bottom:0;">${note.content}</p>
                    </div>
                    <button class="delete-btn" onclick="deleteNote('${note.id}')">Delete</button>
                `;
                notesList.appendChild(noteDiv);
            });
        } else {
            notesList.innerHTML = '<p>No notes found. Create one!</p>';
        }
    } catch (error) {
        showError('Failed to load notes. Is the backend running?');
    }
}

// 2. POST: ฟังก์ชันสร้างโน้ตใหม่
noteForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // ป้องกันไม่ให้หน้าเว็บรีเฟรช

    const token = document.getElementById('secretToken').value;
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token // ส่ง Token ไปยืนยันตัวตน
            },
            body: JSON.stringify({ title, content })
        });

        const data = await response.json();

        if (response.status === 201) {
            // ล้างฟอร์ม (ยกเว้น Token) และโหลดรายการโน้ตใหม่
            document.getElementById('noteTitle').value = '';
            document.getElementById('noteContent').value = '';
            fetchNotes(); 
        } else {
            // ถ้ารหัสผิด (401) จะมาเข้าเงื่อนไขนี้
            showError(`Error: ${data.error}`);
        }
    } catch (error) {
        showError('Failed to create note.');
    }
});

// 3. DELETE: ฟังก์ชันลบโน้ต
async function deleteNote(id) {
    const token = document.getElementById('secretToken').value;
    
    if (!token) {
        showError('Please enter Secret Token to delete notes.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        });

        if (response.status === 200) {
            fetchNotes(); // อัปเดตหน้าจอใหม่หลังลบเสร็จ
        } else {
            const data = await response.json();
            showError(`Error: ${data.error}`);
        }
    } catch (error) {
        showError('Failed to delete note.');
    }
}

// เรียกใช้ฟังก์ชันดึงโน้ตทันทีที่เปิดหน้าเว็บ
fetchNotes();