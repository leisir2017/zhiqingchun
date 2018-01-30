import {Injectable} from '@angular/core';

@Injectable()
export class User {

    private _id:number;
    private _username:string;
    private _password:string;
    private _gender:number;
    private _age:number;
    private _intro:string;
    private _email:string;
    private _phone:string;
    private _location:string;
    private _avatar:string = "assets/imgs/avatar.png";


    get id():number {
        return this._id;
    }

    set id(value:number) {
        this._id = value;
    }

    get username():string {
        return this._username;
    }

    set username(value:string) {
        this._username = value;
    }

    get password():string {
        return this._password;
    }

    set password(value:string) {
        this._password = value;
    }

    get gender():number {
        return this._gender;
    }

    set gender(value:number) {
        this._gender = value;
    }

    get age():number {
        return this._age;
    }

    set age(value:number) {
        this._age = value;
    }

    get intro():string {
        return this._intro;
    }

    set intro(value:string) {
        this._intro = value;
    }

    get email():string {
        return this._email;
    }

    set email(value:string) {
        this._email = value;
    }

    get phone():string {
        return this._phone;
    }

    set phone(value:string) {
        this._phone = value;
    }

    get location():string {
        return this._location;
    }

    set location(value:string) {
        this._location = value;
    }

    get avatar():string {
        return this._avatar;
    }

    set avatar(value:string) {
        this._avatar = value;
    }

}