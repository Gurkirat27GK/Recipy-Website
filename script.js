document.addEventListener("DOMContentLoaded", () => {
    const addRecipeSection = document.getElementById("add-recipe-section");
    const viewRecipesSection = document.getElementById("view-recipes-section");
    const recipesContainer = document.getElementById("recipes-container");
    const recipeForm = document.getElementById("recipe-form");
    const filterCategory = document.getElementById("filter-category");

    document.getElementById("add-recipe-link").addEventListener("click", () => {
        addRecipeSection.classList.remove("hidden");
        viewRecipesSection.classList.add("hidden");
    });

    document.getElementById("view-recipes-link").addEventListener("click", () => {
        addRecipeSection.classList.add("hidden");
        viewRecipesSection.classList.remove("hidden");
        displayRecipes();
    });

    recipeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const recipe = {
            name: document.getElementById("recipe-name").value,
            ingredients: document.getElementById("ingredients").value.split(","),
            category: document.getElementById("category").value,
            steps: document.getElementById("steps").value
        };

        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.push(recipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));

        recipeForm.reset();
        alert("Recipe added!");
    });

    function displayRecipes() {
        recipesContainer.innerHTML = "";
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        const categoryFilter = filterCategory.value;

        recipes.filter(recipe => categoryFilter === "All" || recipe.category === categoryFilter)
            .forEach(recipe => {
                const recipeCard = document.createElement("div");
                recipeCard.classList.add("recipe-card");

                recipeCard.innerHTML = `
                    <h3>${recipe.name}</h3>
                    <p><strong>Category:</strong> ${recipe.category}</p>
                    <table>
                        <tr><th>Ingredients</th></tr>
                        ${recipe.ingredients.map(ing => `<tr><td>${ing.trim()}</td></tr>`).join("")}
                    </table>
                    <p><strong>Steps:</strong> ${recipe.steps}</p>
                `;

                recipesContainer.appendChild(recipeCard);
            });
    }

    filterCategory.addEventListener("change", displayRecipes);

    document.getElementById("dark-mode-toggle").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});
