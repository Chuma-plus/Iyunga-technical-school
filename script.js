/* =========================================
   STUDENT MANAGEMENT SYSTEM
   ========================================= */


/* Get existing students from localStorage */

let students = JSON.parse(
    localStorage.getItem("students")
) || [];


/* =========================================
   FORM SUBMISSION
   ========================================= */

document
    .getElementById("studentForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const id = document.getElementById("studentId").value;

        const name =
            document.getElementById("name").value;

        const gender =
            document.getElementById("gender").value;

        const email =
            document.getElementById("email").value;

        const phone =
            document.getElementById("phone").value;

        const course =
            document.getElementById("course").value;


        /* UPDATE STUDENT */

        if (id !== "") {

            const student = students.find(
                student => student.id == id
            );

            student.name = name;
            student.gender = gender;
            student.email = email;
            student.phone = phone;
            student.course = course;

            alert("Student updated successfully!");

        }

        /* ADD NEW STUDENT */

        else {

            const newStudent = {

                id: Date.now(),

                name: name,

                gender: gender,

                email: email,

                phone: phone,

                course: course

            };

            students.push(newStudent);

            alert("Student added successfully!");

        }


        saveStudents();

        displayStudents();

        updateDashboard();

        resetForm();

    });


/* =========================================
   SAVE STUDENTS
   ========================================= */

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


/* =========================================
   DISPLAY STUDENTS
   ========================================= */

function displayStudents(studentList = students) {

    const tableBody =
        document.getElementById("studentTableBody");

    tableBody.innerHTML = "";


    if (studentList.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    No students found
                </td>
            </tr>
        `;

        return;
    }


    studentList.forEach(function(student, index) {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${index + 1}</td>

            <td>${student.name}</td>

            <td>${student.gender}</td>

            <td>${student.email}</td>

            <td>${student.phone}</td>

            <td>${student.course}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent(${student.id})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})"
                >
                    Delete
                </button>

            </td>

        `;

        tableBody.appendChild(row);

    });

}


/* =========================================
   EDIT STUDENT
   ========================================= */

function editStudent(id) {

    const student = students.find(
        student => student.id == id
    );

    if (!student) {
        return;
    }


    document.getElementById("studentId").value =
        student.id;

    document.getElementById("name").value =
        student.name;

    document.getElementById("gender").value =
        student.gender;

    document.getElementById("email").value =
        student.email;

    document.getElementById("phone").value =
        student.phone;

    document.getElementById("course").value =
        student.course;


    document.getElementById("submitBtn").textContent =
        "Update Student";


    document
        .getElementById("admission")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   DELETE STUDENT
   ========================================= */

function deleteStudent(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
        return;
    }


    students = students.filter(
        student => student.id != id
    );


    saveStudents();

    displayStudents();

    updateDashboard();

    alert("Student deleted successfully!");

}


/* =========================================
   SEARCH STUDENTS
   ========================================= */

function searchStudents() {

    const searchValue =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    const filteredStudents =
        students.filter(function(student) {

            return (

                student.name
                    .toLowerCase()
                    .includes(searchValue)

                ||

                student.email
                    .toLowerCase()
                    .includes(searchValue)

                ||

                student.course
                    .toLowerCase()
                    .includes(searchValue)

            );

        });


    displayStudents(filteredStudents);

}


/* =========================================
   CLEAR ALL STUDENTS
   ========================================= */

function clearStudents() {

    if (students.length === 0) {

        alert("There are no students to clear.");

        return;
    }


    const confirmation = confirm(
        "Are you sure you want to delete ALL students?"
    );


    if (confirmation) {

        students = [];

        saveStudents();

        displayStudents();

        updateDashboard();

        alert("All student records have been deleted.");

    }

}


/* =========================================
   RESET FORM
   ========================================= */

function resetForm() {

    document
        .getElementById("studentForm")
        .reset();

    document
        .getElementById("studentId")
        .value = "";

    document
        .getElementById("submitBtn")
        .textContent = "Add Student";

}


/* =========================================
   CANCEL EDIT
   ========================================= */

function cancelEdit() {

    resetForm();

}


/* =========================================
   DASHBOARD
   ========================================= */

function updateDashboard() {

    const total =
        students.length;

    const male =
        students.filter(
            student => student.gender === "Male"
        ).length;

    const female =
        students.filter(
            student => student.gender === "Female"
        ).length;


    document.getElementById("totalStudents")
        .textContent = total;

    document.getElementById("maleStudents")
        .textContent = male;

    document.getElementById("femaleStudents")
        .textContent = female;

}


/* =========================================
   INITIAL DISPLAY
   ========================================= */

displayStudents();

updateDashboard();