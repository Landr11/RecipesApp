import axios from "axios";
import {key} from "../config";


export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
       try{
        const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
        this.title       = res.data.recipe.title;
        this.author      = res.data.recipe.publisher;
        this.img         = res.data.recipe.image_url;
        this.url         = res.data.recipe.source_url;
        this.ingredients = res.data.recipe.ingredients;
       } catch(error) {
        console.log(error);
        alert("something went wrong")
      }
 
  }

  calcTime(){
    //Calculate the time it takes to cook, 15 min for every 3 ingredients
    const numIng  = this.ingredients.length;
    const periods = Math.ceil(numIng/3);
    this.time = periods * 15;
   }

   calcServings(){
       this.servings = 4;
   }

   parseIngredients(){
       const unitsLong  = ["tablespoons", "tablespoon", "ounces", "ounce", "teaspoons", "teaspoon", "cups", "pounds"];
       const unitsShort = ["tbsp", "tbsp", "oz", "oz", "tsp", "tsp", "cup", "pound"];
       const units = [...unitsShort, "kg", "g" ];
       //ForEach ingredient find the matching long unit and replace by the short unit
       const newIngredients = this.ingredients.map(el => {
         // 1. Uniform the units
         let ingredient = el.toLowerCase();
         unitsLong.forEach((unit, i) => {
             ingredient = ingredient.replace(unit, unitsShort[i]);
         });

         // 2. Remove the parenthesis
         ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

         // 3. Parse ingredients into count, unit and ingredient
          //find the units, spilt the ingredient into an array
          const arrIng = ingredient.split(" ");
           //Go through the array and return the index of the array where it matches unitsShort's array
          const unitIndex = arrIng.findIndex(el2 => units.includes(el2));
          
          let objIng;

          if(unitIndex > -1){
              //There is a unit
              // Example 4 1/2 cups, arrCount is [4, 1/2]
              // Example 4 cups, arrCount is [4]
              const arrCount = arrIng.slice(0, unitIndex); 
              let count;
              if (arrCount.length === 1){
                  count = eval(arrIng[0].replace("-", "+"));
              } else{
                  // Join and evaluate the 2 numbers
                  count = eval(arrIng.slice(0, unitIndex).join("+"));
              }
              //Finally build the objIngredient
              objIng ={
                count: count,
                unit: arrIng[unitIndex],
                ingredient: arrIng.slice(unitIndex + 1).join(" ")
            };


          } else if(parseInt(arrIng[0], 10)){ 
              // theres no unit but the first element is a number
              objIng ={
                  count: parseInt(arrIng[0], 10),
                  unit: "",
                  ingredient: arrIng.slice(1).join(" ") //return the rest of the array as the ingredient
              }

          } else if (unitIndex === -1) {
              //There is no unit and no number at the 1st position
               objIng ={
                   count: 1,
                   unit: "",
                   ingredient 
               }
          }

         return objIng;
       });

       this.ingredients = newIngredients;
   }

   //Method to update the servings
   updateServings(type){
    //Servings
    const newServings = type === "dec" ? this.servings - 1 :  this.servings + 1;
    //Ingredients
    this.ingredients.forEach(ing => {
        ing.count = ing.count * (newServings / this.servings);
    })

    this.servings = newServings;
   }
}