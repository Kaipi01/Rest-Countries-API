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

    let flag = true;
    for (let i = 0; i <= countryCardName.length; i++) {
      if (
        inputValue.toLocaleLowerCase() ===
        countryCardName.toLocaleLowerCase().slice(0, i)
      ) {
        flag = false;
      }
    }

    if (btnContent === "" && inputValue !== "") {
      if (flag) {
        card.classList.add("country--hide");
      }
    } else if (btnContent !== "" && inputValue === "") {
      countryCardRegionInfo !== btnContent
        ? card.classList.add("country--hide")
        : card.classList.remove("country--hide");
    } else {
      !flag && countryCardRegionInfo === btnContent
        ? card.classList.remove("country--hide")
        : card.classList.add("country--hide");
    }
  });
}
