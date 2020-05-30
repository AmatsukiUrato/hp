---
title: 'Zsh History Cmd Cant Show All History When Using History'
description: ''
date: 2020-05-30T18:46:10+09:00
tags: []
archives: '2020'
author: matsu4ki
draft: false
---

## 概要

bashを使ってたときは、`history`で全履歴が表示されたのに対して、
zshでは`history`を叩いても、直近15件しか表示されなくて困ってました。

## 原因

bashの`history`とzshの`history`コマンドでは仕様が違う。
両方ともfcコマンドのaliasとして用意されているみたいですけど、aliasのはられ方が違うのかも。詳細は調べていないので、知っている方いたら教えて下さい。

## デフォを全件表示にする

```zsh
alias history='history 1'
```

`history 1`で1~現在までの履歴が表示されるので、`history`にaliasを貼る。
まぁ何が困ってたかって、grep検索できないことだったんで、zshの検索用plugin使ったほうが良いのかもね。

## 参考
- [bash内部コマンド history, fc - Qiita](https://qiita.com/ririn_yume/items/526df6fa50b8c32ff5f6)
- [zsh の fc ビルトインコマンド - Please Sleep](https://please-sleep.cou929.nu/zsh-builtin-command-fc.html)
