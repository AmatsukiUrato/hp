---
title: 'zsh上でhistoryコマンドを打つと直近15件しかでてこない'
description: 'zsh上で、`history`を打つと、直近15件しか出ないです。なので、bashと同じく`history`のみタイプした場合は全件表示できるようにしました。'
zdate: 2020-05-30T18:46:10+09:00
tags: [zsh, shell, command, history]
archives: '2020'
author: matsu4ki
draft: false
---

## 概要

bash を使ってたときは、`history`で全履歴が表示されたのに対して、
zsh では`history`を叩いても、直近 15 件しか表示されなくて困ってました。

## 原因

bash の`history`と zsh の`history`コマンドでは仕様が違う。
両方とも fc コマンドの alias として用意されているみたいですけど、alias のはられ方が違うのかも。詳細は調べていないので、知っている方いたら教えて下さい。

## デフォを全件表示にする

```zsh
alias history='history 1'
```

`history 1`で 1~現在までの履歴が表示されるので、`history`に alias を貼る。
まぁ何が困ってたかって、grep 検索できないことだったんで、zsh の検索用 plugin 使ったほうが良いのかもね。

## 参考

- [bash 内部コマンド history, fc - Qiita](https://qiita.com/ririn_yume/items/526df6fa50b8c32ff5f6)
- [zsh の fc ビルトインコマンド - Please Sleep](https://please-sleep.cou929.nu/zsh-builtin-command-fc.html)
