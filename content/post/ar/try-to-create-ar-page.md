---
title: 'ブラウザでARを使ってみた'
date: 2019-11-04T13:47:45+09:00
tags: [AR, AR.js, A-Frame, JavaScript]
archives: '2019'
author: Amatsuki
draft: false
---

## はじめに

ふと、名刺に AR マーカーが記載されていて、  
川島教授の顔みたいな（脳トレ）のが出てきたら、とてもおもしろいなと思いついて触ってみました。

> ![顔](https://www.nintendo.co.jp/ds/anmj/top/needfla.gif)  
> [もっと脳を鍛える大人の DS トレーニング ™](https://www.nintendo.co.jp/ds/anmj/index.html)

（余談ですが、脳トレの[Switch 版](https://topics.nintendo.co.jp/c/article/aa9b7d00-e021-11e9-b641-063b7ac45a6d.html)がでるみたいです）

## AR の実現方法

軽く検索したところ、Unity で実現する方法と Web 技術で実現する方法が見つかりました。
ネイティブで実現する方法もあると思いますが、今回はこの 2 つを見ていきます。

### Unity

どうやら、`Vuforia`という外部ツールと連携して使うのが主流みたいです。
iOS だと`ARkit`、Android だと`ARCore`という SDK を使って作成できるみたいですが、`Vuforia`はこれらをラップしてくれているみたい。

> ![Vuforia図](https://onetech.jp/blog/wp-content/uploads/2019/10/Vuforia-ar-develop-Engine-1024x586.png) >[VUFORIA とは何か？AR アプリ開発に便利なライブラリの特徴 > Vuforia とは](https://onetech.jp/blog/vuforia-ar-application-development-library-features-6002)

#### 参考

- [VUFORIA とは何か？AR アプリ開発に便利なライブラリの特徴](https://onetech.jp/blog/vuforia-ar-application-development-library-features-6002)
- [ARCore](https://unity3d.com/jp/partners/google/arcore)
- [【Unity】Unity インストールから AR アプリ作成まで(iOS, Android)【Vuforia】](https://qiita.com/rio_matsui/items/32cd036684d7c32f57f9)
- [【３０分でできる】Unity で簡単に AR アプリを作る](http://makers.hatenablog.com/entry/2013/12/27/191636)

### Web

こちらは、`AR.js`と`A-Frame.js`を活用したものが主流みたいです。
`A-Frame.js`でオブジェクトをレンダリングして、それを`AR.js`で AR 化しているっぽいです。  
また、今回は使用していませんが`Three.js`（Web ブラウザ上で 3D レンダリングできるようにするライブラリ）を組み合わせ

#### 参考

- [A-Frame と AR.js で超簡単 AR（PC・スマホ・マルチマーカー対応）](https://qiita.com/mkoku/items/c635566e829c303a7d3f)
- [【AR.js 入門】簡単に WebAR で遊んでみた【A-Frame 使うよ】](https://qiita.com/sakaryu/items/769a2a538baf7e4ee1c7)
- [🐶AR.js を使って WebAR 年賀状を作る 🐶](https://iti.hatenablog.jp/entry/2017/12/04/090023)

## どっちにするか

Unity にするなら、アセットなどのデータを使えると思うので資産的にはすごく大きいと思いますが、Unity ということは、アプリにする必要があると考えとります(Unity の WebGL ビルドがどうとかは未調査です)。

今回は簡単に実行できてほかったのと、自分が Web 技術を中心に触っていることから、Web 技術で作る方針にしました。

## 実際に動かしてみる

とりあえず、「[A-Frame と AR.js で超簡単 AR（PC・スマホ・マルチマーカー対応）](https://qiita.com/mkoku/items/c635566e829c303a7d3f)」を参考に作ります。
上記リンクを参考に作ったソースはこちらです(ほぼコピペ 🤔)。

> ```html
> <!DOCTYPE html>
> <html>
>   <script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
>   <script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.5.0/aframe/build/aframe-ar.js"></script>
>   <!-- スクリプト読み込み -->
>
>   <body style="margin:0px; overflow:hidden;">
>     <a-scene
>       embedded
>       arjs="debugUIEnabled:false;trackingMethod:best;"
>       vr-mode-ui="enabled: false"
>     >
>       <a-marker preset="hiro">
>         <a-text
>           value="Name: Urato Amatsuki\nTwitter: @AmatsukiUrato\nGithub: AmatsukiUrato"
>           position="0 0.5 0"
>           align="center"
>         ></a-text>
>       </a-marker>
>       <a-entity camera></a-entity>
>     </a-scene>
>   </body>
> </html>
> ```
>
> a-text の部分以外は、参考先の html を使用しております。

### スマホから繋げない問題

~~ 上記を参考に、`index.html`を作成します。とりあえずのテストなので、`nginx`の Docker コンテナを使って立てました。~~

~~下記 Docker コマンドを叩くカレントディレクトリに`index.html`をおいておけば`localhost:8080`または、同一ネットワークから`[dockerを起動しているPCのip]:8080`で接続が可能になります。~~

~~`docker run --name nignx -v $PWD:/usr/share/nginx/html -d -p 8080:80 -h 0.0.0.0 nginx`~~

~~自分のスマホでアクセスしてみます。  
...  
表示されない…だと!?  
やっぱり https 通信じゃないのが原因なんですかね？~~  
{{< figure src="/resources/try-to-create-ar-page/not-supported.png" width="400px">}}

https 通信が行えていないことが原因でうまく行ってませんでした。  
同一ネットワーク内からなら行けるんじゃねという謎の考えのせい 😭

### スマホ側から動作させる

[🐶AR.js を使って WebAR 年賀状を作る 🐶](https://iti.hatenablog.jp/entry/2017/12/04/090023)  
を参考にして、ruby のワンライナーで https サーバを立てたところ、うまくいきました(圧倒的感謝…!!)。

下記ワンライナーはカレントディレクトリのデータを外部に公開してくれるものみたいです。

```ruby
ruby -rwebrick -rwebrick/https -e 'WEBrick::HTTPServer.new(:DocumentRoot => "./", :Port => 8000, :SSLEnable => true, :SSLCertName => [["CN", WEBrick::Utils::getservername]] ).start'
```

実際に接続してみた画像がこちらです。
今回はとりあえず、自分の Info をテキストで表示するところまで行いました。

{{< figure src="/resources/try-to-create-ar-page/can-display-ar-sp.png" alt="can-display-ar-sp" width="400px">}}

### PC のカメラで動作させる

MacBookPro のカメラで無理やり確認したやつも載せておきます。

![can-display-ar-pc](/resources/try-to-create-ar-page/can-display-ar-pc.png)

## さいごに

とりあえず、AR マーカーを使って文字を表示できるところまでは実装できました(ほぼほぼ自分が書いたところがない 🙈)。  
結局、解説ページの後をなぞって終わりになってしまったので、次やるときは、もう少し違うものを表示させてみたいです。`Three.js`を触って見るものも面白いかもしれないです。
