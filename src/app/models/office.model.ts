export class Office {
  // tslint:disable-next-line: variable-name
  private _id: string;
  // tslint:disable-next-line: variable-name
  private _name: string;
  // tslint:disable-next-line: variable-name
  private _location: string;
  // tslint:disable-next-line: variable-name
  private _email: string;
  // tslint:disable-next-line: variable-name
  private _telnumber: string;
  // tslint:disable-next-line: variable-name
  private _maxNumberOfOccupants: number;
  // tslint:disable-next-line: variable-name
  private _color: string;

  constructor(
    id: string,
    name: string,
    location: string,
    email: string,
    telnumber: string,
    maxNumberOfOccupants: number,
    color: string
  ) {
    this._id = id;
    this._name = name;
    this._location = location;
    this._email = email;
    this._telnumber = telnumber;
    this._maxNumberOfOccupants = maxNumberOfOccupants;
    this._color = color;
  }
  public get id(): string {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }
  public set name(officeName: string) {
    this._name = officeName;
  }
  public get location(): string {
    return this._location;
  }
  public set location(officeLocation: string) {
    this._location = officeLocation;
  }
  public get email(): string {
    return this._email;
  }

  public set email(theEmail: string) {
    this._email = theEmail;
  }
  public get telnumber(): string {
    return this._telnumber;
  }
  public set telnumber(telNumber: string) {
    this._telnumber = telNumber;
  }
  public get maxNumberOfOccupants(): number {
    return this._maxNumberOfOccupants;
  }
  public set maxNumberOfOccupants(maxOccupants: number) {
    this._maxNumberOfOccupants = maxOccupants;
  }
  public get color(): string {
    return this._color;
  }
  public set color(color: string) {
    this._color = color;
  }
}
