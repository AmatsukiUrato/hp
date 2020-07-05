---
title: 'kasperskyが入っているMacでhomebrewなどのパッケージ管理ソフトを使いinstallするとエラーがでる問題を解決した'
description: 'homebrewでコマンドのインストールを行おうとしたところ、SSLに関するエラーが発生しました。その問題がKasperskyのWeb保護による問題であったため、Kasperskyを無効にすることで解決する方法を行った記事となります。'
date: 2020-07-05T22:57:30+09:00
tags: [kaspersky, security, homebrew]
archives: '2020'
author: matsu4ki
draft: false
toc: true
---

## はじめに

mac のパッケージマネージャーである homebrew にて、インストール時に

```sh
OpenSSL SSL_connect: SSL_ERROR_SYSCALL in connection to xxxxxxxx.com:443
```

といったエラーが発生したため、調査および解決策をまとめてみました。

エラー自体は発生したのですが、キャプないので、再度発生したときに取っておきます。

## TL;DR

- ウェブ保護を無効にする
- 各パッケージマネージャに CA 証明書を設定する

## 原因調査

発生しているエラーがどういったものかを調査したところ、

1. エラー内容の通り、SSL 周りでエラーが発生している
2. WSL（Windows Subsystem for Linux）でも同様の問題が起きている
3. kaspersky がいたずらしているみたい

ということが分かりました。
どうやら、ウェブ保護を行う際に Kaspersky さんが MITM（中間者攻撃）の動きをしているため発生している問題みたいです。

中間者攻撃は[JPRS 用語辞典｜中間者攻撃（man-in-the-middle attack）](https://jprs.jp/glossary/index.php?ID=0229)がわかりやすいです。

Kaspersky 的には、

「中身をチェックして確認してから渡したるわ」

ということだと思うのですが、これのせいでダウンロードできなければ意味がありません。

## 解決策 1

<div class="notification is-warning is-light">
セキュリティ的危険が伴う可能性があります。
</div>

ウェブ保護を無効化します。Windows ではポート単位で無効化できるみたいですが現在(2020-07-05)の Mac 版 Kaspersky には詳細設定がないみたいです。なので、ウェブ保護全体を無効化するしかなさそうです。

![カスペルスキーの環境設定画面](/post/kaspersky/img/kaspersky1.png)

## 解決策 2

参考にした Qiita のエラー文面とは違いましたが、おそらく同じ原因なので掲載します。
CA 証明書を設定して、「Kaspersky は間に入っても良いですよ」という設定にすることで回避ができるみたいです（未検証）。

やり方は[参考:6]を参照してください。

## さいごに

あちこちのパッケージマネージャに設定するのはちょっと面倒くさい。

他に良い方法を提示されている方、知識を持っている方は是非連絡ください。

また余談ですが、WSL では 2019 年あたりに解決されている問題らしい[参考:3]（できてないと言っている人もいる）ので、もしやすると Kaspersky 側で対応されているのかもしれないです。

## 参考

1. [Hi! Great tutorial! - Lucas Paiva - Medium](https://medium.com/@lucs/hi-great-tutorial-91e00f6ad7eb)
2. [apt-get update connection failed · Issue #761 · microsoft/WSL](https://github.com/Microsoft/WSL/issues/761)
3. [Kaspersky Lab Forum: Archive](https://forum.kaspersky.com/index.php?/topic/395813-bash-windows-10-wsl-connection-issues/page/2/)
4. [GitHub への git clone/pull/push 時に SSL 証明書まわりでエラーが出るときの本当に正しい対処法 - Qiita](https://qiita.com/karno/items/5ad5006a4912617d2610)
5. [カスペルスキー入れたらネットに繋がらなくなった?! | こすもっちは行く ♪](http://kosumotti.blogspot.com/2015/02/blog-post.html)
6. [npm で SELF_SIGNED_CERT_IN_CHAIN が出るときの対処法 - Qiita](https://qiita.com/ASLA/items/527f5c47ae60bc51cc9a)
