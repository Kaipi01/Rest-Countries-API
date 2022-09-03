import showHideSelectList from "./showHideSelectList";
import displayCountries from "./displayCountries";

displayCountries();

let theme = localStorage.getItem("theme");
if (theme === "dark") document.body.classList.add("dark");
else document.body.classList.add("light");

const themeBtn = document.querySelector(".header__changeThemeBtn");
const filterSelect = document.querySelector(".field__filterSelect");

filterSelect.addEventListener("click", showHideSelectList);

themeBtn.addEventListener("click", () => {
  if (theme === "dark") {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    theme = "light";
  } else {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    theme = "dark";
  }
  localStorage.setItem("theme", theme);
});
