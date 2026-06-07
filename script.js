const STORAGE_KEY = "disneylandPlannerRideOrderV4";
const NOTES_KEY = "disneylandPlannerNotesV4";
const DINING_KEY = "disneylandPlannerDiningV4";

const METHOD = {
  MULTI: "Lightning Lane Multi Pass",
  SINGLE_PASS: "Lightning Lane Single Pass",
  SINGLE_RIDER: "Single Rider",
  STANDBY: "Standby",
  SHOW: "Show"
};

const icons = {
  [METHOD.MULTI]: "⭐",
  [METHOD.SINGLE_PASS]: "⚡",
  [METHOD.SINGLE_RIDER]: "👤",
  [METHOD.STANDBY]: "⏳",
  [METHOD.SHOW]: "🎭"
};

const attractions = [
  { name: "Indiana Jones Adventure", park: "Disneyland", options: [METHOD.MULTI, METHOD.STANDBY] },
  { name: "Space Mountain", park: "Disneyland", options: [METHOD.MULTI, METHOD.STANDBY] },
  { name: "Big Thunder Mountain Railroad", park: "Disneyland", options: [METHOD.MULTI, METHOD.STANDBY] },
  { name: "Matterhorn Bobsleds", park: "Disneyland", options: [METHOD.MULTI, METHOD.SINGLE_RIDER, METHOD.STANDBY] },
  { name: "Star Wars: Rise of the Resistance", park: "Disneyland", options: [METHOD.SINGLE_PASS, METHOD.STANDBY] },
  { name: "Millennium Falcon: Smugglers Run", park: "Disneyland", options: [METHOD.MULTI, METHOD.SINGLE_RIDER, METHOD.STANDBY] },
  { name: "Mickey & Minnie’s Runaway Railway", park: "Disneyland", options: [METHOD.MULTI, METHOD.STANDBY] },
  { name: "Tiana’s Bayou Adventure", park: "Disneyland", options: [METHOD.MULTI, METHOD.STANDBY] },
  { name: "Haunted Mansion", park: "Disneyland", options: [METHOD.MULTI, METHOD.STANDBY] },
  { name: "Star Tours", park: "Disneyland", options: [METHOD.MULTI, METHOD.STANDBY] },
  { name: "Buzz Lightyear Astro Blasters", park: "Disneyland", options: [METHOD.MULTI, METHOD.STANDBY] },
  { name: "Pirates of the Caribbean", park: "Disneyland", options: [METHOD.STANDBY] },
  { name: "Jungle Cruise", park: "Disneyland", options: [METHOD.STANDBY] },
  { name: "Peter Pan’s Flight", park: "Disneyland", options: [METHOD.STANDBY] },
  { name: "Alice in Wonderland", park: "Disneyland", options: [METHOD.STANDBY] },
  { name: "Enchanted Tiki Room", park: "Disneyland", options: [METHOD.SHOW] },
  { name: "Fantasmic!", park: "Disneyland", options: [METHOD.SHOW] },
  { name: "Fireworks", park: "Disneyland", options: [METHOD.SHOW] },
  { name: "Great Moments with Mr. Lincoln", park: "Disneyland", options: [METHOD.SHOW] },

  { name: "Radiator Springs Racers", park: "California Adventure", options: [METHOD.SINGLE_PASS, METHOD.SINGLE_RIDER, METHOD.STANDBY] },
  { name: "Guardians of the Galaxy: Mission BREAKOUT!", park: "California Adventure", options: [METHOD.MULTI, METHOD.STANDBY] },
  { name: "WEB SLINGERS: A Spider-Man Adventure", park: "California Adventure", options: [METHOD.MULTI, METHOD.STANDBY] },
  { name: "Incredicoaster", park: "California Adventure", options: [METHOD.MULTI, METHOD.SINGLE_RIDER, METHOD.STANDBY] },
  { name: "Toy Story Midway Mania!", park: "California Adventure", options: [METHOD.MULTI, METHOD.STANDBY] },
  { name: "Soarin’ Around the World", park: "California Adventure", options: [METHOD.MULTI, METHOD.STANDBY] },
  { name: "Grizzly River Run", park: "California Adventure", options: [METHOD.MULTI, METHOD.SINGLE_RIDER, METHOD.STANDBY] },
  { name: "Goofy’s Sky School", park: "California Adventure", options: [METHOD.MULTI, METHOD.SINGLE_RIDER, METHOD.STANDBY] },
  { name: "Monsters, Inc. Mike & Sulley to the Rescue!", park: "California Adventure", options: [METHOD.MULTI, METHOD.STANDBY] },
  { name: "The Little Mermaid", park: "California Adventure", options: [METHOD.STANDBY] },
  { name: "Pixar Pal-A-Round", park: "California Adventure", options: [METHOD.STANDBY] },
  { name: "World of Color", park: "California Adventure", options: [METHOD.SHOW] },
  { name: "Disney Jr. Dance Party!", park: "California Adventure", options: [METHOD.SHOW] },
  { name: "Turtle Talk with Crush", park: "California Adventure", options: [METHOD.SHOW] }
];

const restaurants = [
  "Blue Bayou",
  "Cafe Orleans",
  "Plaza Inn",
  "Bengal Barbecue",
  "Docking Bay 7 Food and Cargo",
  "Rancho del Zocalo",
  "Alien Pizza Planet",
  "Carnation Cafe",
  "Lamplight Lounge",
  "Carthay Circle",
  "Wine Country Trattoria",
  "Flo’s V8 Cafe",
  "Pym Test Kitchen",
  "Cocina Cucamonga",
  "Smokejumpers Grill",
  "Naples Ristorante",
  "Black Tap",
  "Jazz Kitchen",
  "Ballast Point",
  "Earl of Sandwich"
];

let rideOrder = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let parkFilter = "Both Parks";

document.addEventListener("DOMContentLoaded", () => {
  buildApp();
  renderAttractionFilters();
  renderRidePicker();
  renderDining();
  renderRideOrder();
});

function buildApp() {
  document.body.innerHTML = `
    <main class="app">
      <header class="hero">
        <h1>Disneyland + California Adventure Planner</h1>
        <p>Park Hopper, Lightning Lane, Single Rider, Standby, Shows, and Dining</p>
      </header>

      <section class="panel">
        <h2>Notes</h2>
        <textarea id="notes" placeholder="Rope drop plan, dining reservations, Lightning Lane reminders, mobile order notes..."></textarea>
      </section>

      <section class="panel">
        <h2>Attraction Filters</h2>

        <label for="parkFilter">Park Filter</label>
        <select id="parkFilter">
          <option>Both Parks</option>
          <option>Disneyland Only</option>
          <option>California Adventure Only</option>
        </select>

        <div id="filterSections"></div>
      </section>

      <section class="panel">
        <h2>Ride / Show Picker</h2>
        <label for="attractionSelect">Select Ride or Show</label>
        <select id="attractionSelect"></select>

        <div id="availableOptions"></div>
      </section>

      <section class="panel">
        <h2>Dining Planner</h2>

        <label for="lunchSelect">Lunch</label>
        <select id="lunchSelect"></select>

        <label for="lunchTime">Lunch Time</label>
        <input id="lunchTime" type="text" placeholder="Example: 11:30 AM">

        <label for="dinnerSelect">Dinner</label>
        <select id="dinnerSelect"></select>

        <label for="dinnerTime">Dinner Time</label>
        <input id="dinnerTime" type="text" placeholder="Example: 6:00 PM">
      </section>

      <section class="panel">
        <h2>Recommended Ride Order</h2>
        <div id="rideOrder"></div>
        <button class="danger" onclick="clearRideOrder()">Clear Ride Order</button>
      </section>
    </main>
  `;

  document.getElementById("parkFilter").addEventListener("change", e => {
    parkFilter = e.target.value;
    renderAttractionFilters();
    renderRidePicker();
  });

  const notes = document.getElementById("notes");
  notes.value = localStorage.getItem(NOTES_KEY) || "";
  notes.addEventListener("input", () => {
    localStorage.setItem(NOTES_KEY, notes.value);
  });
}

function getFilteredByPark() {
  return attractions.filter(a => {
    if (parkFilter === "Disneyland Only") return a.park === "Disneyland";
    if (parkFilter === "California Adventure Only") return a.park === "California Adventure";
    return true;
  });
}

function renderAttractionFilters() {
  const container = document.getElementById("filterSections");
  const filtered = getFilteredByPark();

  const sections = [
    { title: "All Attractions", list: filtered },
    { title: "Single Rider", list: filtered.filter(a => a.options.includes(METHOD.SINGLE_RIDER)) },
    { title: "Multi Pass Lightning Lane", list: filtered.filter(a => a.options.includes(METHOD.MULTI)) },
    { title: "Single Pass Lightning Lane", list: filtered.filter(a => a.options.includes(METHOD.SINGLE_PASS)) },
    { title: "Standby Only", list: filtered.filter(a => a.options.length === 1 && a.options.includes(METHOD.STANDBY)) },
    { title: "Shows", list: filtered.filter(a => a.options.includes(METHOD.SHOW)) }
  ];

  container.innerHTML = sections.map(section => `
    <div class="filter-group">
      <h3>${section.title}</h3>
      ${
        section.list.length
          ? section.list.map(a => `
              <div class="attraction-card">
                <strong>${a.name}</strong>
                <p>${a.park}</p>
                <p>${formatOptions(a.options)}</p>
              </div>
            `).join("")
          : `<p class="empty">No attractions in this section.</p>`
      }
    </div>
  `).join("");
}

function renderRidePicker() {
  const select = document.getElementById("attractionSelect");
  const filtered = getFilteredByPark();

  select.innerHTML = filtered.map((a, index) => `
    <option value="${index}">${a.name} — ${a.park}</option>
  `).join("");

  select.onchange = renderAvailableOptions;
  renderAvailableOptions();
}

function renderAvailableOptions() {
  const filtered = getFilteredByPark();
  const selectedIndex = document.getElementById("attractionSelect").value;
  const attraction = filtered[selectedIndex];

  const container = document.getElementById("availableOptions");

  if (!attraction) {
    container.innerHTML = `<p class="empty">No attraction selected.</p>`;
    return;
  }

  container.innerHTML = `
    <h3>Available Options</h3>
    <p>${formatOptions(attraction.options)}</p>
    <div class="button-row">
      ${attraction.options.map(option => `
        <button onclick="addRide('${escapeText(attraction.name)}', '${escapeText(attraction.park)}', '${escapeText(option)}')">
          Add Using ${icons[option]} ${shortMethod(option)}
        </button>
      `).join("")}
    </div>
  `;
}

function renderDining() {
  const saved = JSON.parse(localStorage.getItem(DINING_KEY)) || {
    lunch: "",
    lunchTime: "",
    dinner: "",
    dinnerTime: ""
  };

  const lunchSelect = document.getElementById("lunchSelect");
  const dinnerSelect = document.getElementById("dinnerSelect");

  const options = `<option value="">Select restaurant</option>` + restaurants.map(r => `
    <option value="${r}">${r}</option>
  `).join("");

  lunchSelect.innerHTML = options;
  dinnerSelect.innerHTML = options;

  lunchSelect.value = saved.lunch;
  dinnerSelect.value = saved.dinner;
  document.getElementById("lunchTime").value = saved.lunchTime;
  document.getElementById("dinnerTime").value = saved.dinnerTime;

  ["lunchSelect", "lunchTime", "dinnerSelect", "dinnerTime"].forEach(id => {
    document.getElementById(id).addEventListener("input", saveDining);
    document.getElementById(id).addEventListener("change", saveDining);
  });
}

function saveDining() {
  const dining = {
    lunch: document.getElementById("lunchSelect").value,
    lunchTime: document.getElementById("lunchTime").value,
    dinner: document.getElementById("dinnerSelect").value,
    dinnerTime: document.getElementById("dinnerTime").value
  };

  localStorage.setItem(DINING_KEY, JSON.stringify(dining));
}

function addRide(name, park, method) {
  const attraction = attractions.find(a => a.name === name && a.park === park);

  rideOrder.push({
    id: Date.now(),
    name,
    park,
    method,
    available: attraction ? attraction.options : [method]
  });

  saveRideOrder();
  renderRideOrder();
}

function renderRideOrder() {
  const container = document.getElementById("rideOrder");

  if (!rideOrder.length) {
    container.innerHTML = `<p class="empty">No rides or shows added yet.</p>`;
    return;
  }

  container.innerHTML = rideOrder.map((item, index) => `
    <div class="ride-card">
      <div class="ride-top">
        <strong>${index + 1}. ${icons[item.method]} ${item.name}</strong>
      </div>

      <p><strong>Park:</strong> ${item.park}</p>
      <p><strong>Available:</strong> ${formatOptions(item.available)}</p>
      <p><strong>Selected:</strong> ${icons[item.method]} ${item.method}</p>

      <div class="button-row">
        <button onclick="moveRide(${index}, -1)">⬆ Move Up</button>
        <button onclick="moveRide(${index}, 1)">⬇ Move Down</button>
        <button onclick="removeRide(${item.id})">❌ Remove</button>
      </div>
    </div>
  `).join("");
}

function moveRide(index, direction) {
  const newIndex = index + direction;

  if (newIndex < 0 || newIndex >= rideOrder.length) return;

  const item = rideOrder.splice(index, 1)[0];
  rideOrder.splice(newIndex, 0, item);

  saveRideOrder();
  renderRideOrder();
}

function removeRide(id) {
  rideOrder = rideOrder.filter(item => item.id !== id);
  saveRideOrder();
  renderRideOrder();
}

function clearRideOrder() {
  if (!confirm("Clear your full recommended ride order?")) return;

  rideOrder = [];
  saveRideOrder();
  renderRideOrder();
}

function saveRideOrder() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rideOrder));
}

function formatOptions(options) {
  return options.map(option => `${icons[option]} ${shortMethod(option)}`).join(" · ");
}

function shortMethod(method) {
  if (method === METHOD.MULTI) return "Multi Pass";
  if (method === METHOD.SINGLE_PASS) return "Single Pass";
  if (method === METHOD.SINGLE_RIDER) return "Single Rider";
  if (method === METHOD.STANDBY) return "Standby";
  if (method === METHOD.SHOW) return "Show";
  return method;
}

function escapeText(text) {
  return String(text).replace(/'/g, "\\'");
}
