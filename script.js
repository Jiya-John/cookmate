//creating an onload listener
window.onload = pageReady;

//onload function pageready()
function pageReady(){

    //recipe data
    var recipeData = {
        "chicken_stir_fry": {
            title: "Chicken Stir Fry",
            ingredients: ["Chicken", "Rice", "Bell Pepper", "Oil", "Salt", "Pepper"],
            instructions: "Cook rice and set aside. Sauté chicken in oil until browned. Add chopped bell pepper and stir-fry for 5 minutes. Combine with rice, season, and serve hot.",
            image: "chicken_stir_fry.png"
        },
        "tofu_stir_fry": {
            title: "Tofu Stir Fry",
            ingredients: ["Tofu", "Rice", "Bell Pepper", "Oil", "Salt", "Pepper"],
            instructions: "Cook rice. Pan-fry tofu cubes until golden. Add sliced bell pepper and stir-fry until tender. Mix with rice, season, and serve warm.",
            image: "tofu_stir_fry.png"
        },
        "chicken_broccoli_bake": {
            title: "Chicken & Broccoli Bake",
            ingredients: ["Chicken", "Potatoes", "Broccoli", "Oil", "Salt", "Pepper"],
            instructions: "Boil potatoes and steam broccoli. Layer cooked chicken, broccoli, and potatoes in a baking dish. Drizzle with oil, season, and bake at 375°F for 20 minutes.",
            image: "chicken_and_brocolli_bake.png"
        },
        "tofu_broccoli_bake": {
            title: "Tofu & Broccoli Bake",
            ingredients: ["Tofu", "Potatoes", "Broccoli", "Oil", "Salt", "Pepper"],
            instructions: "Steam broccoli and boil potatoes. Arrange tofu slices, broccoli, and potatoes in a dish. Season and bake at 375°F for 20 minutes until crisp.",
            image: "tofu_and_brocolli_bake.png"
        },
        "chicken_rice_bowl": {
            title: "Chicken Rice Bowl",
            ingredients: ["Chicken", "Rice", "Broccoli", "Oil", "Salt", "Pepper"],
            instructions: "Cook rice and steam broccoli. Sauté chicken until cooked through. Assemble bowl with rice, chicken, and broccoli. Season and serve.",
            image: "chicken_rice_bowl.png"
        },
        "tofu_rice_bowl": {
            title: "Tofu Rice Bowl",
            ingredients: ["Tofu", "Rice", "Broccoli", "Oil", "Salt", "Pepper"],
            instructions: "Cook rice and steam broccoli. Pan-fry tofu until golden. Layer rice, tofu, and broccoli in a bowl. Add seasoning and enjoy.",
            image: "tofu_rice_bowl.png"
        },
        "chicken_hash": {
            title: "Chicken Hash",
            ingredients: ["Chicken", "Potatoes", "Bell Pepper", "Oil", "Salt", "Pepper"],
            instructions: "Dice and boil potatoes. Sauté chicken and bell pepper in oil. Add potatoes and stir-fry until crispy. Season and serve.",
            image: "chicken_hash.png"
        },
        "tofu_hash": {
            title: "Tofu Hash",
            ingredients: ["Tofu", "Potatoes", "Bell Pepper", "Oil", "Salt", "Pepper"],
            instructions: "Boil diced potatoes. Pan-fry tofu and bell pepper. Add potatoes and stir-fry until golden. Season and serve hot.",
            image: "tofu_hash.png"
        }
    };

    //checks if on the recipe details page
    var detailContainer = document.querySelector('.recipe-detail-wrapper');
    if(detailContainer){
        showRecipeDetails();//calling the function
    }

    //function defined to load recipe details based on id
    function showRecipeDetails(){
        var params = new URLSearchParams(window.location.search); //gets recipe id
        var recipeId = params.get('id');

        //checking if recipe exists
        if(recipeId && recipeData[recipeId]){
            var data = recipeData[recipeId];
            //if exists getting the details - title, ingredients list
            document.getElementById('recipe-title').textContent = data.title;
            var ingList = document.getElementById('ingredients-list');
            data.ingredients.forEach(function(ing){
                var li = document.createElement('li');
                li.textContent = ing;
                ingList.appendChild(li);
            });
            //getting instructions and the recipe image
            document.getElementById('instructions-text').textContent = data.instructions;
            document.getElementById('recipe-image').src = "img/" + data.image;
        }
    }

    //recipe buttons on click navigates to recipe details page
    var recipeButtons = document.querySelectorAll('.recipe-link-btn');
    recipeButtons.forEach(function(btn){
        btn.onclick = function(){
            var id = btn.getAttribute('data-recipe');
            window.location.href = "recipe-details.html?id=" + id;
        };
    });

    //grocery list page
    var groceryListElement = document.getElementById('grocery-list');
    if(groceryListElement){
        setupGroceryList(); //function call
    }

    //function definition for add, delete, display grocery list
    function setupGroceryList(){
        //defining variables - name, quantity, button
        var nameInput = document.getElementById('new-item-name');
        var qtyInput = document.getElementById('new-item-qty');
        var addBtn = document.getElementById('add-btn');
        //load saved groceries from local storage
        var groceryItems = JSON.parse(localStorage.getItem('myGroceryList')) || [];
        renderGroceryList(); //calls function to display

        //onclick event to add item to grocery list
        addBtn.onclick = addItem;

        //function to display grocery list
        function renderGroceryList(){
            groceryListElement.innerHTML = "";
            groceryItems.forEach(function(item, index){
                var gItem = document.createElement('div');
                gItem.className = "grocery-item";
                gItem.innerHTML = `
                    <span>${item.name}</span>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <label style="font-size: 0.9rem;">Qty</label>
                        <input type="text" value="${item.qty}" class="grocery-input-qty" readonly>
                        <button class="delete-btn" onclick="deleteItem(${index})">
                            <img src="img/delete_icon.png" alt="Delete">
                        </button>
                    </div>
                `;
                groceryListElement.appendChild(gItem);
            });
        }

        //function to add item to grocery list
        function addItem() {
            //Variables name and quantity
            var name = nameInput.value.trim();
            var qty = qtyInput.value.trim();
            var errorMsg = document.getElementById('grocery-error-msg');

            //clears previous error message
            errorMsg.textContent = "";

            // checking null values
            if (!name || !qty) {
                errorMsg.textContent = "Please enter both a name and a quantity.";
                return;
            }

            // checking if quantity is negative or zero 
            if (qty <= 0) {
                errorMsg.textContent = "Quantity must be a positive number.";
                return;
            }

            // If valid input then add item
            groceryItems.push({ name: name, qty: qty });
            localStorage.setItem('myGroceryList', JSON.stringify(groceryItems));
            renderGroceryList();

            // Clearing inputs
            nameInput.value = "";
            qtyInput.value = "";
        }

        //function to delete item from grocery list
        window.deleteItem = function(index){
            groceryItems.splice(index,1);
            localStorage.setItem('myGroceryList', JSON.stringify(groceryItems));
            renderGroceryList();
        };
    }

    //shows suggestion based on grocery items list
    var suggestionContainer = document.getElementById('suggestion-list');
    if(suggestionContainer){
        suggestRecipes();
    }

    //function to suggest recipes
    function suggestRecipes(){
        //load groceries and converts to lower case for matching
        var myGroceries = JSON.parse(localStorage.getItem('myGroceryList')) || []; 
        var myPantryItems = myGroceries.map(function(item){
            return item.name.toLowerCase().trim();
        });

        var matchFound = false;

        //loop through all recipes
        for(var id in recipeData){
            var recipe = recipeData[id];
            //checking if user has required ingredients
            var hasAllIngredients = recipe.ingredients.every(function(ing){
                return myPantryItems.includes(ing.toLowerCase().trim());
            });

            //if match found creates a recipe card when clicked goes to recipe details page
            if(hasAllIngredients){
                matchFound = true;
                var btn = document.createElement('button');
                btn.className = "recipe-card-btn recipe-link-btn";
                btn.textContent = recipe.title;
                btn.onclick = function(recipeId){
                    return function(){
                        window.location.href = "recipe-details.html?id=" + recipeId;
                    };
                }(id);
                suggestionContainer.appendChild(btn);
            }
        }

        //if no match found, showing message
        if(!matchFound){
            var msg = document.getElementById('no-match-msg');
            if(msg) msg.style.display = "block";
        }
    }
}