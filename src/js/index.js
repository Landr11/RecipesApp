
//Import the Search class from 
import Search from "./models/Search";
//Import Recipe class
import Recipe from "./models/Recipe";
//Import item List
import List from "./models/List";
//Import functions from 
import * as searchView from "./views/searchView";
//Import functions from 
import * as recipeView from "./views/recipeView";
//Import ListView
import * as listView from "./views/listView";
//Import the DOM strings from 
import {elements, renderLoader, clearLoader} from "./views/base";


/** The Global State of the app / Data 
 *  -Search Object / Search result
 * Current recipe object
 * Shopping list object
 * Liked recipes object
*/

/**
 * 
 * SEARCH CONTROLLER
 * 
 */

const state = {};
window.state = state;

const controlSearch = async() =>{
    // 1. Get the query from view
    const query = searchView.getInput();
    

    if(query){
        // 2. Create a New search object and add to state
        state.search = new Search(query);

        // 3. Prepare the UI for the results/clear inputs
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try{
            // 4. Perform the Search
        await state.search.getResults();

        // 5.Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
      }catch(err){
        alert("Something went wrong with the search");
        clearLoader();
    } 
  }   
};



elements.searchForm.addEventListener("submit", e => {
   e.preventDefault();
   controlSearch(); 
});


//EventListener to go to next or prev page .closest method to target ancestor element
elements.searchResPages.addEventListener("click", e =>{
   const btn = e.target.closest(".btn-inline");
   if(btn){
       const goToPage = parseInt(btn.dataset.goto, 10)
       searchView.clearResults();
       searchView.renderResults(state.search.result, goToPage);
   }
});


/**
 * 
 *RECIPE CONTROLLER 
 * 
 */

 const controlRecipe = async () => {
     //GET ID from URL using hash
     const id = window.location.hash.replace("#", "");
     console.log(id);

     if(id){
     // Prepare UI for changes
     recipeView.clearRecipe();
     renderLoader(elements.recipe);

     //Highlight selected search item
     if(state.search) searchView.highlightSelected(id);

     //Create a new Recipe Object
     state.recipe = new Recipe(id);

     try {
        //Get recipe data and parse Ingredients
     await state.recipe.getRecipe();
     state.recipe.parseIngredients();

     //Calculate servings and time
     state.recipe.calcTime();
     state.recipe.calcServings();

     //Render recipe to UI

     clearLoader();
     recipeView.renderRecipe(state.recipe);
        } catch(err) {
            alert("ERROR PROCESSING RECIPE!");
       }
    }
 };

 //Add EventListener to multiple event, on page load

 ["hashchange", "load"].forEach(event => window.addEventListener(event, controlRecipe));



 /**
 * 
 *LIST CONTROLLER 
 * 
 */

 const controlList = () => {
     //Create a new list if theres none, initialize 
     if(!state.list) state.list = new List();
     
     //Add each ingredient to the list
     state.recipe.ingredients.forEach(el => {
      const item = state.list.addItem(el.count, el.unit, el.ingredient);
      listView.renderItem(item);
     });
 }


 // Handle delete and update list item events
 elements.shopping.addEventListener("click", e => {
  const id = e.target.closest(".shopping__item").dataset.itemid;

  //Handle the delete button
  if(e.target.matches(".shopping__delete, .shopping__delete *")){
      //Delete it from the state
      state.list.deleteItem(id);

      //Delete it from UI
      listView.deleteItem(id);
  } else if(e.target.matches(".shopping__count-value")){
      //Handle the count update 
      const val = parseFloat(e.target.value, 10);
      if(val >= 0){
        state.list.updateCount(id, val);
      }
     
  }

 });


// Handling recipe button clicks 
elements.recipe.addEventListener("click", e => {
    // use the target method and css selectors to target elements that arent yet on the page
   if(e.target.matches(".btn-decrease, .btn-decrease *")){
    //Decrease button clicked 
    if (state.recipe.servings > 1 ){
        state.recipe.updateServings("dec");
        recipeView.updateServingsIngredients(state.recipe);
      }
   } else if (e.target.matches(".btn-increase, .btn-increase *")){
    //Increase button clicked
    state.recipe.updateServings("inc")
    recipeView.updateServingsIngredients(state.recipe);
   } else if(e.target.matches(".recipe__btn--add, .recipe__btn--add *")){
       controlList();
   }
});

window.l = new List();