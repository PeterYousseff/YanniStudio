// navbar transition in scrolling
function changeBg() {
  let navbar = document.getElementById("navbar");
  let scrollValue = window.scrollY;
  if (scrollValue < 100) {
    navbar.classList.remove("bgColor");
  } else {
    navbar.classList.add("bgColor");
  }
}
window.addEventListener("scroll", changeBg);

// visible scroll to top
function visibleScrollToTop() {
  let scrollToTop = document.getElementById("scroll-to-top");
  let scrollValue = window.scrollY;
  if (scrollValue > 500) {
    scrollToTop.classList.remove("visible-scroll-to-top");
  } else {
    scrollToTop.classList.add("visible-scroll-to-top");
  }
}
window.addEventListener("scroll", visibleScrollToTop);

// click on services in navbar
let services = document.getElementById("aMenu");
let other = document.getElementById("other");
services.onclick = function () {
  other.classList.toggle("removeMenu");
};

let toggler = document.querySelector(".toggler");
let menu = document.querySelector(".menu");
toggler.onclick = function () {
  menu.classList.toggle("visibleNavMenu");
};

// slider
var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
});

