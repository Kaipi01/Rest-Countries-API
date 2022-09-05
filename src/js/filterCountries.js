export default function filterCountries(btnContent, inputValue) {
  const countryCards = document.querySelectorAll(".country");
  if (btnContent === "" && inputValue === "") {
    countryCards.forEach((card) => card.classList.remove("country--hide"));
  } else if (btnContent === "" && inputValue !== "") {
    filterByInput(inputValue);
  } else if (btnContent !== "" && inputValue === "") {
    filterBySelectList(btnContent);
  } else {
    filterBySelectAndInput(btnContent, inputValue);
  }

  function filterBySelectList(btnContent) {
    countryCards.forEach((card) => {
      const countryCardRegionInfo =
        card.childNodes[1].childNodes[2].childNodes[1].textContent;
      btnContent === "America" ? (btnContent = "Americas") : btnContent;
      if (countryCardRegionInfo !== btnContent) {
        card.classList.add("country--hide");
      } else card.classList.remove("country--hide");
    });
  }

  function filterByInput(inputValue) {
    countryCards.forEach((card) => {
      const countryCardName = card.childNodes[1].childNodes[0].textContent;
      let flag = true;
      for (let i = 0; i <= countryCardName.length; i++) {
        if (
          inputValue.toLocaleLowerCase() ===
          countryCardName.toLocaleLowerCase().slice(0, i)
        ) {
          flag = false;
        }
      }
      if (flag) {
        card.classList.add("country--hide");
      }
    });
  }

  function filterBySelectAndInput(btnContent, inputValue) {
    countryCards.forEach((card) => {
      const countryCardRegionInfo =
        card.childNodes[1].childNodes[2].childNodes[1].textContent;
      const countryCardName = card.childNodes[1].childNodes[0].textContent;
      btnContent === "America" ? (btnContent = "Americas") : btnContent;

      let flag = true;
      for (let i = 0; i <= countryCardName.length; i++) {
        if (
          inputValue.toLocaleLowerCase() ===
          countryCardName.toLocaleLowerCase().slice(0, i)
        ) {
          flag = false;
        }
      }
      if (!flag && countryCardRegionInfo === btnContent) {
        card.classList.remove("country--hide");
      } else card.classList.add("country--hide");
    });
  }
}
