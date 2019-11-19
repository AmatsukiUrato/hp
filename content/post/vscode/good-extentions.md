---
title: "使ってよかったVSCode拡張機能13選+3選の紹介"
date: 2019-11-14T00:42:17+09:00
tags: [VSCode, Extension, Utility]
archives: "2019"
author: Amatsuki
draft: false
---
# 一軍
この枠で紹介している拡張機能は、高い汎用性を持っており私自身も良く使っている拡張機能たちです。

## Settings Sync♻️
VS Codeの拡張機能を移行する場合や、バックアップするときに大活躍！  
とりあえず入れとけスタイルでオッケーな拡張機能。  
かったるい移行作業をめちゃくちゃ楽にしてくれる。端末が壊れても安心だし、真っ先に入れても良い拡張機能かも。自分で管理しても良いけどね。

[Download Page](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)

## テキスト校正くん👨‍🎓
VS Code上にあるテキストを自動で添削してくれるスグレモノ。
どこかに議事録やまとめた文章を提出する前に少し確認するだけで、最低限の日本語は担保されるところが良い😚

[Download Page](https://marketplace.visualstudio.com/items?itemName=ICS.japanese-proofreading)

## Code Spell Checker👨‍🏫
テキスト修正の英語版。間違ったスペルを教えてくれる。これでtypoが結構減ると思います。英語が苦手なあなたでも安心（俺やんけ）。  
固有名詞もユーザ辞書登録すれば、エラー回避できるので便利。

[Download Page](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

## Trailing Spaces✨
こいつをいれてから、文章の後ろにムダなスペースを入れることはなくなった。
赤色で視覚的も見やすくGood（色は変更可能）。ただし、Markdown書くときの改行はちょっと気になる。

[Download Page](https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces)

## indent-rainbow🌈
その名の通り、インデントに色を付けてくれる拡張機能。  
パット見でどこのラインを編集しているのかがわかるので、非常に便利。ネストが深くなっても安心😇（だからといって深くするのはやめてくれ…）

[Download Page](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)

## Bracket Pair Colorizer🌈
ペアの括弧同士が同じ色になるので、どこで始まってどこで終わるのかがわかりやすい。  
`python`などのインデントがプログラムの仕組みに組み込まれているものなら`indent-rainbow`だけで問題ないのですが、変なインデントが大量にある闇プロジェクトではこちらが大活躍します。普通に使ってても十分に便利なんですけどね。  
後は完全な独断と偏見なのですが、関数型言語にはあった法が良いと思われます（括弧がいっぱいあるから）。

[Download Page](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)

## Visual Studio IntelliCode💡
勝手に候補の中から、一番いい感じのやつを選択してくれるやつ。  
あんまり意識したことはないけど、便利に使えているということは役に立っていると思われ

[Download Page](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)

## vscode-icons🏷
多分定番の拡張機能。さまざまなiconが視覚的にわかりやすく表示されるようになる。  
個人的には、フォルダーの識別とかが好き。

[Download Page](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)

## Markdown Preview Enhanced🔍
Markdown Previewの拡張版。PlantUmlが使えたり、`pdf`化や`html`化が行えるようになっていたりと、
大幅に拡張されている。とりあえず入れておきたい拡張機能の1つ。

[Download Page](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)

## Marp for VS Code🎨
MarkdownToSlideの決定版。[記事で一度紹介しました。]({{< ref "/post/marp/updated-marp.md" >}})  
Chromeのパスを指定してあげることで、`pdf`や`pptx`などのスライドへVS Code上から変換できる。  
Marp CLIもいいけど、ぱっと簡単に使うならこっち。  
ちなみに、MacのChromeパスは`/Applications/Google\ Chrome.app/`で設定すればおｋなはず。

[Download Page](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode)

## Live Server🐟
ワンクリックで、現在のディレクトリを元にしたローカルサーバを建てられるスグレモノ。  
ローカルで何か確認したいときがあればこちらをどうぞ。

[Download Page](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

## GitLens — Git supercharged🥽
拡張機能のタイトルに付いていてちょっとムカついたが、その名の通り、`git`をめちゃくちゃ便利にしてくれる拡張機能です。
行の右にコミットが表示されたり、過去の履歴を表示させたりと`git`のことならこいつにおまかせ感がある。

[Download Page](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

## Code Runner🏃‍♂️
ちょっとコードを動作させたいときにとても便利です。  
さまざまな言語に対応しているみたいなので、結構好きな言語でショートコードの確認ができたりする。下図はJavaの例です。

![code-runner](/resources/vscode/good-extentions/code-runner.png)

[Download Page](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)

## TODO Highlight💡
`TODO:`や`FIXME:`などがデフォルトで設定されていますが、`NOTE:`や`DONE:`など、自身のオリジナルタグを追加することで色々な用途に利用可能です！
自分はメモとかにも利用しています。

[Download Page](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)


# 二軍
そこまで頻繁に使わないものや、少し尖ったもの。

## vscode-spotify🎵
下のバーにSpotifyの情報が表示される。  
音楽聴きながら作業していると、地味に画面移動をするシーンが多いのでVS Code1つで収まるのは便利。

[Download Page](https://marketplace.visualstudio.com/items?itemName=shyykoserhiy.vscode-spotify)

## Better Comments📝
特定のコメント文字列（TODOやFIXMEなど）に対して、色を付けてくれる拡張機能です。

[Download Page](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)

## filesize📁
左下にファイルのサイズを表示するだけのアプリ。たまに便利。

[Download Page](https://marketplace.visualstudio.com/items?itemName=mkxml.vscode-filesize)