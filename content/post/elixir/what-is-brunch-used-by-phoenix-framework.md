---
title: 'ElixirのPhoenixフレームワークで利用されているbrunchとは'
description: 'Phoenixの記事でよく書かれているno-brunchがなんのことかわからなかったので調べました。'
date: 2020-07-20T02:40:12+09:00
tags: [brunch, phoenix, elixir]
archives: '2020'
author: matsu4ki
draft: false
toc: true
---

## はじめに

Elixir の Framework である、Phoenix の記事を閲覧していたところ、さまざまな記事に`--no-brunch`と記載されていました。
しかし、2020-7-20 現在、Phoenix のチュートリアルには`brunch`の記載がありませんでした。
そこで、調べてみました。

## 調査結果

brunch は webpack と同じ、フロントエンドのビルドツールでした。
Phoenix の公式チュートリアルを確認したところ、v1.3.4 までは brunch を利用していたみたいですが、 v1.4.0-rc.0 から webpack に変更されたみたいです。

なので、最新バージョンの Phoenix を利用する場合、 brunch に関する記載は無視して良いです。

## 参考

- [Installation – Phoenix v1.4.0-rc.0](https://hexdocs.pm/phoenix/1.4.0-rc.0/installation.html)
- [Installation – Phoenix v1.3.4](https://hexdocs.pm/phoenix/1.3.4/installation.html#content)
- [Brunch - ultra-fast HTML5 build tool](https://brunch.io/)
