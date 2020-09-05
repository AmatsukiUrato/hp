---
title: 'Stylusを使ってChatWorkのデザインを変更した'
description: ''
date: 2020-09-05T22:45:42+09:00
tags: [ChatWork, css, design, stylus]
archives: '2020'
author: matsu4ki
draft: false
toc: true
---

## はじめに

会社のチャットツールで ChatWork を利用していますが、使いづらい点が数点あるので、
ブラウザの拡張機能である [Stylus](https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne) を使って見た目をいじる記事です。

## Stylus と Stylish

同じ用途の拡張機能として、[Stylish](https://chrome.google.com/webstore/detail/stylish/fjnbnpbmkenffdnngjfgmeleoegfcffe//Aqui)がありますが、こちらは 2018 年頃に一度ユーザーのデータ収集を秘密裏に行っていました。
現在は Chrome ストアに再登場していますが、過去の事例を考えるとあまり使用したくはないです。

- [Firefox の人気アドオン「Stylish」はユーザーのインターネット履歴をこっそり収集していた - GIGAZINE](https://gigazine.net/news/20180705-stylish-steals-your-internet-history/)
- [Firefox と Chrome の Stylish がストアから公開停止になった件。対処など。 – らくログ](https://www.rakda3.net/stylish_banned/#%E5%AF%BE%E5%87%A62%EF%BC%9AStylus%E3%81%B8%E3%81%AE%E4%B9%97%E3%82%8A%E6%8F%9B%E3%81%88)

Stylus の方は[GitHub](https://github.com/openstyles/stylus/)にてソースコードが GPL-3.0 ライセンスで公開されているため、こちらを利用しております。

## Stylus でデザインをいじる

今回いじるのは、

1. ユーザー/グループ表示を小さくする
2. 概要欄を大きくする
3. ユーザー/グループをホバーしているときの色をわかりやすくする

の 3 つです。
以下の gist 内のコメントにそれぞれ何をイジっているのかを記載しています。

{{< gist matsu4ki 9e9d2b87689fdc4aafd775d880aac25f >}}

## さいごに

css が使えるなら、手軽にデザインを編集できるのは便利です。
今回は ChatWork のデザイン変更に使いましたが、Web アプリケーションに対してなら何にも利用できます。

この拡張機能を使って、痒いところに手が届かない状態を脱しましょう。

## 参考

- [Stylus](https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne)
