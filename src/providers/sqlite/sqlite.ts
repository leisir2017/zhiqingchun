import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject} from "@ionic-native/sqlite";
/*
 Generated class for the SqliteProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class SqliteProvider {
    myAppDatabase:SQLiteObject;

    constructor(private sqlite:SQLite) {

    }

    initDatabase() {
        this.sqlite.create({
            name: 'zqc.db',
            location: 'default'
        }).then((database:SQLiteObject) => {

            database.executeSql('CREATE TABLE IF NOT EXISTS users(email VARCHAR(320) PRIMARY KEY, username VARCHAR(20) NOT NULL, password VARCHAR(30) NOT NULL, gender BOOLEAN, age TINYINT, intro VARCHAR(300), phone CHAR(11), location VARCHAR(100));', {}).then(() => console.log('init database table users successfully')).catch(e => console.log(e));


            database.executeSql('CREATE TABLE IF NOT EXISTS lists(username VARCHAR(320) PRIMARY KEY, title VARCHAR(300), content VARCHAR(300), images VARCHAR(300), addtime VARCHAR(50), status TINYINT, recommend TINYINT);', {}).then(() => console.log('init database table lists successfully')).catch(e => console.log(e));

            this.myAppDatabase = database;
        })
    }

}
