export class Staff {
    private firstName: string;
    private lastName: string;
    private id: string;

    constructor(firstname: string, lastName: string, id: string) {
        this.firstName = firstname;
        this.lastName = lastName;
        this.id = id;
    }

   public get _firstName(): string {
        return this.firstName;
    }
    public set _firstName(name: string) {
        this.firstName = name;
    }
    public get _lastName(): string {
        return this.lastName;
    }
    public set _lastName(name: string) {
        this.lastName = name;
    }
    public get _id(): string {
        return this.id;
    }
}