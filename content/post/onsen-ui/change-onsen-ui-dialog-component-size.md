---
title: 'Onsen-UIのDialogコンポーネントサイズを変更する'
date: 2019-07-04T03:01:22+09:00
tags: [Onsen-UI, JavaScript]
draft: false
archives: '2019'
author: Amatsuki
---

## TL;DR

- Onsen-UI 読み込み後に出力される Dialog をコピーして手動で使う
- Dialog 群の形だけ取得しているので、Show, Hide 共にこちら側で呼ぶ必要あり
- Onsen-UI のタグオブジェクトから、Onsen-UI 側で用意されている`show()`, `hide()`などが呼び出せる
  - これを使って自分で制御を行う

## 概要

以下の画像のような、アラートのサイズを変更したいのにできない。
Onsen-UI の公式リファレンスを見ても Dialog の項目にそれっぽい動作をしてくれる Dialog はない。。
![onsenui-alert](/resources/change-onsen-ui-dialog-component-size/alert.png)

## 解決方法 🤗

1. `ons.notification.alert();`を実行して、で Onsen-UI の要素を取得する。
2. 要素を html に貼り付ける。
3. `ons-alert-dialog`に`id`をつけて、手動で Dialog の表示/非表示を制御する。

ons タグのオブジェクトを js で取得すると、`show()`や`hide()`などのメソッドが使用できるようになる。  
https://onsen.io/v2/api/js/ons-modal.html#method-show

## 実行結果 🎥

以下の動画では`width="90%"`で設定しています
<video style="width:100%;" autoplay controls loop>
　　<source src="/resources/change-onsen-ui-dialog-component-size/alertDialog.webm" />
</video>

### ソースコード 📓

{{< gist AmatsukiUrato e7c0e76959c13aa28c779f60a4de71e2 >}}
