async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const habits = loadData("habits") || [];
    const badges = loadData("badges") || {};

    let y = 20;

    // Title
    pdf.setFontSize(18);
    pdf.text("Weekly Life Report", 20, y);
    y += 10;

    // Date range
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    pdf.setFontSize(12);
    pdf.text(
        `Week: ${lastWeek.toDateString()} - ${today.toDateString()}`,
        20,
        y
    );
    y += 15;

    // Habits Summary
    pdf.setFontSize(14);
    pdf.text("Habits Summary", 20, y);
    y += 8;

    if (habits.length === 0) {
        pdf.setFontSize(11);
        pdf.text("No habits tracked.", 25, y);
        y += 8;
    } else {
        habits.forEach(habit => {
            pdf.setFontSize(11);
            pdf.text(
                `• ${habit.name} | Streak: ${habit.streak}`,
                25,
                y
            );
            y += 7;
        });
    }

    y += 5;

    // Badges
    pdf.setFontSize(14);
    pdf.text("Achievements Unlocked", 20, y);
    y += 8;

    const badgeNames = Object.keys(badges);

    if (badgeNames.length === 0) {
        pdf.setFontSize(11);
        pdf.text("No badges unlocked yet.", 25, y);
        y += 8;
    } else {
        badgeNames.forEach(id => {
            pdf.setFontSize(11);
            pdf.text(
                `• ${id} (Unlocked on ${badges[id].date})`,
                25,
                y
            );
            y += 7;
        });
    }

    // Footer
    y += 15;
    pdf.setFontSize(10);
    pdf.text(
        "Generated from Daily Life Tracker",
        20,
        y
    );

    // Download
    pdf.save("Weekly_Report.pdf");
}
