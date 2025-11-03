document.getElementById("searchBtn").addEventListener("click", search);
document.getElementById("clearBtn").addEventListener("click", clearResults);

async function search() {
  const input = document.getElementById("searchInput").value.toLowerCase().trim();
  const resultDiv = document.getElementById("results");
  resultDiv.innerHTML = "";

  // Fetch data from JSON file
  const response = await fetch("travel_recommendation_api.json");
  const data = await response.json();

  // Check for keywords
  if (input.includes("beach")) {
    showPlaces(data.beaches);
  } 
  else if (input.includes("temple")) {
    showPlaces(data.temples);
  } 
  else {
    // Check if user entered a country name
    const country = data.countries.find(c => c.name.toLowerCase().includes(input));
    if (country) {
      let allCities = [];
      country.cities.forEach(city => allCities.push(city));
      showPlaces(allCities);
    } else {
      resultDiv.innerHTML = `<p>No results found for "${input}". Try keywords like <b>beach</b>, <b>temple</b>, or a country name (e.g., Japan, Brazil).</p>`;
    }
  }
}

// Function to display fetched places
function showPlaces(places) {
  const resultDiv = document.getElementById("results");
  places.forEach(place => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${place.imageUrl}" alt="${place.name}">
      <h3>${place.name}</h3>
      <p>${place.description}</p>
    `;
    resultDiv.appendChild(card);
  });
}

// Function to clear results
function clearResults() {
  document.getElementById("results").innerHTML = "";
  document.getElementById("searchInput").value = "";
}
