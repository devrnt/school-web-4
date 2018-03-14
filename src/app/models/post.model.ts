export class Post {
    title:string;
    body:string;
    dateCreated: Date;

    constructor(title: string, body: string){
        this.title = title;
        this.body = body;
        this.dateCreated = new Date();
    }
}
