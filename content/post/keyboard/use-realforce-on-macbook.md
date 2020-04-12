---
archives: "2020"
author: matsu4ki
date: "2020-04-12T16:35:34+09:00"
draft: false
headless: true
tags: [keyboard, MacBook, Karabiner-Elements]
title: リアルフォースをMacで使えるようにする
---

![keyの設定画像2](/resources/use-realforce-on-macbook/sonshi-style.png)

## はじめに

リモートワークになり、会社に置いていたリアルフォースを持ち帰ったため個人用途のMacでも利用しようと思い調べました。
個人のMac用にHHKBを買おうと思ったのですが、買う前に尊師スタイルでタイプする感覚を試しかったのでちょうど良かったです。

## TL;DR

- Karabiner-Elementsを使ってキーの変換を行う

## Winキーボードのボタンカスタマイズを行う

MacにWindows用のキーボードを挿しても一応反応するのですが、

1. かな/英字の変換キーがない
2. Windowsキーがコマンドキーになるため、微妙に位置がずれる

などの問題点があります。項目2はなんとかなるのですが、項目1は致命的です。
そこで、今回はMacのキーを制御できるソフトである**Karabiner-Elements**を利用したいと思います。

## Karabiner-Elementsの導入

Homebrewでインストールします。

```shell
brew cask reinstall karabiner-elements
```

これで**Karabiner-Elements**がインストールされるはずです。

### 設定を行う

色々できるみたいですが、今回は以下の2点を実施します。

- キーの変換カスタマイズ
- Macのキーを無効化

#### キーの変換設定

*Simple modifiactions*の*Target device*を自身のキーボード *REALFORCE 112JP(Topre)* に設定します。指定が終わった後は左下の*Add item*から何を何へ変換するのかを追加していけば完了です。自分の場合は以下のように設定しています。

left_guiはWindowsキーのことです。

![keyの設定画像](/resources/use-realforce-on-macbook/key-settings.png)

#### Macのキーを無効化

*Devices*の*Advanced*を開き、*Disable the build-in keyboard~~*と記載のある項目で自身のキーボードにチェックを入れます。これで、チェックを入れたキーボードを接続している間はMacのキーボードが無効になります。

ちなみに、無効になるのは物理キーだけなので、touch barは動作します。

![keyの設定画像2](/resources/use-realforce-on-macbook/key-settings2.png)

### 設定のバックアップを取る

以下のパスに設定用の*JSONファイル*があります。こいつをgistやクラウドのファイルストレージにあげておけば問題なさそうです。

```bash
~/.config/karabiner/karabiner.json
```

自分のconfigファイルはgistに上げてます。設定ファイル系あげるのに便利ですよね、gist。

<script src="https://gist.github.com/matsu4ki/794ad3f5bd33427dcfbcbf78275786d1.js"></script>

## さいごに

自分のリアルフォースは10キーが付いているやつなので結構無理やりな感じになってしまいましたが、お試しでやる分には良かったです。やっぱりゲーム以外でキーボードを利用するなら、テンキーレスなどのミニマルなキーボードを利用したほうが何かと便利ですね…


## 参考

- [MacBookPro で HHKB 尊師スタイル - Qiita](https://qiita.com/midorinokimi/items/8da9f234e96f1fa0f9e0)
- [[Mac] 他のキーボードに接続したら内蔵キーボードを無効化する方法 - あなたのスイッチを押すブログ](https://bamka.info/keyboard-mukoka)
- [Karabiner-Elements](https://karabiner-elements.pqrs.org/)