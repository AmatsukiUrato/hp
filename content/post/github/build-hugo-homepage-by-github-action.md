---
title: 'Github-Actionsでhugoのデプロイを自動化してみた'
date: 2020-02-10T12:46:44+09:00
tags: [hugo, github-actions, ci]
archives: '2020'
author: Amatsuki
draft: false
---

## はじめに

結構前から GitHub-Actions を使ってみたいなと思っていましたが、題材がなく困ってました。
そこで、「なにか定期的にデプロイしてるやつってあったっけ」と考えたところ

「そういや hugo のデプロイって自動化できるんじゃね？」という考えに行き着き、実際にやってみた感じです。

## TL;DR

- この記事は hugo 用リポジトリと homepage 用リポジトリで分割している場合の説明です
- GitHub-Actions を利用してデプロイすることは可能
  - hugo 用の action がすでに存在するので、そちらを利用すると良い
- GitHub-Actions 用の yml ファイルを下に記載しているので、参考になるかも
- 別リポジトリにデプロイする場合はアクセスキーの準備が必要
- CD 時に hugo のバージョン差異に注意しないと、デプロイ結果が微妙に異なる可能性あり（v0.60.0 で Markdown に[アップデート](https://gohugo.io/news/0.60.0-relnotes/)があった）

## 現在の環境整理

とりあえず、どう変わったのかをイメージでざっくりと載せてみました。

### 移行前

ターミナルで shellScript を走らせて、管理用リポジトリとブログ用リポジトリにあげてました。

![実施前のイメージ図](/resources/build-hugo-homepage-by-github-action/before-deploy.png)

### 移行後

管理用リポジトリに push するだけで、ブログがデプロイされるようになりました。

- shellscript 動かす環境じゃない（今は早々ないと思いますけど）
- とりあえずサクッと作成/編集したい
- GitHub 上でちょっと修正したい

といったときに git さえ入っていれば実行可能になりました！

![実施後のイメージ図](/resources/build-hugo-homepage-by-github-action/after-deploy.png)

## 実際の作業

### 作業の洗い出し

今までデプロイするために使っていた`deploy.sh`で行っていた作業を洗い出す（洗い出すっていう程量ないけど…）

1. git でコミット（homepage）
2. hugo でデプロイ
3. public 以下を push（AmatsukiUrato.github.io）

### yml ファイルへの落とし込む

`steps`以下の階層にいる`name`毎で job が切れています。

最後の job に`${{ secrets.ACTIONS_DEPLOY_KEY }}`とりますが、こちらは GitHub のリポジトリ上で秘密鍵を登録しておくと、key が呼び出せるといったものになります。
GitHub-Actions を走らせているリポジトリとは別のリポジトリにデプロイする際などに必要です。

```yml
name: github pages

on:
  push:
    branches:
      - master

jobs:
  build-deploy:
    runs-on: ubuntu-18.04
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Checkout theme repository
        uses: actions/checkout@v2
        with: #Themeを適応させる
          repository: Tazeg/hugo-blog-jeffprod
          path: themes/hugo-blog-jeffprod

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'

      - name: Build
        run: hugo --minify --cleanDestinationDir

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          deploy_key: ${{ secrets.ACTIONS_DEPLOY_KEY }} ## 秘密鍵はgithub側で登録しておく
          external_repository: AmatsukiUrato/AmatsukiUrato.github.io
          publish_dir: ./public
          publish_branch: master
```

## さいごに

GitHub-Actions は思ってたより使いやすかったです。でも、一番触ってみたかったビジュアルワークフローはどうやら yml ファイルが導入された際になくなってしまったようです 😭 公式からは、検討するけど今すぐ復活はしないよという方針らしいです。

public リポジトリは無料で利用できるし private も 2000 分/月は無料みたいなので、お金をあんまり気にせずチェックできる点はよかったです 😋
GitHub 専門でいうと、TravisCI がありますが、`GitHub-Actions`は private でも無料な点はでかいかもしれないです。後は無料で macOS デプロイできるところですかね？

CD は上手くいくと楽しいので、ぜひやりましょう 😎

## 参考

- [peaceiris/actions-hugo: GitHub Actions for Hugo ⚡️ Setup Hugo quickly and build your site fast. Hugo extended, Hugo Modules, Linux (Ubuntu), macOS, and Windows are supported.](https://github.com/peaceiris/actions-hugo)
- [peaceiris/actions-gh-pages: GitHub Actions for GitHub Pages 🚀 Deploy static files and publish your site easily. Static-Site-Generators-friendly.](https://github.com/peaceiris/actions-gh-pages)
- [新しくなった GitHub Actions で Hugo ブログのデプロイをしてみた - Qiita](https://qiita.com/kaakaa_hoe/items/8fc2cfc2e16093cc7264)
- [Hugo のビルドを Github Action で自動化する - 1 ミリもわからん](https://raahii.github.io/posts/automating-hugo-builds-with-github-actions/)
