---
title: "docsify用のサーバ実行をexeファイルとドキュメントファイル群だけで起動できるようにする"
date: 2020-04-23T03:41:43+09:00
tags: [docsify, markdown, document, pkg, npm, node]
archives: "2020"
author: matsu4ki
draft: false
---

## はじめに

調査資料などを見やすい形で保存できるように _docsify_ という、_node.js_ で作られたドキュメント管理ツールを利用しています。_node.js_ で作られているので、ローカルで閲覧する際にはもちろん npm コマンドが必要です（厳密には違いますが、CORS の関係上サーバ起動したほうが手っ取り早いため）。これでは、_node.js_ をインストールしていない人や技術的知識のない人がdocsifyの画面を通して確認できません。

そこで、ドキュメントファイル（markdown, index.html など）とサーバ起動用の exe だけを用意して、exe 起動するだけで自動的にドキュメントがブラウザ上に展開する仕組みを作りました。

## TL;DR

- _node.js_ ファイルの実行ファイル化を行うパッケージを使う
  - _nexe_ と _pkg_ あるが、_pkg_ の方が安定していた
- _docsify_ のフォルダをローカルホストで展開する
  - _serve-static_ を使う（実際のコードはXXXX参照）


## サーバ起動用のjsファイルを用意する

まず、実行ファイル化するためのJSファイルを用意する必要があります。

そこで、公式にdocsifyのサーバを建てるための記述を探したのですが、_docsify-cli_ サーバ起動に使ってね！としか書かれていなかったので、 _docsify-cli_ の `serve.js` を読みました。`serve.js`内にサーバを建てる処理が`module.export`されていたので、関数をimportしたのですが、exe化する際にうまく実行できませんでした。これはどうやら、livereloadライブラリとの関係でうまく動いていないっぽいです。詳細は追っていないので把握している方は教えていただきたいです 🙇‍♂️

そもそもとしてdocsifyの仕組み上から、ローカルのファイルを閲覧できればそれで良いので、`serve-static`のサーバ起動のみをexe化することで今回は対応しました💡

以下のように実装しました。

```js
const http = require('http');
const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');
const open = require("open");

 // docsifyのドキュメントファイルパス
const serve = serveStatic("./<your-docsify-docs>");
const port = 3000;
const server = http.createServer(function(req, res) {
const done = finalhandler(req, res);
  serve(req, res, done);
});

console.log("Webブラウザが開かれ、ドキュメントが展開されます。");
console.log("終了するときは");
console.log("方法1. このウィンドウを選択した後に`Ctrl+C`を押してください。");
console.log("方法2. 右上のXボタンを押して下さい。");

server.listen(port);
// 自動でブラウザに展開する
open(`http://localhost:${port}`);
```

## jsのコードをexe化する

_node.js_ の実行ファイル化を行えるライブラリを探したところ、 _nexe_ と _pkg_ が見つかりました。
2つとも試したのですが、 _pkg_ の方が正常に起動したため今回は _pkg_ を採用しました。

**以下に記載している方法はwindowsでのみ動作確認ができております。macで試したところルートが取得できないというエラーが表示されてうまく動きませんでした。** Pathの指定方法がちがうのかなぁ？

まず _pkg_ を下記コマンドでdocsifyプロジェクトの *node_modules* にインストールします。`--dev`はいつの間にか非推奨になったみたいです。

```sh
npm i --only-dev pkg
```

_pkg_ がインストールできたら、次にソースコードの実行ファイル化を行います。実行ファイル化を行う前にjsファイルが正常に動作するかを確認してから実施しましょう。

_pkg_ を利用して実行ファイルを作成するには、以下のコマンドを実行します。
ターゲットオプションを付けると、win, mac, linux の指定ができます。
指定方法は[こちらのprefix](https://github.com/zeit/pkg#targets)を確認してください。

```sh
npx pkg <your-js-file> --target `<your-platform>`
```

コマンド実行が完了すると実行ファイルが作成されています。起動すると、ローカルサーバが立ち上がった後に規定のブラウザにてドキュメントが展開されるはずです。

## さいごに

ドキュメントは人が読みやすくなるように残したいですが、buildツールを使うと非エンジニアには閲覧が厳しくなりがちです。ドキュメントを展開するときはなるべく誰でもアクセスできる状態にしておきたいですね。

今回の場合はサーバを立てて公開して良いドキュメントでもなかったので、exe化で対応しました。`index.html` 単体にすべてOutputするドキュメント生成ツールとかないのかなぁ。

## 参考

- [zeit/pkg: Package your Node.js project into an executable](https://github.com/zeit/pkg)
- [docsifyjs/docsify: 🃏 A magical documentation site generator.](https://github.com/docsifyjs/docsify)