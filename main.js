const search_btn = document.getElementById("search-btn");
const input_field = document.getElementById("input-field");
const container = document.getElementById("body");
const multi_container = document.querySelector(".multi_container");

const removeCards = () => {
  const countries = document.querySelectorAll(".single_div");

  if (countries.length > 0) {
    for (let i = 0; i < countries.length; i++) {
      countries[i].remove();
    }
  } else {
    console.log("buvo tuscia");
  }
};

const getCountryInfo = async (e) => {
  e.preventDefault();
  //   console.log(input_field.value);
  const country = input_field.value;

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await res.json();

    removeCards();
    // console.log(data);
    if (input_field.value.length < 3) {
      alert("Minumum 3 characters");
    } else if (data.status === 404) {
      alert("Country not found, check your spelling");
    } else {
      data.forEach((country) => {
        let single_div = document.createElement("div");
        single_div.setAttribute("class", "single_div");

        // img
        let flag_img = document.createElement("img");
        flag_img.setAttribute("class", "flag_img");
        flag_img.src = country.flags.png;
        single_div.appendChild(flag_img);

        // name
        let country_name = document.createElement("h2");
        country_name.setAttribute("class", "country_name");
        country_name.innerText = country.name.common;
        single_div.appendChild(country_name);

        // capital
        let capital = document.createElement("p");
        capital.setAttribute("class", "capital");
        capital.innerHTML = country.capital[0];
        single_div.appendChild(capital);

        //population
        let population = document.createElement("p");
        population.setAttribute("class", "population");
        population.innerText = `Population: ${country.population}`;
        single_div.appendChild(population);

        multi_container.appendChild(single_div);
      });
    }
  } catch (error) {
    console.log(error);
  }
};
search_btn.addEventListener("click", getCountryInfo);
