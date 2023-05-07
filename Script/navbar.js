// Code to toggle navbar into a hamburger
const hamburger = document.getElementById("hamburger");
const navUl = document.getElementById("nav-ul");

hamburger.addEventListener("click", () => {
    navUl.classList.toggle("show");
}); 