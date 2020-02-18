---
title: "Three.jsを学習する【第一回】"
date: 2019-11-09T17:35:48+09:00
tags: [Three.js, JavaScript]
archives: "2019"
author: Amatsuki
draft: false
---
前回の[ブラウザでARを使ってみた]({{< ref "/post/ar/try-to-create-ar-page.md" >}})を触って、オブジェクトを`Three.js`で作りたいと思いました。

`Three.js`を学習するにあたって、[良さげなサイト](https://ics.media/tutorial-three/quickstart/)があったので、こちらを参考に学習していこうと思います。忘備録です。

## functionをアロー関数に変える
なんでアロー関数にしたいのかは、[関数宣言 vs 関数式 | ES2015+](https://qiita.com/raccy/items/aac3b8e3981564bbd1fa)を参照。
```js
window.addEventListener('load', init);

function init() {
    // 処理
}
```
から
```js
const init = () => {
    // 処理
}
window.addEventListener('load', init);
```
に変える。

## Three.jsでオブジェクトを表示させるには

1. レンダラーを作成する
2. シーンを作成する

## 意味
### レンダラー
>描画するシステムのこと  
>[レンダリングエンジン](https://www.weblio.jp/content/%E3%83%AC%E3%83%B3%E3%83%80%E3%83%A9)

### シーン
3D空間のこと。オブジェクトの置き場になる。

### カメラ
どの位置から撮影するかを決めるシステムのこと。

### メッシュ
表示オブジェクトのこと。  
メッシュを作成するには、ジオメトリとマテリアルが必要。

#### ジオメトリ
形状のこと

#### マテリアル
色、質感などの情報のこと