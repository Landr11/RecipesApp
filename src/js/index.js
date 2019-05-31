
//Import the Search class from 
import Search from "./models/Search";
//Import Recipe class
import Recipe from "./models/Recipe";
//Import the DOM strings from 
import {elements, renderLoader, clearLoader} from "./views/base";
//Import functions from 
import * as searchView from "./views/searchView";
//Import functions from 
import * as recipeView from "./views/recipeView";

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
     console.log(state.recipe);
        } catch(err) {
            alert("ERROR PROCESSING RECIPE!");
       }
    }
 };

 //Add EventListener to multiple event

 ["hashchange", "load"].forEach(event => window.addEventListener(event, controlRecipe));



