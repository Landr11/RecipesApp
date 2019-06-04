import {elements} from "./base";

import { limitRecipeTitle } from "./searchView";


//Toggle the Like button
export const toggleLikeBtn = isLiked =>{
    const iconString = isLiked ? "icon-heart" : "icon-heart-outlined";
    document.querySelector(".recipe__love use").setAttribute("href", `img/icons.svg#${iconString}`);
  // icons.svg#icon-heart-outlined

};


//Toggle the Like Recipes Icon
export const toggleLikeMenu = numLikes => {
      elements.likesMenu.style.visibility = numLikes > 0 ? "visible" : "hidden";
};


//
export const renderLike = like => {
    const markup = `
    <li>
    <a class="likes__link" href="#${like.id}">
        <figure class="likes__fig">
            <img src="${like.img}" alt="${like.title}">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
            <p class="likes__author">${like.author}</p>
        </div>
    </a>
</li>
    `;

    //Insert like recipe on the Like recipe Icon
    elements.likesList.insertAdjacentHTML("beforeend", markup);

};

//Delete the Like Recipe
export const deleteLike = id =>{
    //Select the links with the likes__link class
    const el = document.querySelector(`.likes__link[href*="#${id}"]`).parentElement;
    if(el) el.parentElement.removeChild(el);
}
