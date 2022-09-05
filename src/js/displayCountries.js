import getCountriesData from "./getCountriesData";

export default async function displayCountries() {
  const countriesData = await getCountriesData();
  const homeContent = document.querySelector(".main__homeContent");
  const name = [],
    nativeName = [],
    population = [],
    flag = [],
    region = [],
    subregion = [],
    capital = [],
    languages = [],
    currencies = [],
    tld = [],
    borders = [];

  const arrayOfCCA3 = [];
  for (let i = 0; i < countriesData.length; i++) {
    arrayOfCCA3[i] = countriesData[i].cca3;
  }

  for (let i = 0; i < countriesData.length; i++) {
    for (const key in countriesData[i].name.nativeName) {
      nativeName[i] = countriesData[i].name.nativeName[key].common;
      break;
    }
    let currList = "";
    for (const key in countriesData[i].currencies) {
      currList += `${countriesData[i].currencies[key].name}, `;
    }
    currencies[i] = currList.slice(0, currList.length - 2) || "Does not have";
    let langList = "";
    for (const key in countriesData[i].languages)
      langList += `${countriesData[i].languages[key]}, `;
    languages[i] = langList.slice(0, langList.length - 2) || "Does not have";
    name[i] = countriesData[i].name.common;
    population[i] = countriesData[i].population.toString();
    const populationNumber = [];
    for (let j = 0; j < population[i].length; j++) {
      if (j % 3 === 0 && j != 0) {
        populationNumber.push(`,`);
      }
      populationNumber.push(population[i][population[i].length - j - 1]);
    }
    population[i] = populationNumber.reverse().join("");
    flag[i] = countriesData[i].flags.svg;
    region[i] = countriesData[i].region;
    subregion[i] = countriesData[i].subregion || "Does not have";
    capital[i] = countriesData[i].capital || "Does not have";
    tld[i] = countriesData[i].tld || "Does not have";
    borders[i] = countriesData[i].borders;

    generateCountryCards(i);
  }

  const countryCards = document.querySelectorAll(".country");
  countryCards.forEach((card, index) =>
    card.addEventListener("click", () => {
      showCountryDetails(index);
    })
  );
  countryCards.forEach((card, index) =>
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        showCountryDetails(index);
      }
    })
  );

  document
    .querySelector(".main__homeContentSpin")
    .classList.add("main__homeContentSpin--hide");

  function showCountryDetails(i) {
    const homeInputs = document.querySelector(".main__homeInputs");
    const details = document.querySelector(".main__details");

    homeContent.classList.add("main__homeContent--hide");
    homeInputs.classList.add("main__homeInputs--hide");
    details.classList.remove("main__details--hide");

    const backBtn = document.querySelector(".main__detailsBackBtn");
    backBtn.addEventListener("click", () => {
      details.classList.add("main__details--hide");
      homeContent.classList.remove("main__homeContent--hide");
      homeInputs.classList.remove("main__homeInputs--hide");
    });

    const detailsCountryFlag = document.querySelector(".details__img");
    detailsCountryFlag.src = flag[i];
    detailsCountryFlag.alt = `Flag of ${name[i]}`;
    document.querySelector(".details__name").textContent = name[i];
    const detailsDataInfo = [
      nativeName[i],
      population[i],
      region[i],
      subregion[i],
      capital[i],
      tld[i],
      currencies[i],
      languages[i],
    ];
    const spanElements = document.querySelectorAll(".country__detailsInfoData");
    spanElements.forEach(
      (span, index) => (span.textContent = detailsDataInfo[index])
    );

    const btnsContainer = document.querySelector(
      ".details__borderCountriesBtns"
    );
    const detailMessage = document.querySelector(".details__message");
    detailMessage.classList.add("details__message--hide");
    btnsContainer.textContent = "";

    if (borders[i]) {
      for (let j = 0; j < borders[i].length; j++) {
        const btn = document.createElement("button");
        btn.classList.add("details__borderCountryBtn");
        let countryNameByCCA3;
        for (let k in countriesData) {
          if (countriesData[k].cca3 === borders[i][j]) {
            countryNameByCCA3 = countriesData[k].name.common;
            break;
          }
        }
        btn.textContent = countryNameByCCA3;
        btn.setAttribute("data-cca3", borders[i][j]);
        btnsContainer.append(btn);
      }
    } else {
      detailMessage.classList.remove("details__message--hide");
    }

    const borderCountryBtns = document.querySelectorAll(
      ".details__borderCountryBtn"
    );
    borderCountryBtns.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const cca3 = e.target.dataset.cca3;
        showCountryDetails(arrayOfCCA3.indexOf(cca3));
      })
    );
  }

  function generateCountryCards(i) {
    const countryCard = document.createElement("div");
    countryCard.classList.add("country");
    countryCard.id = `country${i}`;
    countryCard.setAttribute("tabindex", "0");
    const img = document.createElement("img");
    img.classList.add("country__flag");
    img.src = flag[i];
    img.alt = `Flag of ${name[i]}`;
    countryCard.append(img);
    const infoContainer = document.createElement("article");
    infoContainer.classList.add("country__infoContainer");
    const countryName = document.createElement("h2");
    countryName.classList.add("country__name");
    countryName.textContent = name[i];
    infoContainer.append(countryName);
    const pDataName = ["Population: ", "Region: ", "Capital: "];
    const pDataInfo = [population[i], region[i], capital[i]];
    for (let j = 0; j < 3; j++) {
      const p = document.createElement("p");
      p.classList.add("country__info");
      p.textContent = pDataName[j];
      const span = document.createElement("span");
      span.classList.add("country__infoData");
      span.textContent = pDataInfo[j];
      p.append(span);
      infoContainer.append(p);
    }
    countryCard.append(infoContainer);
    homeContent.append(countryCard);
  }
}
