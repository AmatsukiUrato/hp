---
title: "Marpが前よりも使いやすくなっていたので、触ってみた"
date: 2019-10-31T22:41:35+09:00
tags: [Marp, Nodejs, Docker, Extention]
archives: "2019"
author: Amatsuki
draft: false
---
# はじめに
ずっと前から、スライドを何とかMarkdownでかけないかをずっと考えていまして、昔はMarpを使っていました。  
しかし、かゆいところに手が届かないのが欠点で、ここ最近は`revealjs`というライブラリのVSCode拡張機能版`cscode-reveal`を利用しておりました。  
こちらもめちゃくちゃ良くて、htmlでイカしたスライドを作りたいなら、めちゃくちゃありな選択肢だと思います。

ずっと`cscode-reveal`を利用していたのですが、こちらはpdf化を行うときがうまく行かず、`pptx`や`pdf`の資料として作成するには少し辛いものがありました。そこで再度検索したところ、Marpがバージョンアップしており使いやすくなっていたので、今回紹介します。

[公式Repository](https://github.com/marp-team/marp)

# Marpの良い点
個人的には

- [Marp-CLI](https://github.com/marp-team/marp-cli)の誕生
- [Marp for VS Code](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode)がある
- [Dockerコンテナ](https://hub.docker.com/r/marpteam/marp-cli)もあるよ
- [公式Document](https://marpit.marp.app/)が充実してきた

辺りがとても良いと思っており、助かってます。

# 実際に使ってみる
## Marp-CLI
公式の言うとおりに、`npm`コマンドを用いてインストールする。  
今回はグローバルにインストールしました。

```bash
npm i -g @marp-team/marp-cli
```

公式のRepositoryに習ってとりあえずpdfを生成してみます。  
MarkdownのSampleは最後に乗せています。

```bash
marp [変換するmarkdownファイル] --pdf
```

上記コマンドで、pdf化が行えます。  
結構いい感じでpdf化してくれてます。

[変換後のpdf](/resources/updated-marp/marp-sample.pdf)

他にも`--pptx`でパワポにもできたりするので、お試しあれ😏

## Marp-CLI(Docker)
こちらも、[公式](https://hub.docker.com/r/marpteam/marp-cli/)の言うとおりにコマンドを実行します。

```bash
docker run --rm -v $PWD:/home/marp/app/ -e LANG=$LANG marpteam/marp-cli [変換するmarkdownファイル]
```

dockerを利用しても、ちゃんとpdf化できていることが確認できます。

[変換後のpdf](/resources/updated-marp/marp-docker-sample.pdf)


### Dockerコンテナでコンバートする際のfont問題
日本語のフォントがコンテナ内部のものに依存しているからか、微妙なフォントになっています。 
dockerイメージに他のフォントがないからかも(alpine linuxだし)と思い、

[Alpine Linux fonts](https://stackoverflow.com/questions/56937689/alpine-linux-fonts)

を参考にGoogle Fontsをインストールしたイメージを作成しましたが、うまくいきませんでした。

### 解決策
いろいろ試しましたが、styleを利用してフォントを外部インポートする方法でうまくコンバートできました。  
以下の例ではgoogleFontをインポートしてます。Googleが提供しているフォントで良いのであれば、[こちら](https://fonts.google.com/)でポチポチすれば下記のインポート用のコードまで作成してくれます。

```md
---
marp: true
<!-- marpの設定 -->
---
<style>
@import url('https://fonts.googleapis.com/css?family=Noto+Serif+JP&display=swap');
section {
    font-family: 'Noto Serif JP', serif;
}
</style>

<!-- 以下より資料用のテキストを記載する -->
```

[上記styleを含めてコンバートした際のpdf](/resources/updated-marp/marp-docker-sample-custom-font.pdf)

上記では、`Noto Serif JP`をインポートしてますが、おすすめは

- Noto Sans JP
- M PLUS 1p

です。s

# さいごに
Marpみたいな、イイ感じじゃないものをいい感じにするツールはやっぱり最高だと思いました！  
製作者に感謝🙇‍♂️

# サンプル
{{< gist AmatsukiUrato f3f8ea85d6dbb8e20fd026cd858ca574 >}}