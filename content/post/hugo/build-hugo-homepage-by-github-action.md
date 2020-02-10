---
title: "Github-Actionsでhugoのデプロイを自動化してみた"
date: 2020-02-10T12:46:44+09:00
tags: [hugo, github-action, ci]
archives: "2020"
author: Amatsuki
draft: true
---
# はじめに
結構前から`GitHub-Actions`を使ってみたいなと思っていましたが、題材がなく困ってました。
そこで、「なにか定期的にデプロイしてるやつってあったっけ」と考えたところ
「`hugo`のデプロイって自動化出来るんじゃね？」という考えに行き着き、実際にやってみた感じです。

# TL;DR
- この記事はhugo用リポジトリとhomepage用リポジトリで分割している場合の説明です
- `GitHub-Actions`を利用してデプロイすることは可能
    - hugo用のactionが既に存在するので、そちらを利用する
- `GitHub-Actions`用のymlファイルを下に記載しているので、参考になるかも
- 別リポジトリにデプロイする場合はアクセスキーの準備が必要
- CI時に`hugo`のバージョン差異に注意しないと、デプロイ結果が微妙に異なる可能性あり(v0.60.0でMarkdownに[アップデート](https://gohugo.io/news/0.60.0-relnotes/)があった)


# 現在の環境整理
旧→新でどうしたいかのイメージ図を書く

# 実際の作業

## ymlファイル
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
        with:
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
          deploy_key: ${{ secrets.ACTIONS_DEPLOY_KEY }}
          external_repository: AmatsukiUrato/AmatsukiUrato.github.io
          publish_dir: ./public
          publish_branch: master
```

# さいごに
`Github-Actions`は思ってたより使いやすかったです。
publicリポジトリは無料で利用できるので、回数やお金を気にせずチェックできる点もよかったです😋
CI系は上手くいくと楽しいので、ぜひやりましょう😎

# 参考
- [peaceiris/actions-hugo: GitHub Actions for Hugo ⚡️ Setup Hugo quickly and build your site fast. Hugo extended, Hugo Modules, Linux (Ubuntu), macOS, and Windows are supported.](https://github.com/peaceiris/actions-hugo)
- [peaceiris/actions-gh-pages: GitHub Actions for GitHub Pages 🚀 Deploy static files and publish your site easily. Static-Site-Generators-friendly.](https://github.com/peaceiris/actions-gh-pages)
- [新しくなったGitHub ActionsでHugoブログのデプロイをしてみた - Qiita](https://qiita.com/kaakaa_hoe/items/8fc2cfc2e16093cc7264)
- [HugoのビルドをGithub Actionで自動化する - 1ミリもわからん](https://raahii.github.io/posts/automating-hugo-builds-with-github-actions/)