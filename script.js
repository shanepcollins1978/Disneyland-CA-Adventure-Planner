const attractions = [
  {
    name: "Indiana Jones Adventure",
    park: "Disneyland",
    multiPass: true,
    singlePass: false,
    singleRider: false,
    standby: true,
    show: false
  },
  {
    name: "Star Wars: Rise of the Resistance",
    park: "Disneyland",
    multiPass: false,
    singlePass: true,
    singleRider: false,
    standby: true,
    show: false
  },
  {
    name: "Space Mountain",
    park: "Disneyland",
    multiPass: true,
    singlePass: false,
    singleRider: false,
    standby: true,
    show: false
  },
  {
    name: "Big Thunder Mountain Railroad",
    park: "Disneyland",
    multiPass: true,
    singlePass: false,
    singleRider: false,
    standby: true,
    show: false
  },
  {
    name: "Matterhorn Bobsleds",
    park: "Disneyland",
    multiPass: true,
    singlePass: false,
    singleRider: true,
    standby: true,
    show: false
  },
  {
    name: "Millennium Falcon: Smugglers Run",
    park: "Disneyland",
    multiPass: true,
    singlePass: false,
    singleRider: true,
    standby: true,
    show: false
  },
  {
    name: "Tiana’s Bayou Adventure",
    park: "Disneyland",
    multiPass: true,
    singlePass: false,
    singleRider: false,
    standby: true,
    show: false
  },
  {
    name: "Mickey & Minnie’s Runaway Railway",
    park: "Disneyland",
    multiPass: true,
    singlePass: false,
    singleRider: false,
    standby: true,
    show: false
  },
  {
    name: "Pirates of the Caribbean",
    park: "Disneyland",
    multiPass: false,
    singlePass: false,
    singleRider: false,
    standby: true,
    show: false
  },
  {
    name: "Haunted Mansion",
    park: "Disneyland",
    multiPass: true,
    singlePass: false,
    singleRider: false,
    standby: true,
    show: false
  },
  {
    name: "Guardians of the Galaxy: Mission BREAKOUT!",
    park: "California Adventure",
    multiPass: true,
    singlePass: false,
    singleRider: false,
    standby: true,
    show: false
  },
  {
    name: "WEB SLINGERS: A Spider-Man Adventure",
    park: "California Adventure",
    multiPass: true,
    singlePass: false,
    singleRider: false,
    standby: true,
    show: false
  },
  {
    name: "Incredicoaster",
    park: "California Adventure",
    multiPass: true,
    singlePass: false,
    singleRider: true,
    standby: true,
    show: false
  },
  {
    name: "Radiator Springs Racers",
    park: "California Adventure",
    multiPass: false,
    singlePass: true,
    singleRider: true,
    standby: true,
    show: false
  },
  {
    name: "Toy Story Midway Mania!",
    park: "California Adventure",
    multiPass: true,
    singlePass: false,
    singleRider: false,
    standby: true,
    show: false
  },
  {
    name: "Soarin’ Around the World",
    park: "California Adventure",
    multiPass: true,
    singlePass: false,
    singleRider: false,
    standby: true,
    show: false
  },
  {
    name: "Goofy’s Sky School",
    park: "California Adventure",
    multiPass: true,
    singlePass: false,
    singleRider: true,
    standby: true,
    show: false
  },
  {
    name: "World of Color",
    park: "California Adventure",
    multiPass: false,
    singlePass: false,
    singleRider: false,
    standby: false,
    show: true
  },
  {
    name: "Fantasmic!",
    park: "Disneyland",
    multiPass: false,
    singlePass: false,
    singleRider: false,
    standby: false,
    show: true
  }
];

let selectedRides = [];
let diningPlans = [];

document.addEventListener("DOMContentLoaded", () => {
  renderAttractionFilters();
  renderRidePicker();
  renderDiningPlanner();
  renderRecommendedRideOrder();
});

function getAccessLabels(attraction) {
  const labels = [];

  if (attraction.multiPass) labels.push("⭐ Multi Pass");
  if (attraction.singlePass) labels.push("💰 Single Pass");
  if (attraction.singleRider) labels.push("👤 Single Rider");
  if (attraction.standby) labels.push("⏳ Standby");
  if (attraction.show) labels.push("🎭 Show");

  return labels.join(" · ");
}

function createAttractionCard(attraction) {
  const card = document.createElement("div");
  card.className = "attraction-card";

  card.innerHTML = `
    <h3>${attraction.name}</h3>
    <p>${attraction.park}</p>
    <p class="labels">${getAccessLabels(attraction)}</p>
    <button onclick="addRide('${attraction.name}')">Add to Ride Plan</button>
  `;

  return card;
}

function renderRideList(containerId, rideList) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  if (rideList.length === 0) {
    container.innerHTML = `<p class="empty">No rides in this section.</p>`;
    return;
  }

  rideList.forEach(attraction => {
    container.appendChild(createAttractionCard(attraction));
  });
}

function renderAttractionFilters() {
  const container = document.getElementById("attractionFilters");
  if (!container) return;

  container.innerHTML = `
    <details class="filter-section" open>
      <summary>All Attractions</summary>
      <div id="allAttractions"></div>
    </details>

    <details class="filter-section">
      <summary>Single Rider</summary>
      <div id="singleRiderAttractions"></div>
    </details>

    <details class="filter-section">
      <summary>Multi Pass Lightning Lane</summary>
      <div id="multiPassAttractions"></div>
    </details>

    <details class="filter-section">
      <summary>Single Pass Lightning Lane</summary>
      <div id="singlePassAttractions"></div>
    </details>

    <details class="filter-section">
      <summary>Standby Only</summary>
      <div id="standbyAttractions"></div>
    </details>

    <details class="filter-section">
      <summary>Shows</summary>
      <div id="showAttractions"></div>
    </details>
  `;

  renderRideList("allAttractions", attractions);
  renderRideList("singleRiderAttractions", attractions.filter(a => a.singleRider));
  renderRideList("multiPassAttractions", attractions.filter(a => a.multiPass));
  renderRideList("singlePassAttractions", attractions.filter(a => a.singlePass));
  renderRideList("standbyAttractions", attractions.filter(a => a.standby && !a.multiPass && !a.singlePass && !a.singleRider && !a.show));
  renderRideList("showAttractions", attractions.filter(a => a.show));
}

function renderRidePicker() {
  const container = document.getElementById("ridePicker");
  if (!container) return;

  container.innerHTML = `
    <h2>Ride / Show Picker</h2>
    <select id="rideSelect">
      <option value="">Choose a ride or show</option>
      ${attractions.map(a => `
        <option value="${a.name}">
          ${a.name} — ${a.park} — ${getAccessLabels(a)}
        </option>
      `).join("")}
    </select>
    <button onclick="addSelectedRide()">Add Ride</button>
  `;
}

function addSelectedRide() {
  const select = document.getElementById("rideSelect");
  if (!select || !select.value) return;

  addRide(select.value);
  select.value = "";
}

function addRide(rideName) {
  const attraction = attractions.find(a => a.name === rideName);
  if (!attraction) return;

  selectedRides.push({
    ...attraction,
    plannedMethod: attraction.multiPass
      ? "Multi Pass"
      : attraction.singlePass
      ? "Single Pass"
      : attraction.singleRider
      ? "Single Rider"
      : attraction.show
      ? "Show"
      : "Standby"
  });

  renderRecommendedRideOrder();
}

function removeRide(index) {
  selectedRides.splice(index, 1);
  renderRecommendedRideOrder();
}

function renderDiningPlanner() {
  const container = document.getElementById("diningPlanner");
  if (!container) return;

  const restaurants = [
    "Blue Bayou Restaurant — Disneyland",
    "Cafe Orleans — Disneyland",
    "Plaza Inn — Disneyland",
    "Carnation Cafe — Disneyland",
    "Lamplight Lounge — California Adventure",
    "Carthay Circle Restaurant — California Adventure",
    "Pym Test Kitchen — California Adventure",
    "Wine Country Trattoria — California Adventure",
    "Black Tap — Downtown Disney",
    "Din Tai Fung — Downtown Disney"
  ];

  container.innerHTML = `
    <h2>Dining Planner</h2>

    <label>Lunch</label>
    <select id="lunchSelect">
      <option value="">Choose lunch</option>
      ${restaurants.map(r => `<option value="${r}">${r}</option>`).join("")}
    </select>

    <label>Dinner</label>
    <select id="dinnerSelect">
      <option value="">Choose dinner</option>
      ${restaurants.map(r => `<option value="${r}">${r}</option>`).join("")}
    </select>
  `;
}

function renderRecommendedRideOrder() {
  const container = document.getElementById("recommendedRideOrder");
  if (!container) return;

  if (selectedRides.length === 0) {
    container.innerHTML = `
      <h2>Recommended Ride Order</h2>
      <p class="empty">Add rides to build your plan.</p>
    `;
    return;
  }

  container.innerHTML = `
    <h2>Recommended Ride Order</h2>
    ${selectedRides.map((ride, index) => `
      <div class="planned-ride">
        <h3>${index + 1}. ${ride.name}</h3>
        <p>${ride.park}</p>
        <p>${getAccessLabels(ride)}</p>

        <label>Planned Method</label>
        <select onchange="updateRideMethod(${index}, this.value)">
          <option value="Multi Pass" ${ride.plannedMethod === "Multi Pass" ? "selected" : ""}>⭐ Multi Pass</option>
          <option value="Single Pass" ${ride.plannedMethod === "Single Pass" ? "selected" : ""}>💰 Single Pass</option>
          <option value="Single Rider" ${ride.plannedMethod === "Single Rider" ? "selected" : ""}>👤 Single Rider</option>
          <option value="Standby" ${ride.plannedMethod === "Standby" ? "selected" : ""}>⏳ Standby</option>
          <option value="Show" ${ride.plannedMethod === "Show" ? "selected" : ""}>🎭 Show</option>
        </select>

        <button onclick="removeRide(${index})">Remove</button>
      </div>
    `).join("")}
  `;
}

function updateRideMethod(index, method) {
  selectedRides[index].plannedMethod = method;
  renderRecommendedRideOrder();
}
