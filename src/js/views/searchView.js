import {elements} from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value ="";
};

//Clear previous data
export const clearResults = () => {
    elements.searchResList.innerHTML = "";
    elements.searchResPages.innerHTML = "";
};

export const highlightSelected = id =>{
    //Put all classes in an array to deselect
    const resultsArr = Array.from(document.querySelectorAll(".results__link"));
    resultsArr.forEach(el => {
          el.classList.remove("results__link--active");
    });

    //use css selector to select links with attributes to be highlighted
    document.querySelector(`a[href*="#${id}"]`).classList.add("results__link--active");

};


//Reduce the title size 
const limmitRecipeTitle = (title, limit = 17) => {
    //reduce the title is the length is greater than 17
    const newTitle = [];
    if(title.length > limit){
        title.split(" ").reduce((acc, cur) =>{
            if (acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        return `${newTitle.join(" ")} ...`
    }

    //return title if length is less than or equal to limit
    return title;
}



// Render the recipes on the page
const renderRecipe = recipe => {
    const markup =`
<li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limmitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>`;

elements.searchResList.insertAdjacentHTML("beforeend", markup);

};

//HTML Page render markup
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto= ${type === "prev" ? page - 1 : page + 1}>
    <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === "prev" ? "left" : "right"}"></use>
        </svg>  
    </button>
`;



//Pagination Logic
const renderButtons = (page, numResults, resPerpage) => {
    const pages = Math.ceil(numResults / resPerpage);

    let button;

    if(page === 1 && pages > 1 ){
        //Display only next page button
        button = createButton(page, "next");
    } else if (page < pages){
        //Display next and previous buttons
        button = `
           ${createButton(page, "prev")}
           ${createButton(page, "next")}
        
        `
    } else if (page === pages && pages > 1){
        //Display only previous button
        button = createButton(page, "prev");
    }
  
    //insert button HTML markup on the page
    elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};



//Function call to render the recipes and Pagination
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    //Render results of current page
    const start = (page -1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(el => renderRecipe(el)); // or recipes.forEach(renderRecipe) each values would be passed to the =>
   //Render the pagination buttons
   renderButtons(page, recipes.length, resPerPage);

};