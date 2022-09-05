export default function filterCountries(btnContent, inputValue) {
  const countryCards = document.querySelectorAll(".country");

  countryCards.forEach((card) => {
    if (btnContent === "" && inputValue === "") {
      countryCards.forEach((card) => card.classList.remove("country--hide"));
      return;
    }
    const countryCardRegionInfo =
      card.childNodes[1].childNodes[2].childNodes[1].textContent;
    const countryCardName = card.childNodes[1].childNodes[0].textContent;

    btnContent === "America" ? (btnContent = "Americas") : btnContent;

    if (btnContent === "" && inputValue !== "") {
      isThereACountry(inputValue, countryCardName)
        ? card.classList.add("country--hide")
        : card.classList.remove("country--hide");
    } else if (btnContent !== "" && inputValue === "") {
      countryCardRegionInfo !== btnContent
        ? card.classList.add("country--hide")
        : card.classList.remove("country--hide");
    } else {
      !isThereACountry(inputValue, countryCardName) &&
      countryCardRegionInfo === btnContent
        ? card.classList.remove("country--hide")
        : card.classList.add("country--hide");
    }
  });

  function isThereACountry(value, name) {
    let flag = true;
    for (let i = 0; i <= name.length; i++) {
      if (value.toLocaleLowerCase() === name.toLocaleLowerCase().slice(0, i)) {
        flag = false;
      }
    }
    return flag;
  }
}
