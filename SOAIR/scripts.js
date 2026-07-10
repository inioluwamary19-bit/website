const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

function openSidebar() {
  sidebar.classList.add("show");
  overlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeSidebar() {
  sidebar.classList.remove("show");
  overlay.classList.remove("show");
  document.body.style.overflow = "";
}

menuBtn.addEventListener("click", openSidebar);
closeBtn.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);

// Optional: close sidebar when a link is clicked
document.querySelectorAll(".sidebar-links a").forEach(link => {
  link.addEventListener("click", closeSidebar);
});