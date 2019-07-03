---
title: "Onsen UIのDialogコンポーネントサイズを変更する"
date: 2019-07-04T03:01:22+09:00
lastmod: 2019-07-04T03:01:22+09:00
tags: [OnsenUI, JavaScript]
draft: true
---
## TL;DR
- Onsen UI読み込み後に出力されるDialogをコピーして手動で使う
- Dialog群の形だけ取得しているので、Show, Hide共にこちら側で呼ぶ必要あり
- Onsen UIのタグオブジェクトから、Onsen UI側で用意されている`show()`, `hide()`などが呼び出せる
    - これを使って自分で制御を行う

## 概要
以下の画像のような、アラートのサイズを変更したいのにできない。
Onsen UIの公式リファレンスを見てもDialogの項目にそれっぽい動作をしてくれるDialogはない。。
![onsenui-alert](/Onsen UI/alert.png)

## 解決方法🤗
1. `ons.notification.alert();`を実行して、でOnsen UIの要素を取得する。
2. 要素をhtmlに貼り付ける。
3. `ons-alert-dialog`に`id`をつけて、手動でDialogの表示/非表示を制御する。

onsタグのオブジェクトをjsで取得すると、`show()`や`hide()`などのメソッドが使用できるようになる。  
https://onsen.io/v2/api/js/ons-modal.html#method-show

## 実行結果🎥
以下の動画では`width="90%"`で設定しています
<video style="width:100%;" autoplay controls loop>
　　<source src="/Onsen UI/alertDialog.webm" />
</video>

### ソースコード📓
<script src="https://gist.github.com/AmatsukiUrato/e7c0e76959c13aa28c779f60a4de71e2.js"></script>
