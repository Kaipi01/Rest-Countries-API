export default function showHideSelectList() {
  const selectList = document.querySelector(".field__filterUl");
  const selectOption = document.querySelectorAll(".field__filterBtn");
  const filterSelect = document.querySelector(".field__filterSelect");
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
}
