---
title: 'gitのデフォルトブランチを試した'
description: 'git version 2.28.0にて、defaultBranchなるものがオプションとして実装されたみたいなので試してみました'
date: 2020-07-29T14:09:28+09:00
tags: [git]
archives: '2020'
author: matsu4ki
draft: false
toc: true
---

## はじめに

ここ最近、一部の技術用語が聞く人によっては不快な単語となっていることが問題となっています。
git もその用語 `master` が含まれている 1 つの技術としてあげられており、今回のアップデートで変更できるようになりました。

ちょっと気になったので、実際に変更してみました。

## 試してみる

最新の git を落としてくる必要があるので、公式の指示に従い、ppa リポジトリを追加してインストールする。

```sh
sudo add-apt-repository ppa:git-core/ppa
sudo apt update; sudo apt install git
```

アップデートできたら、実際に試す。

![fire-wall](/post/git/img/default-branch.png)

ちゃんと`git init`した際に`master`ではなく、`main`に変更されていることが確認できました。

## 参考

- 最新バージョンへの変更
  - [Git(Official)](https://git-scm.com/download/linux)
  - [PPA から Git をインストールする — しっぽのさきっちょ | text.Baldanders.info](https://text.baldanders.info/remark/2019/04/install-git-from-ppa/)
- 気になったきっかけ
  - [Git 2.28 brings default branch option - DEV](https://dev.to/jonoyeong/git-2-28-brings-default-branch-option-4lio)
- 2.28 のバージョンアップ情報
  - [Highlights from Git 2.28 - The GitHub Blog](https://github.blog/2020-07-27-highlights-from-git-2-28/)
  - [\[ANNOUNCE\] Git v2.28.0 - Junio C Hamano](https://lore.kernel.org/git/xmqq5za8hpir.fsf@gitster.c.googlers.com/)
- 不快な技術語問題
  - [Regarding Git and Branch Naming - Software Freedom Conservancy](https://sfconservancy.org/news/2020/jun/23/gitbranchname/)
