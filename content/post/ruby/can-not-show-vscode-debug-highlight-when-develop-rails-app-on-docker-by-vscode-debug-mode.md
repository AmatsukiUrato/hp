---
title: 'Docker上のRailsアプリをVSCodeのデバッグを用いると、VSCodeのデバッグ行がハイライトされない'
description: 'Docker上に構築した(docker-compose利用) Rails 6のアプリをvscodeのリモートデバッグを用いてデバッグをしようとしました。結果として、BreakPointには停止してくれますが、停止行がハイライトされないといった問題が発生したため、原因及び解決策をメモしておきます。'
date: 2020-11-25T02:20:03+09:00
tags: [Ruby, RubyOnRails, VSCode, Docker]
archives: '2020'
author: matsu4ki
draft: false
toc: true
---

![問題の画像](/post/ruby/img/vscode-debug-ruby-on-docker-1.png)

## はじめに

今回は勉強のために、Docker 上に構築した（docker-compose 利用）Rails 6 のアプリケーションを vscode のリモートデバッグを用いてデバッグをしようとしました。
一見 BreakPoint にも停止してくれてうまく行ったと思ったのですが、

- 停止行がハイライトされない
- VARIAVLES で値が参照できていない

といった、上記画像のような問題が発生しました。私の調べ方が悪いのか、調べてもなかなか出てこなかったため備忘録としてメモしておきます。

## TL;DR

原因は、remoteWorkspaceRoot のパスがずれていることです。

1. `.vscode/lanch.json` の `remoteWorkspaceRoot`を確認する。
1. コンテナ内のアプリケーション位置とパスを修正する（恐らくパスがずれているはず）。

## 詳しく

VS Code を用いてリモートデバッグを行う場合、`プロジェクトフォルダ/.vscode/lanch.json`内に、リモートデバッグ用のコンフィグを記載していると思います。
そのコンフィグに記載している remoteWorkspaceRoot（リモート先のプロジェクトフォルダがある場所）が、実際の web サーバのコンテナ内で展開されているアプリケーションの場所とで、差異があるため起きる現象です。

検索上位に出てくるサイトを参考にして構築した場合、恐らくルート直下に保存しているはずなので、remoteWorkspaceRoot に `"/myapp"` と記載します。
（myapp はコンテナ内で展開しているアプリケーションのフォルダ名）。

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "rdebug-ide",
      "type": "Ruby",
      "request": "attach",
      "cwd": "${workspaceRoot}",
      "remoteHost": "0.0.0.0",
      "remotePort": "1234",
      "remoteWorkspaceRoot": "/myapp", // ←ここ
      "useBundler": true
    }
  ]
}
```

上記を実行後にデバッグを確認すれば、正しく表示されるはずです。

![確認画面](/post/ruby/img/vscode-debug-ruby-on-docker-1.png)

## 現状のコンテナがどうなっているのかがわからない場合

1. `docker-compose ps`にて、コンテナが起動しているかを確認します。起動していない場合は `docker-compose up -d` で起動してから `docker-compose ps` で確認します。
1. `docker-compose config --service`で、Web サーバのコンテナ名を確認し、`docker-compose exec web bash`（web は自身が設定した web サーバコンテナ名）を行います。
1. web サーバのコンテナ内に入れるので、自身のアプリケーションがどこにあるのかの確認をします（恐らくルート直下にあるので、`ls`コマンドを打てば見つかるはず）。

上記で確認を終えたら、remoteWorkspaceRoot の設定を行ってください。

## さいごに

気づけば単純な問題でしたが、最初は原因に見当がつかず、結構悩んじゃいました。
気がつけたのは、web サーバの部分をローカルで動かしてみたからです。
ローカルでは正しく動いたので、恐らく VS Code - Container 間での問題と仮定してからはすぐでした。

原因調査は、ちゃんと切り分けてやっていったほうがやっぱ早く解決できますね。
にしても、どうして開発は環境構築で必ず詰まってしまうのだろうか……

## 参考

- VS Code の変数確認
  - [VS Code の設定をキレイに変数置換 - Qiita](https://qiita.com/ShortArrow/items/dc0c8cacd696154510f1)
- DebugHighlight が背景色とかぶっていないかを確認する
  - [Visual Studio Code の配色を好き勝手にカスタマイズした（settings.json） - Qiita](https://qiita.com/deren2525/items/6bc099ae8c05e3076055)
  - DebugHighlight の指定: `"workbench.colorCustomizations":{"editor.stackFrameHighlightBackground":"#ffa5"}`
- Debug 方法調査
  - [Visual Studio Code を使って Rails をデバッグ実行してみよう - Qiita](https://qiita.com/chimame/items/56e48ab3145312ff1786)
  - [docker 環境の rails5 を step 実行で debug する - Qiita](https://qiita.com/pocari/items/9f83573272f2a2754a76)
  - [Rails の開発環境を docker（docker-compose） で構築したい - Qiita](https://qiita.com/u9r52sld/items/ac75fdc50f3ea5bb9b6e)
- サービス名確認
  - [docker-compose サービス名の一覧を取得する - Qiita](https://qiita.com/ucan-lab/items/e64cebd3f7d062124f6b)
- docker-compose を利用した、コンテナ内への侵入方法
  - [【Docker-Compose】コンテナ起動から入るまでを丁寧に - Qiita](https://qiita.com/tsuboyataiki/items/90dbe94553d3dea39b19)
