const habitKey = "habits";
const today = new Date().toDateString();

let habits = loadData(habitKey) || [];

// Render habits
function renderHabits() {
    const habitList = document.getElementById("habitList");
    habitList.innerHTML = "";

    habits.forEach((habit, index) => {
        const card = document.createElement("div");
        card.className = "card";

        const doneToday = habit.lastDone === today;

        card.innerHTML = `
            <h3>${habit.name}</h3>
            <p>🔥 Streak: ${habit.streak}</p>
            <button onclick="markDone(${index})" ${doneToday ? "disabled" : ""}>
                ${doneToday ? "Done Today ✅" : "Mark as Done"}
            </button>
        `;

        habitList.appendChild(card);
    });
}

renderHabits();

// Add habit
function addHabit() {
    const input = document.getElementById("habitInput");
    const name = input.value.trim();

    if (!name) {
        alert("Enter habit name");
        return;
    }

    habits.push({
        name: name,
        streak: 0,
        lastDone: null
    });

    saveData(habitKey, habits);
    input.value = "";
    renderHabits();
}

// Mark habit as done
function markDone(index) {
    const habit = habits[index];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (habit.lastDone === yesterday.toDateString()) {
        habit.streak += 1;
    } else {
        habit.streak = 1;
    }

    habit.lastDone = today;

    saveData(habitKey, habits);
    renderHabits();

    window.location.href = "achievements.html";
}
