const STORAGE_KEY = "disneylandHopperPlannerV2";
const NOTES_KEY = "disneylandHopperPlannerNotesV2";

const singleRiderNames = new Set([
  "Goofy's Sky School",
  "Incredicoaster",
  "Radiator Springs Racers",
  "Grizzly River Run",
  "WEB SLINGERS: A Spider-Man Adventure",
  "Soarin' Around the World",
  "Millennium Falcon: Smugglers Run",
  "Matterhorn Bobsleds",
  "Space Mountain"
]);

const rides = [
  { name: "Star Wars: Rise of the Resistance", park: "Disneyland Park", land: "Star Wars: Galaxy's Edge", access: "LL Single Pass", tier: "headliner", times: { ropeDrop: 95, lateMorning: 75, afternoon: 65, evening: 80, night: 90 }, tip: "Best with Single Pass or late night standby. Do not burn the first hour walking here unless it is your top priority." },
  { name: "Indiana Jones Adventure", park: "Disneyland Park", land: "Adventureland", access: "LL Multi Pass", tier: "headliner", times: { ropeDrop: 95, lateMorning: 85, afternoon: 65, evening: 75, night: 80 }, tip: "Great early standby target or high-value Lightning Lane. Book early if return times move fast." },
  { name: "Space Mountain", park: "Disneyland Park", land: "Tomorrowland", access: "LL Multi Pass", tier: "headliner", times: { ropeDrop: 90, lateMorning: 80, afternoon: 70, evening: 75, night: 85 }, tip: "Single Rider can be a strong backup. Also excellent late at night." },
  { name: "Matterhorn Bobsleds", park: "Disneyland Park", land: "Fantasyland", access: "LL Multi Pass", tier: "major", times: { ropeDrop: 82, lateMorning: 70, afternoon: 62, evening: 70, night: 82 }, tip: "Single Rider is often useful. Good bridge ride between Tomorrowland and Fantasyland." },
  { name: "Big Thunder Mountain Railroad", park: "Disneyland Park", land: "Frontierland", access: "LL Multi Pass", tier: "major", times: { ropeDrop: 78, lateMorning: 76, afternoon: 72, evening: 84, night: 92 }, tip: "Fun at night. Solid Lightning Lane, but not always your first pick." },
  { name: "Tiana's Bayou Adventure", park: "Disneyland Park", land: "Bayou Country", access: "LL Multi Pass", tier: "headliner", times: { ropeDrop: 86, lateMorning: 82, afternoon: 76, evening: 78, night: 82 }, tip: "Prioritize if return times are disappearing or weather is warm." },
  { name: "Mickey & Minnie's Runaway Railway", park: "Disneyland Park", land: "Mickey's Toontown", access: "LL Multi Pass", tier: "major", times: { ropeDrop: 78, lateMorning: 72, afternoon: 74, evening: 76, night: 78 }, tip: "Good family-friendly Lightning Lane. Toontown is not the most efficient first stop unless you love this ride." },
  { name: "Millennium Falcon: Smugglers Run", park: "Disneyland Park", land: "Star Wars: Galaxy's Edge", access: "LL Multi Pass", tier: "major", times: { ropeDrop: 70, lateMorning: 68, afternoon: 66, evening: 74, night: 80 }, tip: "Single Rider can save time, but you may not get your preferred role." },
  { name: "Haunted Mansion", park: "Disneyland Park", land: "New Orleans Square", access: "LL Multi Pass", tier: "major", times: { ropeDrop: 64, lateMorning: 70, afternoon: 75, evening: 80, night: 82 }, tip: "Usually better after the first rush. Strong evening choice." },
  { name: "Pirates of the Caribbean", park: "Disneyland Park", land: "New Orleans Square", access: "Standby", tier: "classic", times: { ropeDrop: 58, lateMorning: 66, afternoon: 74, evening: 78, night: 82 }, tip: "High capacity, so it is usually not the best rope drop use. Great midday break." },
  { name: "Buzz Lightyear Astro Blasters", park: "Disneyland Park", land: "Tomorrowland", access: "LL Multi Pass", tier: "support", times: { ropeDrop: 58, lateMorning: 62, afternoon: 68, evening: 65, night: 68 }, tip: "Good filler between bigger Lightning Lane windows." },
  { name: "Star Tours: The Adventures Continue", park: "Disneyland Park", land: "Tomorrowland", access: "LL Multi Pass", tier: "support", times: { ropeDrop: 60, lateMorning: 66, afternoon: 70, evening: 68, night: 70 }, tip: "Good Lightning Lane filler and easy Tomorrowland stack with Space Mountain." },
  { name: "Autopia", park: "Disneyland Park", land: "Tomorrowland", access: "LL Multi Pass", tier: "support", times: { ropeDrop: 45, lateMorning: 54, afternoon: 60, evening: 55, night: 48 }, tip: "Skip when lines are high unless it is a must-do for the family." },
  { name: "it's a small world", park: "Disneyland Park", land: "Fantasyland", access: "LL Multi Pass", tier: "support", times: { ropeDrop: 50, lateMorning: 58, afternoon: 65, evening: 70, night: 75 }, tip: "Good recovery ride and better later than first thing." },
  { name: "Roger Rabbit's Car Toon Spin", park: "Disneyland Park", land: "Mickey's Toontown", access: "LL Multi Pass", tier: "support", times: { ropeDrop: 48, lateMorning: 58, afternoon: 66, evening: 62, night: 60 }, tip: "Nice add-on if you are already in Toontown." },
  { name: "Peter Pan's Flight", park: "Disneyland Park", land: "Fantasyland", access: "Standby", tier: "classic", times: { ropeDrop: 88, lateMorning: 54, afternoon: 46, evening: 52, night: 74 }, tip: "Only do early if you are near the front of the rope drop crowd." },
  { name: "Alice in Wonderland", park: "Disneyland Park", land: "Fantasyland", access: "Standby", tier: "classic", times: { ropeDrop: 76, lateMorning: 64, afternoon: 56, evening: 62, night: 72 }, tip: "Best early or late. Pair with Matterhorn." },
  { name: "Jungle Cruise", park: "Disneyland Park", land: "Adventureland", access: "Standby", tier: "classic", times: { ropeDrop: 50, lateMorning: 60, afternoon: 68, evening: 72, night: 74 }, tip: "Usually better as a midday or evening standby." },

  { name: "Radiator Springs Racers", park: "Disney California Adventure", land: "Cars Land", access: "LL Single Pass", tier: "headliner", times: { ropeDrop: 96, lateMorning: 82, afternoon: 70, evening: 88, night: 96 }, tip: "Best with Single Pass, Single Rider, rope drop, or night. The land is excellent after dark." },
  { name: "Guardians of the Galaxy – Mission: BREAKOUT!", park: "Disney California Adventure", land: "Avengers Campus", access: "LL Multi Pass", tier: "headliner", times: { ropeDrop: 88, lateMorning: 84, afternoon: 78, evening: 82, night: 86 }, tip: "High-value Lightning Lane. Great early DCA pick if you start there." },
  { name: "WEB SLINGERS: A Spider-Man Adventure", park: "Disney California Adventure", land: "Avengers Campus", access: "LL Multi Pass", tier: "major", times: { ropeDrop: 76, lateMorning: 72, afternoon: 68, evening: 70, night: 72 }, tip: "Single Rider available. Good if Avengers Campus is already on your route." },
  { name: "Incredicoaster", park: "Disney California Adventure", land: "Pixar Pier", access: "LL Multi Pass", tier: "headliner", times: { ropeDrop: 84, lateMorning: 78, afternoon: 76, evening: 84, night: 90 }, tip: "Single Rider is very useful. Night rides are excellent." },
  { name: "Toy Story Midway Mania!", park: "Disney California Adventure", land: "Pixar Pier", access: "LL Multi Pass", tier: "major", times: { ropeDrop: 74, lateMorning: 74, afternoon: 74, evening: 76, night: 78 }, tip: "Good Lightning Lane because standby can build and it loads slower than it feels." },
  { name: "Soarin' Around the World", park: "Disney California Adventure", land: "Grizzly Peak", access: "LL Multi Pass", tier: "major", times: { ropeDrop: 68, lateMorning: 74, afternoon: 78, evening: 76, night: 72 }, tip: "Single Rider may be listed as Soarin' Over California seasonally. Good afternoon Lightning Lane." },
  { name: "Grizzly River Run", park: "Disney California Adventure", land: "Grizzly Peak", access: "LL Multi Pass", tier: "major", times: { ropeDrop: 40, lateMorning: 62, afternoon: 82, evening: 72, night: 50 }, tip: "Single Rider available. Best when hot; less ideal at night if you do not want to get soaked." },
  { name: "Goofy's Sky School", park: "Disney California Adventure", land: "Paradise Gardens Park", access: "LL Multi Pass", tier: "support", times: { ropeDrop: 58, lateMorning: 62, afternoon: 66, evening: 62, night: 60 }, tip: "Single Rider available. Good filler near Pixar Pier." },
  { name: "Monsters, Inc. Mike & Sulley to the Rescue!", park: "Disney California Adventure", land: "Hollywood Land", access: "LL Multi Pass", tier: "support", times: { ropeDrop: 48, lateMorning: 58, afternoon: 64, evening: 62, night: 60 }, tip: "Good easy add when you are near Hollywood Land." },
  { name: "The Little Mermaid - Ariel's Undersea Adventure", park: "Disney California Adventure", land: "Paradise Gardens Park", access: "LL Multi Pass", tier: "support", times: { ropeDrop: 40, lateMorning: 48, afternoon: 56, evening: 58, night: 60 }, tip: "High capacity. Use as filler, not a priority Lightning Lane." },
  { name: "Luigi's Rollickin' Roadsters", park: "Disney California Adventure", land: "Cars Land", access: "Standby", tier: "support", times: { ropeDrop: 54, lateMorning: 58, afternoon: 60, evening: 66, night: 70 }, tip: "Best when already in Cars Land." },
  { name: "Mater's Junkyard Jamboree", park: "Disney California Adventure", land: "Cars Land", access: "Standby", tier: "support", times: { ropeDrop: 50, lateMorning: 56, afternoon: 58, evening: 66, night: 70 }, tip: "Fun at night and easy to pair with Radiator Springs Racers." }
];

rides.forEach(ride => {
  ride.singleRider = singleRiderNames.has(ride.name);
});

const restaurants = [
  { name: "Blue Bayou Restaurant", location: "Disneyland Park", type: "Table Service", meals: ["Lunch", "Dinner"], note: "Best atmosphere. Reservation strongly recommended." },
  { name: "Cafe Orleans", location: "Disneyland Park", type: "Table Service", meals: ["Lunch", "Dinner"], note: "Good New Orleans Square option near Pirates and Haunted Mansion." },
  { name: "Carnation Cafe", location: "Disneyland Park", type: "Table Service", meals: ["Lunch", "Dinner"], note: "Classic Main Street option." },
  { name: "Plaza Inn", location: "Disneyland Park", type: "Quick Service", meals: ["Lunch", "Dinner"], note: "Reliable fried chicken and central location." },
  { name: "Red Rose Taverne", location: "Disneyland Park", type: "Quick Service", meals: ["Lunch", "Dinner"], note: "Easy Fantasyland meal." },
  { name: "Docking Bay 7 Food and Cargo", location: "Disneyland Park", type: "Quick Service", meals: ["Lunch", "Dinner"], note: "Best if you are spending time in Galaxy's Edge." },
  { name: "Alien Pizza Planet", location: "Disneyland Park", type: "Quick Service", meals: ["Lunch", "Dinner"], note: "Simple Tomorrowland option." },
  { name: "Carthay Circle Restaurant", location: "Disney California Adventure", type: "Table Service", meals: ["Lunch", "Dinner"], note: "More upscale. Good dinner choice." },
  { name: "Lamplight Lounge", location: "Disney California Adventure", type: "Table Service", meals: ["Lunch", "Dinner"], note: "Popular Pixar Pier option. Reservation recommended." },
  { name: "Pym Test Kitchen", location: "Disney California Adventure", type: "Quick Service", meals: ["Lunch", "Dinner"], note: "Convenient for Avengers Campus." },
  { name: "Smokejumpers Grill", location: "Disney California Adventure", type: "Quick Service", meals: ["Lunch", "Dinner"], note: "Good mobile order option near Grizzly Peak." },
  { name: "Flo's V8 Cafe", location: "Disney California Adventure", type: "Quick Service", meals: ["Lunch", "Dinner"], note: "Great Cars Land theming, especially at night." },
  { name: "Award Wieners", location: "Disney California Adventure", type: "Quick Service", meals: ["Lunch", "Dinner"], note: "Easy Hollywood Land option." },
  { name: "Naples Ristorante e Bar", location: "Downtown Disney", type: "Table Service", meals: ["Lunch", "Dinner"], note: "Pizza and Italian. Good break outside the parks." },
  { name: "Din Tai Fung", location: "Downtown Disney", type: "Table Service", meals: ["Lunch", "Dinner"], note: "Popular Downtown Disney meal. Plan extra walking and reservation time." },
  { name: "Jazz Kitchen Coastal Grill & Patio", location: "Downtown Disney", type: "Table Service", meals: ["Lunch", "Dinner"], note: "New Orleans-inspired table service." },
  { name: "Paseo", location: "Downtown Disney", type: "Table Service", meals: ["Lunch", "Dinner"], note: "Upscale Mexican option." },
  { name: "Black Tap Craft Burgers & Shakes", location: "Downtown Disney", type: "Casual Dining", meals: ["Lunch", "Dinner"], note: "Burgers and shakes. Good family-friendly option." },
  { name: "Céntrico", location: "Downtown Disney", type: "Casual Dining", meals: ["Lunch", "Dinner"], note: "Open-air Mexican restaurant and bar." }
];

let plan = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

const timeOfDay = document.getElementById("timeOfDay");
const parkFilter = document.getElementById("parkFilter");
const strategyFilter = document.getElementById("strategyFilter");
const rideSelect = document.getElementById("rideSelect");
const rideDetails = document.getElementById("rideDetails");
const rideCards = document.getElementById("rideCards");
const bestMove = document.getElementById("bestMove");
const planList = document.getElementById("planList");
const lunchSelect = document.getElementById("lunchSelect");
const dinnerSelect = document.getElementById("dinnerSelect");
const lunchDetails = document.getElementById("lunchDetails");
const dinnerDetails = document.getElementById("dinnerDetails");
const dayNotes = document.getElementById("dayNotes");

function badges(ride) {
  const items = [];
  if (ride.singleRider) items.push(`<span class="badge green">Single Rider</span>`);
  if (ride.access === "LL Multi Pass") items.push(`<span class="badge">LL Multi Pass</span>`);
  if (ride.access === "LL Single Pass") items.push(`<span class="badge orange">LL Single Pass</span>`);
  if (ride.access === "Standby") items.push(`<span class="badge gray">Standby</span>`);
  return `<div class="badges">${items.join("")}</div>`;
}

function labelForRide(ride) {
  const tags = [];
  if (ride.singleRider) tags.push("Single Rider");
  tags.push(ride.access);
  return `${ride.name} — ${ride.park} — ${tags.join(" + ")}`;
}

function filteredRides() {
  const park = parkFilter.value;
  const strategy = strategyFilter.value;
  const currentTime = timeOfDay.value;

  return rides
    .filter(ride => park === "all" || ride.park === park)
    .filter(ride => {
      if (strategy === "singleRider") return ride.singleRider;
      if (strategy === "llMulti") return ride.access === "LL Multi Pass";
      if (strategy === "llSingle") return ride.access === "LL Single Pass";
      if (strategy === "standby") return ride.access === "Standby";
      if (strategy === "best") return ride.times[currentTime] >= 74;
      return true;
    })
    .sort((a, b) => b.times[currentTime] - a.times[currentTime]);
}

function renderRideSelect() {
  const options = filteredRides();
  rideSelect.innerHTML = options.map(ride => `<option value="${ride.name}">${labelForRide(ride)}</option>`).join("");
  renderRideDetails();
}

function selectedRide() {
  return rides.find(ride => ride.name === rideSelect.value) || filteredRides()[0];
}

function renderRideDetails() {
  const ride = selectedRide();
  if (!ride) {
    rideDetails.innerHTML = "No rides match this filter.";
    return;
  }
  rideDetails.innerHTML = `
    <strong>${ride.name}</strong><br>
    ${ride.park} • ${ride.land}
    ${badges(ride)}
    <div class="score">Time-of-day score: ${ride.times[timeOfDay.value]}/100</div>
    <div class="tip">${ride.tip}</div>
  `;
}

function renderRideCards() {
  const currentTime = timeOfDay.value;
  const top = filteredRides().slice(0, 8);
  rideCards.innerHTML = top.map((ride, index) => `
    <div class="card">
      <h3>#${index + 1} ${ride.name}</h3>
      <div class="meta">${ride.park} • ${ride.land}</div>
      ${badges(ride)}
      <div class="score">Score: ${ride.times[currentTime]}/100</div>
      <div class="tip">${ride.tip}</div>
    </div>
  `).join("") || `<p>No rides match this filter.</p>`;
}

function renderBestMove() {
  const top = filteredRides()[0];
  if (!top) {
    bestMove.innerHTML = "No matching ride found.";
    return;
  }
  let action = "Ride now";
  if (top.access === "LL Multi Pass") action = "Book or modify this Lightning Lane if the return time is reasonable";
  if (top.access === "LL Single Pass") action = "Use Single Pass if purchased, otherwise use Single Rider or save for rope drop/night";
  if (top.singleRider && top.times[timeOfDay.value] >= 75) action += "; Single Rider is a strong backup";

  bestMove.innerHTML = `
    <strong>${top.name}</strong><br>
    ${top.park} • ${top.land}
    ${badges(top)}
    <div class="score">${action}</div>
    <div class="tip">${top.tip}</div>
  `;
}

function addRideToPlan(ride) {
  if (!ride) return;
  plan.push({ name: ride.name, park: ride.park, access: ride.access, singleRider: ride.singleRider, time: timeOfDay.options[timeOfDay.selectedIndex].text });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  renderPlan();
}

function renderPlan() {
  if (!plan.length) {
    planList.innerHTML = `<p class="meta">No rides added yet.</p>`;
    return;
  }
  planList.innerHTML = plan.map((item, index) => `
    <div class="plan-item">
      <h3>${index + 1}. ${item.name}</h3>
      <div class="meta">${item.park} • ${item.time}</div>
      <div class="badges">
        ${item.singleRider ? `<span class="badge green">Single Rider</span>` : ""}
        <span class="badge ${item.access === "LL Single Pass" ? "orange" : item.access === "Standby" ? "gray" : ""}">${item.access}</span>
      </div>
      <button onclick="removePlanItem(${index})">Remove</button>
    </div>
  `).join("");
}

function removePlanItem(index) {
  plan.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  renderPlan();
}
window.removePlanItem = removePlanItem;

function populateDining(select, meal) {
  const mealOptions = restaurants.filter(r => r.meals.includes(meal));
  select.innerHTML = mealOptions.map(r => `<option value="${r.name}">${r.name} — ${r.location} — ${r.type}</option>`).join("");
}

function renderDiningDetails(select, element) {
  const restaurant = restaurants.find(r => r.name === select.value);
  if (!restaurant) return;
  element.innerHTML = `<strong>${restaurant.name}</strong><br>${restaurant.location} • ${restaurant.type}<br><span class="tip">${restaurant.note}</span>`;
}

function renderAll() {
  renderRideSelect();
  renderRideCards();
  renderBestMove();
  renderPlan();
}

[timeOfDay, parkFilter, strategyFilter].forEach(el => el.addEventListener("change", renderAll));
rideSelect.addEventListener("change", renderRideDetails);
document.getElementById("addRide").addEventListener("click", () => addRideToPlan(selectedRide()));
document.getElementById("addTopRide").addEventListener("click", () => addRideToPlan(filteredRides()[0]));
document.getElementById("clearPlan").addEventListener("click", () => {
  plan = [];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  renderPlan();
});

lunchSelect.addEventListener("change", () => renderDiningDetails(lunchSelect, lunchDetails));
dinnerSelect.addEventListener("change", () => renderDiningDetails(dinnerSelect, dinnerDetails));

dayNotes.value = localStorage.getItem(NOTES_KEY) || "";
dayNotes.addEventListener("input", () => localStorage.setItem(NOTES_KEY, dayNotes.value));

populateDining(lunchSelect, "Lunch");
populateDining(dinnerSelect, "Dinner");
renderDiningDetails(lunchSelect, lunchDetails);
renderDiningDetails(dinnerSelect, dinnerDetails);
renderAll();
