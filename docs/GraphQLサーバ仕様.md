# GraphQL 仕様

## ディレクトリ構成

```bash
├── src  # GraphQLのコードはここに格納
│   ├── db.ts  # オブジェクト形式のモックデータベース
│   ├── index.ts  # サーバのエントリーポイント
│   ├── resolvers  # リゾルバを実装するディレクトリ
│   └── typeDefs.graphql  # GraphQLスキーマ
├── test
├── .eslintrc.json  # linterの設定ファイル
├── .prettierrc.json  # formatterの設定ファイル
├── jest.config.js
├── package-lock.json
├── package.json
└── tsconfig.json
```

## API へのリクエストの送り方

`http://localhost:4000/graphql`に POST メソッドでリクエストを送る。json をリクエストボディにして送信する。  
js の fetch()でリクエストする場合の例は以下の通り。

```js
const requestBody = {
  // ここにGraphQLクエリを記述する。
  query: `
      query getCredential($input: GetCredentialInput!){
        getCredential(input: $input) {
          userID
          userPW
        }
      }`,
  // ここに引数を記述する。
  variables: {
    input: { apiToken: 'sampleApiToken', url: 'http://sample.url' },
  },
};
fetch(API_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(requestBody),
});
```

また、Web ブラウザで`http://localhost:4000/graphql`にアクセスすると GraphQL playground を利用でき、ここでクエリを簡単に試すことができる。

## スキーマ

DOM の情報は XPath で定義されている。  
apiToken は拡張機能提供者が発行するものである。

- `LoginDom`: web サイトの DOM の XPath のスキーマ
  - `url`: 自動ログインを行う Web サイトのログインページの URL。クエリパラメータやアンカーリンクは取り除く。
  - `name`: Web サイトの名前
  - `idXPath`: ログイン ID を入力するフォームの XPath
  - `pwXPath`: パスワードを入力するフォームの XPath
  - `submitXPath`: ログインボタンの XPath
- `Credential`: 自動ログインに必要な ID とパスワードのスキーマ
  - `id`: Credential スキーマ 1 つ 1 つが持つユニークな ID。データベースでいうところのプライマリキーである。
  - `apiToken`: 拡張機能からのリクエストが誰からのものかを特定するためのトークン。このトークンは拡張機能利用者のために拡張機能提供者が発行する。
  - `url`: 自動ログインを行う Web サイトのログインページの URL。クエリパラメータやアンカーリンクは取り除く。
  - `userID`: ログイン ID
  - `userPW`: ログインパスワード

```graphql
type LoginDom {
  url: ID!
  name: String
  idXPath: String!
  pwXPath: String!
  submitXPath: String!
}

type Credential {
  id: ID!
  apiToken: String!
  url: String!
  userID: String!
  userPW: String!
}

input GetCredentialInput {
  apiToken: String!
  url: String!
}

type Query {
  getLoginDomByUrl(url: ID!): LoginDom
  getCredential(input: GetCredentialInput!): Credential
}
```

## XPath の取得方法

Web ブラウザの開発者ツールから手軽に HTML 要素の XPath を取得することができる。
Chrome での XPath 取得方法については以下の通り。

1. `Chromeメニュー -> 表示 -> 開発 / 管理 -> デベロッパーツール`から DevTools を起動
2. Elements タブを開く
3. Elements 上で取得したい HTML 要素のタグを右クリック
4. `Copy -> Copy XPath`を選択

## 外部との接続

GraphQL で Query や Mutation を実装する際に外部の API や DB との通信を行うことがあるが、その場合には`Data source`を用いると良い。  
今回のモックデータに関しては`Data source`を用いず `index.ts` にて `context` に注入している。
参考: https://apollographql-jp.com/tutorial/data-source/

## 開発方法

### 環境構築

```bash
# in graph-pl directory
npm ci
```

### 起動方法

nodemon で ts-node を起動する。
起動中のコード変更の際はホットリロードされるため、コード変更のたびに再起動する必要はない。

```bash
npm run start
```

### テスト実行方法

```bash
npm run test
```

### Lint 実行方法

```bash
npm run lint
```
