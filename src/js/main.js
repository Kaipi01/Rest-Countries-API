import filterCountries from "./filterCountries";
import displayCountries from "./displayCountries";

const themeBtn = document.querySelector(".header__changeThemeBtn");
const filterSelect = document.querySelector(".field__filterSelect");
const searchInput = document.querySelector(".field__searchInput");
let btnContent = "";
let inputValue = "";

displayCountries();

let theme = localStorage.getItem("theme");
if (theme === "dark") document.body.classList.add("dark");
else document.body.classList.add("light");

searchInput.addEventListener("input", (e) => {
  inputValue = e.target.value;
  filterCountries(btnContent, inputValue);
});

filterSelect.addEventListener("click", () => {
  const selectList = document.querySelector(".field__filterUl");
  const selectOption = document.querySelectorAll(".field__filterBtn");

  selectList.classList.toggle("field__filterUl--hide");
  selectOption.forEach((btn) =>
    btn.addEventListener("click", () => {
      btnContent = btn.textContent;
      filterSelect.textContent = btnContent;
      filterCountries(btnContent, inputValue);
    })
  );
  window.addEventListener("click", (e) => {
    if (
      !e.target.classList.contains("field__filterUl") &&
      !e.target.classList.contains("field__filterSelect")
    ) {
      selectList.classList.add("field__filterUl--hide");
    }
  });
});

themeBtn.addEventListener("click", () => {
  const themeBtnIcon = document.querySelector(".header__changeThemeBtnIcon");

  if (theme === "dark") {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    themeBtnIcon.name = "moon-outline";
    theme = "light";
  } else {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    themeBtnIcon.name = "moon";
    theme = "dark";
  }
  localStorage.setItem("theme", theme);
});
