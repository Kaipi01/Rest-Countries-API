import getCountriesData from "./getCountriesData";

export default async function displayCountries() {
  const countriesData = await getCountriesData();
  const homeContent = document.querySelector(".main__homeContent");
  const country = {
    name: [],
    nativeName: [],
    population: [],
    flag: [],
    region: [],
    subregion: [],
    capital: [],
    languages: [],
    currencies: [],
    tld: [],
    borders: [],
  };
  const arrayOfCCA3 = [];

  for (let i = 0; i < countriesData.length; i++) {
    arrayOfCCA3[i] = countriesData[i].cca3;
  }

  for (let i = 0; i < countriesData.length; i++) {
    let population = countriesData[i].population.toString();
    let currenciesList = "";
    let langList = "";
    const populationNumber = [];

    for (const key in countriesData[i].name.nativeName) {
      country.nativeName[i] = countriesData[i].name.nativeName[key].common;
      break;
    }
    for (const key in countriesData[i].currencies) {
      currenciesList += `${countriesData[i].currencies[key].name}, `;
    }
    for (const key in countriesData[i].languages) {
      langList += `${countriesData[i].languages[key]}, `;
    }
    for (let j = 0; j < population.length; j++) {
      if (j % 3 === 0 && j != 0) {
        populationNumber.push(`,`);
      }
      populationNumber.push(population[population.length - j - 1]);
    }
    country.languages[i] =
      langList.slice(0, langList.length - 2) || "Does not have";
    country.currencies[i] =
      currenciesList.slice(0, currenciesList.length - 2) || "Does not have";
    country.name[i] = countriesData[i].name.common;
    country.population[i] = populationNumber.reverse().join("");
    country.flag[i] = countriesData[i].flags.svg;
    country.region[i] = countriesData[i].region;
    country.subregion[i] = countriesData[i].subregion || "Does not have";
    country.capital[i] = countriesData[i].capital || "Does not have";
    country.tld[i] = countriesData[i].tld || "Does not have";
    country.borders[i] = countriesData[i].borders;

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
    const backBtn = document.querySelector(".main__detailsBackBtn");
    const detailsCountryFlag = document.querySelector(".details__img");
    const detailsHeader = document.querySelector(".details__name");
    const spanElements = document.querySelectorAll(".country__detailsInfoData");
    const detailMessage = document.querySelector(".details__message");
    const detailsDataInfo = [
      country.nativeName[i],
      country.population[i],
      country.region[i],
      country.subregion[i],
      country.capital[i],
      country.tld[i],
      country.currencies[i],
      country.languages[i],
    ];

    homeContent.classList.add("main__homeContent--hide");
    homeInputs.classList.add("main__homeInputs--hide");
    details.classList.remove("main__details--hide");

    backBtn.addEventListener("click", () => {
      details.classList.add("main__details--hide");
      homeContent.classList.remove("main__homeContent--hide");
      homeInputs.classList.remove("main__homeInputs--hide");
    });

    detailsCountryFlag.src = country.flag[i];
    detailsCountryFlag.alt = `Flag of ${country.name[i]}`;

    detailsHeader.textContent = country.name[i];

    spanElements.forEach(
      (span, index) => (span.textContent = detailsDataInfo[index])
    );

    const btnsContainer = document.querySelector(
      ".details__borderCountriesBtns"
    );

    detailMessage.classList.add("details__message--hide");
    btnsContainer.textContent = "";

    if (country.borders[i]) {
      for (let j = 0; j < country.borders[i].length; j++) {
        const btn = document.createElement("button");
        let countryNameByCCA3;

        btn.classList.add("details__borderCountryBtn");

        for (let k in countriesData) {
          if (countriesData[k].cca3 === country.borders[i][j]) {
            countryNameByCCA3 = countriesData[k].name.common;
            break;
          }
        }
        btn.textContent = countryNameByCCA3;
        btn.setAttribute("data-cca3", country.borders[i][j]);
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
    const infoContainer = document.createElement("article");
    const countryName = document.createElement("h2");
    const img = document.createElement("img");
    const pDataName = ["Population: ", "Region: ", "Capital: "];
    const pDataInfo = [
      country.population[i],
      country.region[i],
      country.capital[i],
    ];

    countryCard.classList.add("country");
    countryCard.id = `country${i}`;
    countryCard.setAttribute("tabindex", "0");

    img.classList.add("country__flag");
    img.src = country.flag[i];
    img.alt = `Flag of ${country.name[i]}`;
    countryCard.append(img);

    infoContainer.classList.add("country__infoContainer");

    countryName.classList.add("country__name");
    countryName.textContent = country.name[i];
    infoContainer.append(countryName);

    for (let j = 0; j < 3; j++) {
      const p = document.createElement("p");
      const span = document.createElement("span");

      p.classList.add("country__info");
      p.textContent = pDataName[j];

      span.classList.add("country__infoData");
      span.textContent = pDataInfo[j];

      p.append(span);
      infoContainer.append(p);
    }
    countryCard.append(infoContainer);
    homeContent.append(countryCard);
  }
}
