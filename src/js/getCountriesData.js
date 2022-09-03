export default async function getCountriesData() {
  const url = "https://restcountries.com/v3.1/all";
  const data = await fetch(url);
  const response = await data.json();
  return await response;
}
