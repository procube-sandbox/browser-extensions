# Chrome, Edge 拡張機能
chromium-extensionはChrome,Edge両方で、コードの変更なしで使用できる。

## Chrome 開発方法

### 拡張機能の実行手順

1. ブラウザで`chrome://extensions/`にアクセス。
2. 画面右上のスイッチをクリックし、デベロッパーモードを有効にする。
3. 画面左上のパッケージ化されていない拡張機能を読み込むをクリック。
4. 本レポジトリの`chromium-extension`ディレクトリを選択する。
5. 拡張機能が追加されれば成功。

### デバッグ方法

#### background page

1. ブラウザで`chrome://extensions/`にアクセス。
2. 拡張機能の`ビューを検証 バックグラウンドページ`をクリック。
3. DevTools が起動する。

#### browser action(popup)

1. ブラウザのアドレスバー右にある拡張機能のアイコン右クリック。
2. `ポップアップを検証`をクリック。
3. DevTools が起動する。

#### content script

`Chromeメニュー -> 表示 -> 開発 / 管理 -> デベロッパーツール`
から DevTools を起動する。

## Edge 開発方法

### 拡張機能の実行手順

1. ブラウザで`edge://extensions/`にアクセス。
2. 画面左下のスイッチをクリックし、開発者モードを有効にする。
3. 画面中央の展開して読み込みをクリック。
4. 本レポジトリの`chromium-extension`ディレクトリを選択する。
5. 拡張機能が追加されれば成功。

### デバッグ方法

#### background page

1. ブラウザで`edge://extensions/`にアクセス。
2. 拡張機能の`ビューの検査 バックグラウンドページ`をクリック。
3. DevTools が起動する。

#### browser action(popup)

1. ブラウザのアドレスバー右にある拡張機能のアイコン右クリック。
2. `ポップアップ ウィンドウの検査`をクリック。
3. DevTools が起動する。

#### content script

`Edgeメニュー -> ツール -> 開発者 -> 開発者ツール`
から DevTools を起動する。