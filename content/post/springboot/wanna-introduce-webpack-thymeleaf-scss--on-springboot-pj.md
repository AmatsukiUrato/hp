---
title: 'SpringBoot上でwebpack環境+ThymeLeafをしたい'
description: 'SpringBoot上でwebpack(scss/eslint/prettier/html-webpack-plugin/babel)を動作させた後にThymeLeafで読み込めるようにできないかを考えた際の記事です。'
date: 2020-05-31T21:14:12+09:00
tags: [SpringBoot, Webpack, ThymeLeaf]
archives: '2020'
author: matsu4ki
draft: false
---

## はじめに

テンプレートエンジンと webpack を mix してうまく作れないか奮闘した記録です。
webpack(scss/eslint/prettier/html-webpack-plugin)などを動作させた後に ThymeLeaf で読み込めるようにできないかを考えました。

結論から言うと、一部うまくいきませんでした。

## やりたかったこと

1. webpack にて、src 以下のファイル群をコンパイルする。
2. コンパイルした後に ThymeLeaf を噛ませたいので、html ファイルに関しては templates に配置する
3. public には html 以外のファイルを出力する
4. templates/以下にある html ファイルには、自動で public 以下の js に対してのリンクが貼られるようにする。

```shell
/resources
├── public # webpackの出力先
│   ├── index.js
│   └── index.js.map
├── src # webpackの出力元
│   ├── html
│   │   ├── index.html
│   ├── js
│   │   └── index.js
│   └── scss
│       └── index.scss
└── templates # webpackの出力先
    └── index.html # <script src="/public/index.js"></script>が最後に挿入されている
```

## やったこと

### webpack.config.js

`webpack.config.js`を掲載しておきます。
今回の記事に関係ない設定は削除してます。

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const html = 'src/main/resources/src/html/';
const js = 'src/main/resources/src/js/';

module.exports = {
  entry: {
    index: path.join(__dirname, js, 'index.js'),
  },
  output: {
    path: path.join(__dirname, 'src/main/resources/public'),
    filename: '[name].js',
  },
  plugins: [
    // Webpack plugin を利用する
    new HtmlWebpackPlugin({
      filename: '../templates/index.html',
      chunks: ['index'],
      template: path.join(html, 'index.html'),
    }),
  ],
};
```

### 困ったこと

上記の webpack.config.js でファイル構造的には、想定通りのものになります。
しかし、html-webpack-plugin にて、filename に相対パスを用いて無理やりずらしているため、html 内に挿入される js の path が

「index.js」ではなく、「../public/index.js」

となります。なので、リソースに対して正しく参照できなくなります。
ちなみに、SpringBootからリソースファイルとしてあつかわれるフォルダは、以下となります。

```shell
resources
├─ static
├─ public
├─ resources
└─ META-INF
    └─ resources
```

#### じゃあ、templates に全部突っ込めばいいんじゃないの？

templates 以下に入る予定の html ファイルには、ThymeLeaf の記述も行える想定でいます。
そのため、templates 以下をフリーにしてしまうと、サーバ内の処理が漏れてしまう可能性があり、危険だと思ったためこの案もボツにしました。

## 結論

静的リソースに関しては、html 以外を webpack でパックして公開し、html からの参照用 script タグは手動で入力する形が良いのではないかと思いました。

## さいごに

フロント部分は拡張要素が多すぎて、色々と導入していると一生環境構築しているのではないのかという感覚に襲われます。create-react-app 的なボイラーテンプレートがもっと色々出れば良いと思うのですが、そもそも今の時代サーバサイドレンダリング（SSR）じゃなくて SPA+REST API/Graph QL とかにするべきですよね…

手軽に作る分には SSR でも十分といったケースもあると思います。しかし、そういった場合は最低限の環境構築だけ済まして、パパっと作っちゃうほうが良さそうです。

## 参考

- [Spring boot における静的ファイルのアクセス優先順位 - Qiita](https://qiita.com/TKR/items/4ec3733d44c9d2b618ee)
- [Spring MVC(+Spring Boot)上での静的リソースへのアクセスを理解する - Qiita](https://qiita.com/kazuki43zoo/items/e12a72d4ac4de418ee37)
- [Need to use different output path · Issue #148 · jantimon/html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin/issues/148)
