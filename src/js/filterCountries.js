export default function filterCountries(e) {
  const countryCards = document.querySelectorAll(".country");
  //countryCards.forEach((card) => card.classList.remove("country--hide"));
  let filterSelectValue;
  let filterInputValue;

  if (e.target.classList.contains("field__filterSelect")) {
    filterBySelectList();
  } else {
    filterByInput();
  }

  function filterBySelectList() {
    const selectList = document.querySelector(".field__filterUl");
    const selectOption = document.querySelectorAll(".field__filterBtn");
    const filterSelect = document.querySelector(".field__filterSelect");
    selectList.classList.toggle("field__filterUl--hide");

    selectOption.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        filterSelect.textContent = e.target.textContent;
        countryCards.forEach((card) => {
          card.classList.remove("country--hide");
          let btnContent = btn.textContent;
          const countryCardRegionInfo =
            card.childNodes[1].childNodes[2].childNodes[1].textContent;
          btnContent === "America" ? (btnContent = "Americas") : btnContent;
          if (countryCardRegionInfo !== btnContent) {
            card.classList.add("country--hide");
          }
          filterSelectValue = btnContent;
        });
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

  function filterByInput() {
    const searchInput = document.querySelector(".field__searchInput");
    countryCards.forEach((card) => {
      card.classList.remove("country--hide");
      let searchInputContent = searchInput.value;
      const countryCardName = card.childNodes[1].childNodes[0].textContent;
      let flag = true;
      for (let i = 0; i <= countryCardName.length; i++) {
        if (
          searchInputContent.toLocaleLowerCase() ===
          countryCardName.toLocaleLowerCase().slice(0, i)
        ) {
          flag = false;
        }
      }

      if (flag) {
        card.classList.add("country--hide");
      }

      filterInputValue = searchInputContent.toLocaleLowerCase();
    });
  }
}
