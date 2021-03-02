# chrome 拡張機能 仕様について

## 拡張機能に関する概念

- Browser Action  
  URL バー右の拡張機能のアイコンをクリックしたときに実行される。
  ポップアップ UI を表示したり、アイコンクリックをトリガーにスクリプト実行をすることができる。

- Background Page  
  ブラウザの背後で実行されているスクリプトである。

- content script  
  ブラウザ上で表示されているページに対してスクリプトを実行する事ができる。
  DOM 操作はこれを用いて行う。表示されているページの DOM 操作はむしろ content script でしか出来ないことに注意。

## 動作フロー

### フローチャート

![Image](./img/flow.jpg)

### Browser Action

API に登録されている、ユーザーを特定するためのトークンを拡張機能にセットする。

### Background Page

1. ブラウザ起動時に`background.js`を実行。  
   自動ログイン対象の URL を`REGISTERED_URL`に格納する。

2. `chrome.tabs.onUpdated.addListener`によってページが切り替わるたびにコールバック関数を実行する。

#### `chrome.tabs.onUpdated.addListener`のコールバック関数の動作

1. `isReaccess(url)`: 再アクセスか判定する。ログイン失敗時に再ログイン繰り返す挙動を防ぐ。
2. `isUnregistered(url)`: アクセスした Website が自動ログイン対象か判定。
3. `login(tab, url)`: ログイン処理をおこなう。

#### `login()`の動作

1. `localStorage.getItem`: localStorage に格納されたアクセストークンを取得。Token は GraphQL 上でユーザーを特定するためのものである。
2. `getloginDom`: loginDom を取得する。
3. `getCredential`: credential(ログイン先のユーザー ID とパスワード)を取得する。
4. `chrome.tabs.sendMessage()`: loginDom と credential を content script に送信。

### content script

1. `chrome.runtime.onMessage.addListner`: `background.js`から Message を受け取ったときに発火する。
2. コールバック関数では`background.js`loginDom に格納された XPath を元に Dom を取得して、各 input 要素を埋め、送信ボタンをクリックする。
