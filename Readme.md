## Sequelize-initで初期化

```
npx sequelize-cli init
```

docker-compose.yamlの情報を/config/config.jsonに変更  

### DB作成
```
$ npx sequelize-cli db:create
```

### DB削除
```
$ npx sequelize-cli db:drop
```



### モデルからマイグレーションファイルを作成

```
$ npx sequelize-mig migration:make
```

### DBに入力するときの文字コードを使えるようにする。
000000-fix-db-charset.js


### マイグレーション実行
```
$ npx sequelize-cli db:migrate
```

### シーダーテンプレートファイル追加
```
$ npx sequelize-cli seed:generate --name test-users
```

### シーダー実行
```
$ npx sequelize-cli db:seed:all
```

### 一部のシーダー実行
```
$ npx sequelize-cli db:seed --seed ./seeders/20220706073442-sales-states.js
```

### シーダーをすべて戻す
```
# npx sequelize-cli db:seed:undo:all
```

### GCP操作
```
gcloud projects list
```

### GCPデプロイ方法
```
gcloud server deploy server-production.yaml --project test-api-ookochi
// 1番を選択
// yを選択
```

初めての場合はapp-production.yamlのserviceをdefaultに設定する
googleのアカウントでエラーが出る。
時間差でエラーが出る可能性があるが同じアカウントでAPIを有効にすれば大丈夫。

### CloudSQLを作成
インスタンスを作成して設定通りに進む。

### CloudSQLの設定
https://zenn.dev/suyaa/articles/93b23462b08e95
最安はus-central1(lowa)
single zone

### CloudSQLの接続をクリック

ネットワークをクリックして
承認済みネットワークの名前とIPアドレス（グローバルIPアドレス）を入力
https://www.cman.jp/network/support/go_access.cgi

config/config.jsonの設定ファイルのproductionを変更
```JSON
 "dialectOptions": {
      "socketPath": "/cloudsql/test-api-ookochi-1:us-central1:test-api-ookochi-1"
    }
```

```json
"local-to-prod": {
    "username": "root",
    "password": "^$-?#j4'I#i+o=o`",
    "database": "database_production",
    "host": "34.133.160.104",
    "dialect": "mysql",
    "logging": false
    }
```

### Cloud SQLをマイグレーションする
```shell
$ NODE_ENV=local-to-prod npx sequelize-cli db:create
```

cloudslqにマイグレーション
```shell
$ NODE_ENV=local-to-prod npx sequelize-cli db:migrate
```

seedファイルを挿入
```shell
$ NODE_ENV=local-to-prod npx sequelize-cli db:seed:all
```

最後に
```
```
# test-api
