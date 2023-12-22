const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const mealList = document.getElementById('mealList');
const modalContainer = document.querySelector('.modal-container');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipeCloseBtn');

document.querySelector('.btn1').addEventListener('click', function (event) {
    event.preventDefault(); 
    document.querySelector('.main').scrollIntoView({ behavior: 'smooth' });
  });

document.querySelector('.btn2').addEventListener('click', function (event) {
    event.preventDefault(); 
    document.querySelector('.middle').scrollIntoView({ behavior: 'smooth' });
  });

document.querySelector('#mealImage').addEventListener('click', function (event) {
    event.preventDefault(); 
    document.querySelector('.middle').scrollIntoView({ behavior: 'smooth' });
  });


searchButton.addEventListener('click', async () => {
    const ingredient = searchInput.value.trim();
    if (ingredient) {
        const meals = await searchByIngredient(ingredient);
        displayMeals(meals);
    }
});

mealList.addEventListener('click', async (e) => {
    const card = e.target.closest('.meal-item');
    if (card) {
        const mealId = card.dataset.id;
        const meal = await details(mealId);
        if (meal) {
            Popup(meal);
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const dButton = document.querySelector(".discoverMeal");
    const mealImage = document.getElementById("mealImage");
    const mealName = document.getElementById("mealName");
    const ingList = document.getElementById("ingredientsList");

    async function randomMeal() {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await response.json();

            if (data.meals && data.meals.length > 0) {
                const randomMeal = data.meals[0];

                mealImage.src = randomMeal.strMealThumb;
                mealName.textContent = randomMeal.strMeal;

                const ingredients = [];
                for (let i = 1; i <= 20; i++) {
                    const ingredient = randomMeal[`strIngredient${i}`];
                    const measure = randomMeal[`strMeasure${i}`];

                    if (ingredient && ingredient.trim() !== "") {
                        ingredients.push(`${ingredient}: ${measure}`);
                    }
                }

                ingList.innerHTML = ingredients.map(ingredient => 
                    `<li class="ranIngredient">${ingredient}</li>`).join('');
            }
        } catch (error) {
            console.error('Error to fetch random meal:', error);
        }
    }

    
    dButton.addEventListener('click', randomMeal);

    mealImage.addEventListener('click', function () {
    
        ingredientsList.classList.toggle('visible');
    });
    randomMeal();
});

async function details(mealId) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        console.log(data)
        return data.meals[0];
    } catch (error) {
        console.error('Error fetching meal details:', error);
    }
}

async function searchByIngredient(ingredient) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${ingredient}`);  
        const data = await response.json();
        return data.meals;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayMeals(meals) {
    mealList.innerHTML = '';
    if (meals) {
        meals.forEach((meal) => {
            const mealItem = document.createElement('div');
            mealItem.classList.add('meal-item');
            mealItem.dataset.id = meal.idMeal;
            mealItem.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
            `;
            mealList.appendChild(mealItem);
        });
    } else {
        mealList.innerHTML = '<p>No meals found. Try another ingredient.</p>';
    }
}

const fetchIngredients = (meal) => {
    let ingredientsList = ""
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`]
        if(ingredient){
         const measure = meal[`strMeasure${i}`]
         ingredientsList += `<li>${measure} ${ingredient} </li>`
        }else{
         break
        }
    }
    return ingredientsList
 }
 

function Popup(meal) {
    mealDetailsContent.innerHTML = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
            <p class="recipe-category">${meal.strCategory}</p>
        <div class="ingredients">
            <h3>Ingredients:<h3>
            <ul>${fetchIngredients(meal)}</ul>
        </div>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-img">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        </div>
        
    `;
    modalContainer.style.display = 'block';
}

recipeCloseBtn.addEventListener('click', closeRecipeModal);

function closeRecipeModal() {
    modalContainer.style.display = 'none';
}

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

async function performSearch() {
    const ingredient = searchInput.value.trim();
    if (ingredient) {
        const meals = await searchMealsByIngredient(ingredient);
        displayMeals(meals);
    }
}

const github= document.getElementById('git');

    
    github.addEventListener('click', function () {
        window.location.href = 'https://github.com/vanshika345';
    });

