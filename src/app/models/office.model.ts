export class Office {
  private _id: string;
  private _name: string;
  private _location: string;
  private _email: string;
  private _telnumber: string;
  private _maxNumberOfOccupants: number;
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
  public get id() {
    return this._id;
  }
  public get name() {
    return this._name;
  }
  public set name(officeName: string) {
    this._name = officeName;
  }
  public get location() {
    return this._location;
  }
  public set location(officeLocation: string) {
    this._location = officeLocation;
  }
  public get email() {
    return this._email;
  }

  public set email(theEmail: string) {
    this._email = theEmail;
  }
  public get telnumber() {
    return this._telnumber;
  }
  public set telnumber(telNumber: string) {
    this._telnumber = telNumber;
  }
  public get maxNumberOfOccupants() {
    return this._maxNumberOfOccupants;
  }
  public set maxNumberOfOccupants(maxOccupants: number) {
    this._maxNumberOfOccupants = maxOccupants;
  }
  public get color() {
    return this._color;
  }
  public set color(color: string) {
    this._color = color;
  }
}
