const navbar = document.querySelector("#nav");
const navBtn = document.querySelector("#nav-btn");
const up = document.querySelector('.up');
const closeBtn = document.querySelector("#close-btn");
const sidebar = document.querySelector("#sidebar");
const date = document.querySelector("#date");
// add fixed class to navbar
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 80) {
    navbar.classList.add("navbar-fixed");
  } else {
    navbar.classList.remove("navbar-fixed");
  }
});

// arrow-see fixed arrow
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 992) {
    up.classList.add("arrow-see");
  } else {
    up.classList.remove("arrow-see");
  }
});
// show sidebar
navBtn.addEventListener("click", function () {
  sidebar.classList.add("show-sidebar");
});
closeBtn.addEventListener("click", function () {
  sidebar.classList.remove("show-sidebar");
});
// set year
date.innerHTML = new Date().getFullYear();
