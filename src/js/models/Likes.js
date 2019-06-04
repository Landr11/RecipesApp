export default class Likes {
    constructor(){
        this.likes = [];
    }

    //Likes method

    addLike(id, title, author, img){
        //add like and push
        const like ={id, title, author, img};
        this.likes.push(like);
        return like;
    }

    deleteLike(id){
        //Find the position of the like based on the passed ID
        const index = this.likes.findIndex(el => el.id === id);
        //Remove the like after finding the index
        this.likes.splice(index, 1);
    }

    isLike(id){
        //Return false if the recipe is not liked
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumberLikes(){
        //return the number of likes
        return this.likes.length;
    }
}