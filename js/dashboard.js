const today = new Date().toDateString();
document.getElementById("today-date").innerText = today;

// Load data
const habits = loadData("habits") || [];
const badges = loadData("badges") || {};

// Total habits
document.getElementById("total-habits").innerText = habits.length;

// Habits done today
const doneToday = habits.filter(h => h.lastDone === today).length;
document.getElementById("done-today").innerText = doneToday;

// Highest streak
let highestStreak = 0;
habits.forEach(h => {
    if (h.streak > highestStreak) {
        highestStreak = h.streak;
    }
});
document.getElementById("highest-streak").innerText = highestStreak;

// Badge count
const badgeCount = Object.keys(badges).length;
document.getElementById("badge-count").innerText = badgeCount;
// 💧 Water Tracking
const waterKey = "water-" + today;
let waterCount = loadData(waterKey) || 0;

document.getElementById("water-count").innerText = waterCount;

function addWater() {
    waterCount++;
    saveData(waterKey, waterCount);
    document.getElementById("water-count").innerText = waterCount;

    // Check water badge
    if (waterCount >= 8) {
        unlockFoodBadge("hydration_hero");
    }
}
// 🍽️ Food stats
const foodKey = "food-" + today;
const meals = loadData(foodKey) || [];

document.getElementById("meal-count").innerText = meals.length;

let totalCalories = 0;
meals.forEach(meal => {
    totalCalories += meal.calories || 0;
});

document.getElementById("calorie-total").innerText = totalCalories;
// 🌙 Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}
// ⚖️ Weight Goal
const weightKey = "weight-data";
let weightData = loadData(weightKey) || { current: null, goal: null };

function renderWeight() {
    document.getElementById("current-weight").innerText =
        weightData.current ?? "--";
    document.getElementById("goal-weight").innerText =
        weightData.goal ?? "--";
}

function saveWeight() {
    const current = document.getElementById("weightInput").value;
    const goal = document.getElementById("goalInput").value;

    if (current) weightData.current = current;
    if (goal) weightData.goal = goal;

    saveData(weightKey, weightData);
    renderWeight();
}

renderWeight();
