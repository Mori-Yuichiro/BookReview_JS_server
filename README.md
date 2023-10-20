# BookReview_SERVER(鋭意製作中)

## 環境
Express 4.18.2  
MySQL2 3.6.2

# 動作確認
※ 本リポジトリはBookReview_JSと合わせて使用します

1. Githubから本リポジトリをクローンします。

2. クローンしたリポジトリに移動し、以下のコマンドを入力
```
npm install
```

3. 自分のPCにMySQLをインストールし、以下のコマンドを入力してDBとテーブルを作成

```
・create database book_comment;
・use book_comment;

・create table books (id int auto_increment primary key, title varchar(25) not null, isbn varchar(25) not null);

・create table comments (id int auto_increment primary key, isbn varchar(25) not null, comments text, foreign key (isbn) references books(isbn));
```

4. 以下のコマンドを入力して起動する
```
node app.js
```
