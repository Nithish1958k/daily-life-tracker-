const diaryKey = "diaryEntries";
const diaryText = document.getElementById("diaryText");
const diaryEntriesDiv = document.getElementById("diaryEntries");

// Load existing entries
let diaryEntries = loadData(diaryKey) || [];

// Render entries
function renderEntries() {
    diaryEntriesDiv.innerHTML = "";

    diaryEntries.forEach(entry => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
    <p><strong>${entry.date}</strong> 💗</p>
    <p>💖 ${entry.text}</p>
`;


        diaryEntriesDiv.appendChild(div);
    });
}

// Save new diary entry
function saveDiary() {
    const text = diaryText.value.trim();

    if (!text) {
        alert("Write something first");
        return;
    }

    const entry = {
        date: new Date().toDateString(),
        text: text
    };

    diaryEntries.unshift(entry); // newest on top
    saveData(diaryKey, diaryEntries);

    diaryText.value = ""; // clear textarea
    renderEntries();
}

// Initial render
renderEntries();
