export default async function getCountriesData() {
  try {
    const url = "https://restcountries.com/v3.1/all";
    const data = await fetch(url);
    const response = await data.json();
    return await response;
  } catch (e) {
    console.error(e);
  }
}
