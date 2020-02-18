---
title: "Light Sailからの移行"
date: 2019-04-16T04:52:33+09:00
draft: false
archives: "2019"
author: Amatsuki
tags: ["AWS", "Hugo"]
---
## 移行しました
AWSのLight Sail + WordPressでやってましたが、 
WordPressがだるすぎたので AWSの~~[AWS Amplify + Hugo]に移行しました。~~  
現在は[github pages + Hugo]  

github pages とかをそのまま使うのも良かったけど、 
AWSのサービスを触ってみたかったのでこっちで立ててみました。 

Hugoに移って最初に記事書いていて思うけど、 
やっぱ**Markdown**が最強なんだわ。  
スラスラ書ける😎

一応WordPressでもMarkdownで書けるプラグイン📕は少し出てたけど、  
めっちゃこれいいやん、みたいなプラグインは見当たりませんでした😥


## Hugoで辛かったこと
- `AWS Amplify`を利用する場合は、gitのsubmoduleを使ってはいけない
- `draft`は下書き機能で、`false`にしないと記事が表示されないこと。<br>(これを忘れててずっと表示されないぞおおおお！ってなってました。あほや)
- テーマが崩れるときがある


## 追記
結局上記のいろいろな問題で萎えて、止まってました。  
現在はgithub-pagesに移して動かしてます。草も生えるし無料だし特に重要じゃないhomepageだったらこっちでいいね。  
`AWS Amplify`触ってたのは勉強もかねてだったので、それはそれでよかったです。  
`AWS AMplify`はまた別の機会に使いたいです🥴