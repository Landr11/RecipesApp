import uniqid from "uniqid";

export default class List {
    constructor(){
        this.items = [];
    }

    addItem(count, unit, ingredient){
        const item = {
            //ES6 syntax if properties with the same name can be omitted 
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

  //Delete an ingredient
    deleteItem(id){
        //Find the position of the item based on the passed ID
        const index = this.items.findIndex(el => el.id === id);
        //Remove the item after finding the index
        this.items.splice(index, 1);
    }

  //Update the ingredient count
    updateCount(id, newCount){
        this.items.find(el => el.id === id).count = newCount;
    }
}