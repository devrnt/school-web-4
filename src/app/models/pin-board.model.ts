import { Post } from "./post.model";
import { Location } from "./location.model";

export class PinBoard {
    city: string;
    location: Location;
    posts: Post[];

    constructor(city: string, location: Location){
        this.city = city;
        this.location = location;
        this.posts = [];
    }

    getAmountOfPosts():number {
        return this.posts.length;
    }

    addPost(post: Post){
        this.posts.push(post);
    }
}
