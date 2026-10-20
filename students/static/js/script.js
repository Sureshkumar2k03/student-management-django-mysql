const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const ageInput = document.getElementById("age");
const addressInput = document.getElementById("address");
const courseInput = document.getElementById("course");
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");
const searchInput = document.getElementById("search");
const totalCount = document.getElementById("totalCount");
const studentTable = document.getElementById("studentTable");

let allStudents = [];
let editingId = null;   // null = adding a new student, number = editing

// Show students in the table (filtered by the search box)
function renderTable() {
    const text = searchInput.value.trim().toLowerCase();
    const shown = allStudents.filter(s => s.name.toLowerCase().includes(text));

    studentTable.innerHTML = "";

    shown.forEach(student => {
        const row = document.createElement("tr");

        [student.id, student.name, student.email, student.phone,
         student.age ?? "", student.address, student.course].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actions = document.createElement("td");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => startEdit(student.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteStudent(student.id);

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        row.appendChild(actions);
        studentTable.appendChild(row);
    });

    totalCount.textContent = allStudents.length;
}

// READ: GET /api/students/
function loadStudents() {
    fetch("/api/students/")
        .then(response => response.json())
        .then(students => {
            allStudents = students;
            renderTable();
        });
}

function clearForm() {
    form.reset();
    editingId = null;
    saveBtn.textContent = "Save Student";
}

// Fill the form with the student's data so it can be edited
function startEdit(id) {
    const s = allStudents.find(st => st.id === id);

    nameInput.value = s.name;
    emailInput.value = s.email;
    phoneInput.value = s.phone;
    ageInput.value = s.age ?? "";
    addressInput.value = s.address;
    courseInput.value = s.course;

    editingId = id;
    saveBtn.textContent = "Update Student";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// CREATE (POST) or UPDATE (PUT), depending on editingId
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const student = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        age: ageInput.value,
        address: addressInput.value,
        course: courseInput.value
    };

    const url = editingId ? `/api/students/${editingId}/` : "/api/students/";
    const method = editingId ? "PUT" : "POST";

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            clearForm();
            loadStudents();
        });
});

// DELETE: DELETE /api/students/<id>/
function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete?")) {
        return;
    }

    fetch(`/api/students/${id}/`, { method: "DELETE" })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (editingId === id) {
                clearForm();
            }
            loadStudents();
        });
}

clearBtn.addEventListener("click", clearForm);
searchInput.addEventListener("input", renderTable);

// Load the table when the page opens
loadStudents();
