export default class Likes {
    constructor(){
        this.likes = [];
    }

    //Likes method

    addLike(id, title, author, img){
        //add like and push
        const like ={id, title, author, img};
        this.likes.push(like);

        //Save data/Persist data in localStorage
        this.persistData();

        return like;
    }

    deleteLike(id){
        //Find the position of the like based on the passed ID
        const index = this.likes.findIndex(el => el.id === id);
        //Remove the like after finding the index
        this.likes.splice(index, 1);
        
        //Save data/Persist data in localStorage
        this.persistData();
    }

    isLike(id){
        //Return false if the recipe is not liked
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumberLikes(){
        //return the number of likes
        return this.likes.length;
    }

    persistData(){
        localStorage.setItem("likes", JSON.stringify(this.likes)); //JSON.stringify transforms data into string
    }

    readStorage(){
        const storage = JSON.parse(localStorage.getItem("likes")); //JSON.parse converts data to a JS Object
        //If theres persisted data/saved data   restore the data from localStorage
         if(storage)  this.likes = storage;
    }
}