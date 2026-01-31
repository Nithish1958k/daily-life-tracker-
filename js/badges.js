function launchConfetti() {
    const canvas = document.getElementById("confetti");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 120 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 6 + 2,
        dy: Math.random() * 3 + 2
    }));

    let frame = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            ctx.fillStyle = "#ec4899";
            ctx.beginPath();
            ctx.arc(p.x, p.y += p.dy, p.r, 0, Math.PI * 2);
            ctx.fill();
        });
        frame++;
        if (frame < 80) requestAnimationFrame(animate);
    }
    animate();
}

function unlockFoodBadge(badgeId) {
    const badges = loadData("badges") || {};
    const today = new Date().toDateString();

    if (!badges[badgeId]) {
        badges[badgeId] = {
            unlocked: true,
            date: today
        };
        saveData("badges", badges);
    }
}


const badgeKey = "badges";
const habitKey = "habits";
const today = new Date().toDateString();

const badgeDefinitions = [
    { id: "starter", name: "🥉 Starter", desc: "3-day habit streak", condition: habits => habits.some(h => h.streak >= 3) },
    { id: "consistent", name: "🥈 Consistent", desc: "7-day habit streak", condition: habits => habits.some(h => h.streak >= 7) },
    { id: "champion", name: "🥇 Champion", desc: "30-day habit streak", condition: habits => habits.some(h => h.streak >= 30) },
    { id: "master", name: "🔥 Habit Master", desc: "3 habits with 7+ day streak", condition: habits => habits.filter(h => h.streak >= 7).length >= 3 },
    { id: "perfect", name: "💯 Perfect Day", desc: "All habits completed today", condition: habits => habits.length > 0 && habits.every(h => h.lastDone === today) },
    { 
        id: "healthy_logger", 
        name: "🥗 Healthy Logger", 
        desc: "Logged all meals in a day", 
        condition: () => false 
      },
      {
        id: "hydration_hero",
        name: "💧 Hydration Hero",
        desc: "Drank 8 glasses of water in a day",
        condition: () => false
    }
    

];

let badges = loadData(badgeKey) || {};
let habits = loadData(habitKey) || [];

// Check & unlock badges
badgeDefinitions.forEach(badge => {
    if (!badges[badge.id] && badge.condition(habits)) {
        launchConfetti();
    
        badges[badge.id] = {
            unlocked: true,
            date: today
        };
    }
});

saveData(badgeKey, badges);

// Render badges
const badgeList = document.getElementById("badgeList");

badgeDefinitions.forEach(badge => {
    const div = document.createElement("div");
    div.className = "card";

    if (badges[badge.id]) {
        div.innerHTML = `
            <h3>${badge.name}</h3>
            <p>${badge.desc}</p>
            <p>Unlocked on: ${badges[badge.id].date}</p>
        `;
    } else {
        div.innerHTML = `
            <h3>🔒 Locked</h3>
            <p>${badge.desc}</p>
        `;
    }

    badgeList.appendChild(div);
});
