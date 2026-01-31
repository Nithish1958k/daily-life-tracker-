function getMacros(dish) {
    const foodDB = {
        "dosa": { calories: 250, protein: 6, carbs: 35, fat: 8 },
        "idli": { calories: 60, protein: 2, carbs: 12, fat: 1 },
        "rice": { calories: 200, protein: 4, carbs: 45, fat: 1 },
        "chicken curry": { calories: 300, protein: 25, carbs: 10, fat: 15 },
        "egg": { calories: 70, protein: 6, carbs: 1, fat: 5 }
    };

    return foodDB[dish.toLowerCase()] || {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
    };
}
