import {elements} from "./base";


//Render Items on the shopping list view
export const renderItem = item => {
    //Markup for the shopping list
    const markup = `
                <li class="shopping__item" data-itemid=${item.id}>
                    <div class="shopping__count">
                        <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
                        <p>${item.unit}</p>
                    </div>
                    <p class="shopping__description">${item.ingredient}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>
    
    `;

    //Insert markup to page
    elements.shopping.insertAdjacentHTML("beforeend", markup);
};

//Delete Items on the shopping list view
export const deleteItem = id =>{
    const item = document.querySelector(`[data-itemid="${id}"]`);
    item.parentElement.removeChild(item);
};