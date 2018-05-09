export class Post {
    private _id: string;
    private _title: string;
    private _body: string;
    private _dateCreated: Date;
    private _likes: number;

    constructor(title: string, body: string, dateCreated: Date = null, likes: number = null) {
        this._title = title;
        this._body = body;
        // if dateCreated is null check
        dateCreated ? this._dateCreated = dateCreated : this._dateCreated = new Date();
        likes ? this._likes = likes : this._likes = 0;
    }

    static fromJSON(json: any): any {
        let post = new Post(json.title, json.body, json.dateCreated, json.likes);
        post._id = json._id;
        return post;
    }

    toJSON() {
        return {
            _id: this._id,
            title: this._title,
            body: this._body,
            dateCreated: this._dateCreated,
            likes: this._likes
        }
    }

    get id(): string {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get body(): string {
        return this._body;
    }

    get dateCreated(): Date {
        return this._dateCreated;
    }

    get likes(): number {
        return this._likes;
    }

    set likes(amount: number) {
        this._likes = amount;
    }

    addLike() {
        this._likes++;
    }

    removeLike(){
        this._likes--;
    }
}
