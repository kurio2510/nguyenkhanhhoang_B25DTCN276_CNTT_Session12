var students = [];

function generateId() {
  return "S" + Date.now();
}

function validateStudent(data) {
  if (!data.name || data.name.trim() === "") return "Tên không hợp lệ";
  if (isNaN(data.age) || data.age < 16 || data.age > 60)
    return "Tuổi phải từ 16-60";
  if (isNaN(data.gpa) || data.gpa < 0 || data.gpa > 10)
    return "GPA từ 0-10";
  if (data.status !== "active" && data.status !== "inactive")
    return "Status phải active hoặc inactive";
  return null;
}

function createStudent() {
  var name = prompt("Name:");
  var age = +prompt("Age:");
  var gpa = +prompt("GPA:");
  var status = prompt("Status (active/inactive):");

  var error = validateStudent({ name: name, age: age, gpa: gpa, status: status });
  if (error) return alert(error);

  students.push({
    id: generateId(),
    name: name,
    age: age,
    gpa: gpa,
    status: status,
    createdAt: Date.now(),
    updatedAt: null,
    deletedAt: null
  });

  alert("Tạo thành công");
}

function updateStudent() {
  var id = prompt("Nhập ID cần cập nhật:");
  var student = students.find(function (s) {
    return s.id === id;
  });

  if (!student) return alert("Không tìm thấy");

  var name = prompt("Name mới (Enter bỏ qua):");
  var age = prompt("Age mới:");
  var gpa = prompt("GPA mới:");
  var status = prompt("Status mới:");

  if (name) student.name = name;
  if (age) student.age = +age;
  if (gpa) student.gpa = +gpa;
  if (status) student.status = status;

  student.updatedAt = Date.now();
  alert("Cập nhật thành công");
}

function softDeleteStudent() {
  var id = prompt("Nhập ID cần xóa:");
  var student = students.find(function (s) {
    return s.id === id;
  });

  if (!student) return alert("Không tìm thấy");
  if (!confirm("Xác nhận soft delete?")) return;

  student.status = "inactive";
  student.deletedAt = Date.now();
  alert("Đã soft delete");
}

function restoreStudent() {
  var id = prompt("Nhập ID cần khôi phục:");
  var student = students.find(function (s) {
    return s.id === id;
  });

  if (!student) return alert("Không tìm thấy");

  student.status = "active";
  student.deletedAt = null;
  student.updatedAt = Date.now();
  alert("Đã khôi phục");
}

function viewStudents() {
  var data = students.slice();

  var search = prompt("Search theo tên (Enter bỏ qua):");
  if (search) {
    data = data.filter(function (s) {
      return s.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }

  var statusFilter = prompt("Filter status (active/inactive/Enter bỏ qua):");
  if (statusFilter) {
    data = data.filter(function (s) {
      return s.status === statusFilter;
    });
  }

  var sortOrder = prompt("Sort GPA (asc/desc/Enter bỏ qua):");
  if (sortOrder === "asc") {
    data = data.slice().sort(function (a, b) {
      return a.gpa - b.gpa;
    });
  } else if (sortOrder === "desc") {
    data = data.slice().sort(function (a, b) {
      return b.gpa - a.gpa;
    });
  }

  var pageSize = 5;
  var page = 1;
  var totalPages = Math.ceil(data.length / pageSize);

  var action;

  do {
    var start = (page - 1) * pageSize;
    var pageData = data.slice(start, start + pageSize);

    console.clear();
    console.log("Trang:", page, "/", totalPages);
    console.table(pageData);

    action = prompt("First / Last / Next / Prev / Exit");

    if (action === "Next" && page < totalPages) page++;
    if (action === "Prev" && page > 1) page--;
    if (action === "First") page = 1;
    if (action === "Last") page = totalPages;

  } while (action !== "Exit");
}

function analyticsDashboard() {
  var overview = students.reduce(function (acc, s) {
    acc.total++;
    if (s.status === "active") acc.active++;
    else acc.inactive++;
    acc.totalGpa += s.gpa;
    return acc;
  }, { total: 0, active: 0, inactive: 0, totalGpa: 0 });

  console.log("===== DASHBOARD =====");
  console.log("Tổng SV:", overview.total);
  console.log("Active:", overview.active);
  console.log("Inactive:", overview.inactive);

  if (overview.total > 0)
    console.log("GPA TB:", (overview.totalGpa / overview.total).toFixed(2));

  var topGpa = students
    .slice()
    .sort(function (a, b) {
      return b.gpa - a.gpa;
    })
    .slice(0, 5);

  var youngest = students
    .slice()
    .sort(function (a, b) {
      return a.age - b.age;
    })
    .slice(0, 5);

  var risk = students.filter(function (s) {
    return s.gpa === 0 || s.gpa < 3;
  });

  console.log("Top 5 GPA:");
  console.table(topGpa);

  console.log("Top 5 trẻ nhất:");
  console.table(youngest);

  console.log("Sinh viên nguy cơ:");
  console.table(risk);
}

var choice;

do {
  choice = prompt(
`==== STUDENT MANAGER ADVANCED ====
1. Create Student
2. Update Student
3. Soft Delete Student
4. Restore Student
5. View Students
6. Analytics Dashboard
7. Exit`
  );

  switch (choice) {
    case "1":
      createStudent();
      break;
    case "2":
      updateStudent();
      break;
    case "3":
      softDeleteStudent();
      break;
    case "4":
      restoreStudent();
      break;
    case "5":
      viewStudents();
      break;
    case "6":
      analyticsDashboard();
      break;
    case "7":
      alert("Thoát");
      break;
    default:
      alert("Không hợp lệ");
  }
} while (choice !== "7");