const themeButton = document.getElementById("theme-btn");
const menuButton = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");


// Dark / Light Mode

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeButton.textContent = "☀️";
    } else {
        themeButton.textContent = "🌙";
    }

});


// Mobile Menu

menuButton.addEventListener("click", function () {

    navLinks.classList.toggle("show");

});


// Close mobile menu after clicking a link

const links = navLinks.querySelectorAll("a");

links.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("show");

    });

});