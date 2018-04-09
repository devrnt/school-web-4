import { Post } from "./post.model";
import { Location } from "./location.model";

export class Pinboard {
    private _id: string;
    private _city: string;
    private _location: Location;
    private _posts: Post[];

    constructor(city: string, location: Location, posts: Post[] = []) {
        this._city = city;
        this._location = location;
        this._posts = posts;
    }

    static fromJSON(json: any): Pinboard {
        let pinboard = new Pinboard(
            json.city,
            json.location,
            json.posts.map(Post.fromJSON)
        );
        pinboard._id = json._id;
        return pinboard;
    }

    toJSON() {
        return {
            _id: this._id,
            city: this._city,
            location: this._location,
            posts: this._posts
        }
    }

    get id(): string {
        return this._id;
    }

    get city(): string {
        return this._city;
    }

    get location(): Location {
        return this._location;
    }

    get posts(): Post[] {
        return this._posts;
    }

    getAmountOfPosts(): number {
        return this._posts.length;
    }

    addPost(post: Post) {
        this._posts.push(post);
    }
}
