const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-more-2-line");
}
)

navLinks.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-more-2-line");
})

const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
}

ScrollReveal().reveal(".header_content, .header_btn, .header_image", {
    ...scrollRevealOption,
    origin: "right",
})

ScrollReveal().reveal(".header_image", {
    ...scrollRevealOption,
    delay:500,
})

ScrollReveal().reveal(".header_content h1", {
    ...scrollRevealOption,
    delay:1000,
})

ScrollReveal().reveal(".header_content p", {
    ...scrollRevealOption,
    delay:1500,
})

ScrollReveal().reveal(".header_btn", {
    ...scrollRevealOption,
    delay:2000,
})