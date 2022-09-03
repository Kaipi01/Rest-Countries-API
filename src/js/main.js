let theme = localStorage.getItem("theme");
if (theme === "dark") document.body.classList.add("dark");
else document.body.classList.add("light");

const themeBtn = document.querySelector(".header__changeThemeBtn");
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
const filterSelect = document.querySelector(".field__filterSelect");
filterSelect.addEventListener("click", () => {
  const selectList = document.querySelector(".field__filterUl");
  const selectOption = document.querySelectorAll(".field__filterBtn");
  selectList.classList.toggle("field__filterUl--hide");

  selectOption.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      filterSelect.textContent = e.target.textContent;
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

// ??????????????
// const countryCard = document.querySelectorAll(".country__flag");
// countryCard.forEach((card) => {
//   card.addEventListener("click", (e) => {
//     console.log(e.target);
//     const homeContent = document.querySelector(".main__homeContent");
//     const details = document.querySelector(".main__details");

//     homeContent.classList.add("main__homeContent--hide");
//     details.classList.remove("main__details--hide");
//   });
// });
