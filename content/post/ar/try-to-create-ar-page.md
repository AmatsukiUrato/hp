---
title: "ブラウザを使ってARを使ってみた"
date: 2019-11-04T13:47:45+09:00
tags: [AR, AR.js, A-Frame, JavaScript]
archives: "2019"
author: Amatsuki
draft: false
---
# はじめに
ふと名刺にARマーカーが記載されていて、  
川島教授の顔みたいな(脳トレ)のが出てきたら、とても面白いなと思いついて触ってみました。

>![顔](https://www.nintendo.co.jp/ds/anmj/top/needfla.gif)
https://www.nintendo.co.jp/ds/anmj/index.html

(余談ですが、脳トレの[Switch版](https://topics.nintendo.co.jp/c/article/aa9b7d00-e021-11e9-b641-063b7ac45a6d.html)がでるみたいです)

# ARの実現方法
検索したところ、Unityで実現する方法とWeb技術で実現する方法がありました。

## Unity
どうやら、`Vuforia`という外部ツールと連携して使うのが主流みたいです。
iOSだと`ARkit`、Androidだと`ARCore`というSDKを使って作成できるみたいですが、`Vuforia`はこれらをラップしてくれているみたい。

>![Vuforia図](https://onetech.jp/blog/wp-content/uploads/2019/10/Vuforia-ar-develop-Engine-1024x586.png)
>https://onetech.jp/blog/vuforia-ar-application-development-library-features-6002

### 参考
- [VUFORIAとは何か？ARアプリ開発に便利なライブラリの特徴](https://onetech.jp/blog/vuforia-ar-application-development-library-features-6002)
- [ARCore](https://unity3d.com/jp/partners/google/arcore)
- [【Unity】UnityインストールからARアプリ作成まで(iOS, Android)【Vuforia】](https://qiita.com/rio_matsui/items/32cd036684d7c32f57f9)
- [【３０分でできる】Unityで簡単にARアプリを作る](http://makers.hatenablog.com/entry/2013/12/27/191636)

## Web
こちらは、`AR.js`と`A-Frame.js`を活用したものが主流みたいです。
`A-Frame.js`でオブジェクトをレンダリングして、それを`AR.js`でAR化しているっぽいです。  
また、今回は使用していませんが`Three.js`(Webブラウザ上で3Dレンダリングできるようにするライブラリ)を組み合わせ

### 参考
- [A-FrameとAR.jsで超簡単AR（PC・スマホ・マルチマーカー対応）](https://qiita.com/mkoku/items/c635566e829c303a7d3f)
- [【AR.js入門】簡単にWebARで遊んでみた【A-Frame使うよ】](https://qiita.com/sakaryu/items/769a2a538baf7e4ee1c7)

# どっちにするか
Unityにするなら、アセットなどのデータを使えると思うので資産的にはすごく大きいと思いますが、Unityということは、アプリにする必要があると考えとります(UnityのWebGLビルドは未調査)。

今回は簡単に実行できてほかったのと、自分がWeb技術を中心に触っていることから、Web技術で作る方針にしました。

# 実際に動かしてみる
とりあえず、「[A-FrameとAR.jsで超簡単AR（PC・スマホ・マルチマーカー対応）](https://qiita.com/mkoku/items/c635566e829c303a7d3f)」を参考に作ります。

上記を参考に、`index.html`を作成します。とりあえずのテストなので、`nginx`のDockerコンテナを使って立てました。

下記Dockerコマンドを叩くカレントディレクトリに`index.html`をおいておけば`localhost:8080`または、同一ネットワークから`[dockerを起動しているPCのip]:8080`で接続が可能になります。

```bash
docker run --name nignx -v $PWD:/usr/share/nginx/html -d -p 8080:80 -h 0.0.0.0 nginx
```

自分のスマホでアクセスしてみます。  
...  
表示されない…だと!?  
どうやら、自分の端末はARCore対応外の端末だったみたいです…  
対応表は [ARCore supported devices](https://developers.google.com/ar/discover/supported-devices) に記載されています。

![not-supported](/resources/try-to-create-ar-page/not-supported.png)

仕方がないので、MacBookProのカメラで無理やり確認しました。今回はとりあえず、自分のInfoをテキストで表示するところまで行いました。

>```html
<!doctype HTML>
<html>
<script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
<script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.5.0/aframe/build/aframe-ar.js"></script>
<!-- スクリプト読み込み -->

<body style='margin:0px; overflow:hidden;'>
<a-scene embedded arjs="debugUIEnabled:false;trackingMethod:best;" vr-mode-ui="enabled: false">
    <a-marker preset="hiro">
        <a-text value="Name: Urato Amatsuki\nTwitter: @AmatsukiUrato\nGithub: AmatsukiUrato" position="0 0.5 0" align="center"></a-text>
    </a-marker>
    <a-entity camera></a-entity>
</a-scene>
</body>
</html>
```
>a-textの部分以外は、参考先のhtmlを使用しております。

![not-supported](/resources/try-to-create-ar-page/can-display-ar.png)

# さいごに
とりあえず、ARマーカーを使って文字を表示できるところまでは実装できました。  
次やるときは、`Three.js`とかも勉強して、もう少し画像とかを表示させてみたいです。