
//Import the Search class from 
import Search from "./models/Search";
//Import the DOM strings from 
import {elements, renderLoader, clearLoader} from "./views/base";
//Import functions from 
import * as searchView from "./views/searchView";

/** The Global State of the app / Data 
 *  -Search Object / Search result
 * Current recipe object
 * Shopping list object
 * Liked recipes object
*/

const state = {};


const controlSearch = async () =>{
    // 1. Get the query from view
    const query = searchView.getInput();
    console.log(query);

    if(query){
        // 2. Create a New search object and add to state
        state.search = new Search(query);

        // 3. Prepare the UI for the results/clear inputs
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // 4. Perform the Search
        await state.search.getResults();

        // 5.Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
};



elements.searchForm.addEventListener("submit", e => {
   e.preventDefault();
   controlSearch(); 
});

elements.searchResPages.addEventListener("click", e =>{
   const btn = e.target.closest(".btn-inline");
   if(btn){
       const goToPage = parseInt(btn.dataset.goto, 10)
       searchView.clearResults();
       searchView.renderResults(state.search.result, goToPage);
   }
});

