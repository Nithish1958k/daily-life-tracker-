const todayFoodKey = "food-" + new Date().toDateString();
const mealList = document.getElementById("mealList");

let meals = loadData(todayFoodKey) || [];

function checkFoodGoals() {
    const mealTypes = meals.map(m => m.mealType);

    const requiredMeals = ["Breakfast", "Lunch", "Dinner", "Snacks"];
    const completedAll = requiredMeals.every(type =>
        mealTypes.includes(type)
    );

    if (completedAll) {
        unlockFoodBadge("healthy_logger");
    }
}


// Display saved meals
function renderMeals() {
    mealList.innerHTML = "";

    meals.forEach(meal => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <strong>${meal.mealType}</strong><br>
            Dish: ${meal.dish}<br>
            Calories: ${meal.calories} kcal<br>
            Protein: ${meal.protein} g<br>
            Carbs: ${meal.carbs} g<br>
            Fat: ${meal.fat} g<br>
            ${meal.image ? `<img src="${meal.image}" width="120">` : ""}
        `;

        mealList.appendChild(div);
    });
}

renderMeals();

// Save food
function saveFood() {
    const mealType = document.getElementById("mealType").value;
    const dish = document.getElementById("dishName").value;
    const imageInput = document.getElementById("foodImage");

    if (!dish) {
        alert("Enter dish name");
        return;
    }

    const macros = getMacros(dish);

    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function () {
            addMeal(mealType, dish, macros, reader.result);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        addMeal(mealType, dish, macros, null);
    }
}

function addMeal(mealType, dish, macros, image) {
    meals.push({
        mealType,
        dish,
        calories: macros.calories,
        protein: macros.protein,
        carbs: macros.carbs,
        fat: macros.fat,
        image
    });

    saveData(todayFoodKey, meals);
renderMeals();
checkFoodGoals();

}
