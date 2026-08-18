function sayHello() {
  alert("Thanks for visiting my profile!");
}
 
document.getElementById("hello-btn").addEventListener("click", sayHello);
 

const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;
 
themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
 
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});
 

const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");
 
navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});
 

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});
 

const revealEls = document.querySelectorAll(".reveal");
 
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
 
revealEls.forEach((el) => revealObserver.observe(el));
 

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("#main-nav a");
 
const activeLinkObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const link = document.querySelector(
        `#main-nav a[href="#${entry.target.id}"]`
      );
      if (!link) return;
 
      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
 
sections.forEach((section) => activeLinkObserver.observe(section));
 // ================================
// WEBSITE SINH VIÊN
// ================================

let students = JSON.parse(
  localStorage.getItem("students")
) || [
  {
    id: 1,
    name: "Đặng Quốc Anh",
    website: "https://dangquocanh.vercel.app/"
  },
  {
    id: 2,
    name: "Nguyễn Mạnh Trường",
    website: "https://nguyenmanhtruong-k69n.vercel.app/"
  },
  {
    id: 3,
    name: "Phạm Thu Thủy",
    website: "https://thuy2005.vercel.app/"
  }
];


// Lưu dữ liệu
function saveStudents() {
  localStorage.setItem(
    "students",
    JSON.stringify(students)
  );
}


// Hiển thị danh sách
function renderStudents(data = students) {

  const list = document.getElementById("studentList");

  if (!list) return;

  list.innerHTML = "";


  if (data.length === 0) {

    list.innerHTML = `
      <div class="no-student">
        Không tìm thấy sinh viên.
      </div>
    `;

    return;
  }


  data.forEach(student => {

    const item = document.createElement("div");

    item.className = "student-item";


    item.innerHTML = `
      <div class="student-info">

        <h3>${student.name}</h3>

        <a
          href="${student.website}"
          target="_blank"
          rel="noopener noreferrer"
        >
          ${student.website}
        </a>

      </div>

      <div class="student-actions">

        <button onclick="openStudentWebsite('${student.website}')">
          Mở website
        </button>

        <button onclick="editStudent(${student.id})">
          Sửa
        </button>

        <button
          class="delete-btn"
          onclick="deleteStudent(${student.id})"
        >
          Xóa
        </button>

      </div>
    `;


    list.appendChild(item);
  });
}


// Thêm sinh viên
function addStudent() {

  const nameInput =
    document.getElementById("studentName");

  const websiteInput =
    document.getElementById("studentWebsite");


  const name =
    nameInput.value.trim();

  let website =
    websiteInput.value.trim();


  if (!name) {
    alert("Vui lòng nhập tên sinh viên.");
    return;
  }


  if (!website) {
    alert("Vui lòng nhập website.");
    return;
  }


  // Tự động thêm https://
  if (
    !website.startsWith("http://") &&
    !website.startsWith("https://")
  ) {
    website = "https://" + website;
  }


  students.push({
    id: Date.now(),
    name: name,
    website: website
  });


  saveStudents();

  renderStudents();


  nameInput.value = "";
  websiteInput.value = "";

  nameInput.focus();
}


// Mở website
function openStudentWebsite(website) {

  window.open(
    website,
    "_blank",
    "noopener,noreferrer"
  );
}


// Sửa
function editStudent(id) {

  const student =
    students.find(item => item.id === id);


  if (!student) return;


  const newName =
    prompt(
      "Tên sinh viên:",
      student.name
    );


  if (newName === null) return;


  const newWebsite =
    prompt(
      "Website:",
      student.website
    );


  if (newWebsite === null) return;


  if (!newName.trim() || !newWebsite.trim()) {

    alert("Thông tin không được để trống.");

    return;
  }


  let website =
    newWebsite.trim();


  if (
    !website.startsWith("http://") &&
    !website.startsWith("https://")
  ) {
    website = "https://" + website;
  }


  student.name =
    newName.trim();

  student.website =
    website;


  saveStudents();

  renderStudents();
}


// Xóa
function deleteStudent(id) {

  const student =
    students.find(item => item.id === id);


  if (!student) return;


  const confirmed =
    confirm(
      `Bạn có chắc muốn xóa "${student.name}" không?`
    );


  if (!confirmed) return;


  students =
    students.filter(
      item => item.id !== id
    );


  saveStudents();

  renderStudents();
}


// Tìm kiếm
function searchStudents() {

  const input =
    document.getElementById("studentSearch");


  const keyword =
    input.value
      .trim()
      .toLowerCase();


  if (!keyword) {

    renderStudents();

    return;
  }


  const results =
    students.filter(student =>

      student.name
        .toLowerCase()
        .includes(keyword)

      ||

      student.website
        .toLowerCase()
        .includes(keyword)

    );


  renderStudents(results);
}


// Nút thêm
const addStudentButton =
  document.getElementById("addStudentBtn");


if (addStudentButton) {

  addStudentButton.addEventListener(
    "click",
    addStudent
  );
}


// Ô tìm kiếm
const studentSearch =
  document.getElementById("studentSearch");


if (studentSearch) {

  studentSearch.addEventListener(
    "input",
    searchStudents
  );
}


// Khởi động
renderStudents();