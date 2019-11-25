---
title: "バージョンの付け方を調べてみた"
date: 2019-11-25T21:20:19+09:00
tags: [Tech, Version]
archives: "2019"
author: Amatsuki
draft: false
---
# はじめに
今日、別部門の先輩から  
「お前のところのプロジェクトはどんな感じでバージョンの番号つけてる？」  
と聞かれたので、  
「年月日で付けてます。」  
と返したのですが、世間ではどういった感じで付けてるかをしっかりと意識してみたことはないと思い、調べてみました。


# さまざまな命名方法
いくつか、慣習で決められているものもあるようです。  
丸投げになってしまいますが、めちゃくちゃまとめられた記事を見つけたのでこちらを見るとわかりやすいです。

[バージョンにあれこれ考えを巡らせてみる](https://qiita.com/t_nakayama0714/items/c312bc5edcce6c214856)

# 各ソフトウェアのバージョン定義
自分が思いついた物のバージョン表記について調査しました。  
LTS版やStable版などの表記は省いてます。

## OS
- Ubuntu
    - [YY].[0M]
    - YY: 年
    - 0M: 月
- ArchLinux
    - [YYYY].[0M].[0D]
    - YYYY: 年
    - 0M: 月
    - 0D: 日
- CentOS
    - [A].[B].[CCCC]
    - 恐らく
        - A: Major
        - B: Minor
        - C: Patch
- Windows 10
    - [AAAA]
    - A: Version
## プログラミング言語
- Python
    - [A].[B].[CC]
    - A: Major:重要な変更リリース
    - B: Minor:大きくない変更
    - C: Micro:バグフィックス
- Node.js
    - [AA].[BB].[C]
    - A: Major
    - B: Minor
    - C: Revision
- Ruby
    - [A].[B].[C]
    - A: Major:メインのバージョンアップ
    - B: Minor:互換性があるバージョンアップ
    - C: Patch:バグフィックス
- Java
    - [AA].[B].[C].[D]
        - A: Feature: 機能リリース
        - B: Interim: 暫定リリース（バグ修正、機能強化）
        - C: Update: セキュリティリリース、リグレッション解決、バグ修正などのアップデート用
        - D: Patch: 重大な問題を修正するための緊急リリース
            - Patchは0の場合無視される

## アプリ
- Unity
    - [YYYY].[A].[BB]
    - Y: 年
    - A: Major
    - B: Minor
    - Majorが4だと、LTS版らしい
- IntelliJ
    - [YYYY].[Major].[Minor]
    - Y: 年
    - A: Major
    - B: Minor
- Chrome
    - [AA].[B].[CCCC].[DD]
    - A: Major
    - B: Minor
    - C: Build
    - D: Patch
- Docker
    - [AA].[BB].[C]
    - A: Major
    - B: Minor
    - C: Patch
- HearthStone(Game)
    - [AA].[B].[C].[DDDDD]
    - A: Major
    - B: Minor
    - C: Patch
    - D: Build?（想定）

# 調べてみて
- バージョンは、ユーザ側で改修させることを想定していないのであれば、ただの符号です
- 定期リリースやリリースの重要度が固定されているもの、符号として扱うことでユーザにわかりやすくるすことを想定するなら、バージョンを日付にするのはありよりのあり
- 何回か命名規則を変えているものや、ややこしい単語を追加しているものはそれだけで、ユーザ側は理解しづらくなるし萎えます
- バージョンは正しく管理できていれば何でも良さそう
- 正しく定義されていると、共通認識ができるので運用しやすそうとも思いました


# さいごに
色々なバージョンの付け方があって、面白かったです。
複雑なバージョンをつけるのは、それはそれでロマンがありますが、やはり使用者にとってわかりやすくするのが一番だと思いました。

セマンティックバージョニングでも、同じようなことが書かれています。

>このアイデアは新しいものでもなければ、革新的なものでもありません。実際、みなさんも似たような取り組みを既におこなっているかもしれません。問題は「似ている」のでは不十分だということです。正式な仕様書による取り決めがなければ、バージョンナンバーは依存性の管理において基本的には無意味です。上記のアイデアに対して名前と正確な定義を与えることよって、あなたの開発するソフトウェアにおいて、あなたの意図がユーザーに対して伝わりやすくなることでしょう。一度、これらの意図を正確にしてしまえば、柔軟な（しかし、柔軟すぎてはいけない）依存性の仕様を作ることができます。
>[セマンティック バージョニング 2.0.0](https://semver.org/lang/ja/)

決してStains;Gateのダルみたいな命名はしてはいけない ~~（確かにかっこよくてロマンはあるけど）~~

バージョンを名前で管理するときは、最初にちゃんと決めよう。

~~後もっとわかりやすいところに定義を書いとけ！！めちゃくちゃ探したぞ！~~

# 参考
- [セマンティック バージョニング 2.0.0](https://semver.org/lang/ja/)
    - [バージョン番号の振り方（GitHub推奨）](https://web-dev.hatenablog.com/entry/etc/semantic-versioning)
- [CalVar](https://calver.org/)
    - [日付を元にバージョンを定める「カレンダー・バージョニング」という考え方](https://gigazine.net/news/20180612-calendar-versioning/)
- https://web-dev.hatenablog.com/entry/unity/version-and-release-plan
- [バージョンにあれこれ考えを巡らせてみる](https://qiita.com/t_nakayama0714/items/c312bc5edcce6c214856)

## 各種ソフト・ハード
- CentOS
    - [Release Notes for supported CentOS distributions](https://wiki.centos.org/Manuals/ReleaseNotes)
- Docker
    - [Docker Engine release notes](https://www.docker.com/blog/docker-enterprise-edition/)
- Java
    - [JDK 11 Documentation > Version-String Format](https://docs.oracle.com/en/java/javase/11/install/version-string-format.html)
- Python
    - [一般 Python FAQ](https://docs.python.org/ja/3/faq/general.html#how-does-the-python-version-numbering-scheme-work)
- Node.js
    - [Node.js Release Working Group](https://github.com/nodejs/Release)
    - [Node.js > Releases](https://nodejs.org/en/about/releases/)
    - [Node.js基礎知識](https://qiita.com/kingston/items/0f4fb02af6ddcbb9e26d)
- Ruby
    - [第1回　Rubyのバージョンアップのおはなし (中越智哉)](https://www.school.ctc-g.co.jp/columns/nakagoshi/nakagoshi01.html)
    - [Ruby Releases](https://www.ruby-lang.org/en/downloads/releases/)
- Windows
    - [Windows 10 リリース情報](https://docs.microsoft.com/ja-jp/windows/release-information/)
- HearthStone
    - [Patches](https://hearthstone.gamepedia.com/Patches)