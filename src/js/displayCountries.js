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
    borders = [],
    fifa = [];

  for (let i = 0; i < countriesData.length; i++) {
    for (const key in countriesData[i].name.nativeName) {
      nativeName[i] = countriesData[i].name.nativeName[key].common;
      break;
    }
    const currList = "";
    for (const key in countriesData[i].currencies) {
      currList += `${countriesData[i].currencies[key].name}, `;
    }
    currencies[i] = currList.slice(0, currList.length - 2);
    const langList = "";
    for (const key in countriesData[i].languages)
      langList += `${countriesData[i].languages[key]}, `;
    languages[i] = langList.slice(0, langList.length - 2);
    name[i] = countriesData[i].name.common;
    population[i] = countriesData[i].population;
    flag[i] = countriesData[i].flags.svg;
    region[i] = countriesData[i].region;
    subregion[i] = countriesData[i].subregion;
    capital[i] = countriesData[i].capital;
    tld[i] = countriesData[i].tld;
    borders[i] = countriesData[i].borders;
    fifa[i] = countriesData[i].fifa;

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

    displayCountryInfoInConsole(i);

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
        btn.textContent = borders[i][j];
        btnsContainer.append(btn);
      }
    } else {
      detailMessage.classList.remove("details__message--hide");
    }
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

  function displayCountryInfoInConsole(i) {
    console.log("-------------------------------------");
    console.log(`Flag image file: ${flag[i]}`);
    console.log(`Country name: ${name[i]}`);
    console.log(`Country shortcut name: ${fifa[i]}`);
    console.log(`Native country name: ${nativeName[i]}`);
    console.log(`Population: ${population[i]}`);
    console.log(`Region: ${region[i]}`);
    console.log(`Subregion: ${subregion[i]}`);
    console.log(`Capital: ${capital[i]}`);
    console.log(`Currencies: ${currencies[i]}`);
    console.log(`Languages: ${languages[i]}`);
    console.log(`Top level domain: ${tld[i]}`);
    console.log(`Borders countries: ${borders[i] || "there aren't"}`);
  }
}
