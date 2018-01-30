import { Injectable } from '@angular/core';
import { SQLiteObject } from "@ionic-native/sqlite";
import { SqliteProvider } from "../sqlite/sqlite";
import { User } from "../../model/user";
/*
 Generated class for the UsertableProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class UsertableProvider {
    database:SQLiteObject;

    constructor(public dataProvider:SqliteProvider) {

        this.database = this.dataProvider.myAppDatabase;
    }

    insertIntoUserTable(user:User) {
        this.database.executeSql('INSERT INTO users VALUES (?, ?, ?, NULL, NULL, NULL, NULL, NULL);', [user.email, user.username, user.password]).then(() => console.log('insert into users table successfully')).catch(e => console.log(e));
    }

    queryUserTable() {
        this.database.executeSql('SELECT * FROM users;', {}).then(() => console.log('query users table successfully')).catch(e => console.log(e));
    }

    updateUserTable(user:User) {
        this.database.executeSql('UPDATE users SET username=?, password=?, gender=?, age=?, intro=?, phone=?, location=? WHERE email=?;', [user.username, user.password, user.gender, user.age, user.intro, user.phone, user.location, user.email]).then(() => console.log('update users table successfully')).catch(e => console.log(e));
    }

}
