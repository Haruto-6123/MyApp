```
npm init -y
npm install express nodemon
npm install mysql
npm install marked
npm install body-parse
npm install simple-git
$ npm install ngrok
```

コマンド
```
npm run push
npm start
```

nrgok.exe
```
ngrok http 3000  --basic-auth="username:password"
```
MySQL
```
mysql --user="user" --password
CREATE databases "database";
use "database";
SHOW databases;
CREATE TABLE users (id INT AUTO_INCREMENT, name TEXT, PRIMARY KEY (id));
SHOW tables;
DESCRIBE "users";
```