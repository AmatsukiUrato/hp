---
title: "カスペルスキーのプロセス「kav」がくっそ重くてターミナル起動が8秒ぐらいかかる問題"
date: 2016-08-19
tags: [Kaspersky, Terminal, Slow]
archives: "2016"
author: Amatsuki-old-hatenaBlog
draft: false
---
<div class="notification">
旧サイトの記事を移行してきたものとなります。
</div>

## TL;DR
サポセンに連絡しましたが、現在調査中で
2015年版を利用すればなんとかなるかもとのこと。
2019年現在は直っている可能性があります（未検証）。

## 概要
`Kaspersky for Mac`が入っているPCに`rbenv`を入れると、ターミナルの動作がめちゃくちゃ重たくなります。

起動に8sもかかると、使い物にならないので  
カスペルスキーのサポセンにぶん投げてました。

`rbenv`の測定を行ったのが、以下の画像です。
![rbenv-time](/resources/very-slow-kav-on-terminal/rbenv-time.png)

## 回答
2015年版を使えば直るかもしれないので、そっちを使ってくださいとのこと。  
自分はマルウェア対策ソフトを、`Avira`にいったん変更しました。
`kav`が暴走するのは結構あるみたいで、他にも2,3記事を見つけましたが解決してはいなかったため、カスペルスキー側のソフトの問題だと思われます。