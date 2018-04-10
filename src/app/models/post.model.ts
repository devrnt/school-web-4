export class Post {
    private _id: string;
    private _title: string;
    private _body: string;
    private _dateCreated: Date;

    constructor(title: string, body: string, dateCreated: Date = null) {
        this._title = title;
        this._body = body;
        // if dateCreated is null check
        dateCreated ? this._dateCreated = dateCreated : this._dateCreated = new Date();
    }

    static fromJSON(json: any): any {
        let post = new Post(json.title, json.body, json.dateCreated);
        post._id = json._id;
        return post;
    }

    toJSON() {
        return {
            _id: this._id,
            title: this._title,
            body: this._body,
            dateCreated: this._dateCreated
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
}
