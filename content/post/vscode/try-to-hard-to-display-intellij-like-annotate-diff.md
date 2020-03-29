---
title: "VSCode上でIntelliJライクなgitのannotate diffができるらしい"
date: 2020-03-24T22:42:19+09:00
tags: [VSCode, IntelliJ, git, blame, diff]
archives: "2020"
author: matsuaki
draft: false
---

![IntelliJのAnnotate機能](/resources/vscode/try-to-hard-to-display-intellij-like-annotate-diff/annotate-diff.png)

## はじめに

IntelliJにはGitの履歴確認方法の1つとして、Annotate機能が用意されています。  
これがめちゃクソ便利なので、なんとかしてVS Code内でも再現できないかと模索した話になります。
Git LensはVS Code内の良い拡張機能として紹介されていることが多いけど、Git Lensの機能の1つであるannotation diffについてはあまり紹介されていないように思えるので紹介してみた。

## TL;DR

プラグインのGit Lensを入れて、以下の設定に変更すればそれっぽくなる

| SettingName | Value |
|:-:|:-:|
|Avatars|チェックを外す|
|Compact|チェックを外す|
|Date Format|`YYYY/MM/DD`|
|Format|`${id} ${date} ${author|10?}`|

## 設定する

1. Git Lensが必要なので、ExtensionsからGit Lensをダウンロードする（[直リンク](vscode:extension/eamodio.gitlens)）。
1. 設定一覧を開き（`⌘ + ,`）、以下の画像の用に設定を行う。
![VSCodeの設定](/resources/vscode/try-to-hard-to-display-intellij-like-annotate-diff/vscode-settings.png)
1. gitで管理されているファイルを開き、コマンドパレットを表示する（`⌘ + Shift + P`）。
1. 「GitLens: Toggle File Blame Annotations」を選択する。
![VSCodeのAnnotate機能](/resources/vscode/try-to-hard-to-display-intellij-like-annotate-diff/annotate-command-palette.png)

これで、以下のように表示されるはず。

![VSCodeのAnnotate機能](/resources/vscode/try-to-hard-to-display-intellij-like-annotate-diff/vscode-annotate.png)

## さいごに

パット見それっぽくなりましたが、Annotateから過去コミットの内容閲覧や過去コミットとのDiffをとることはできないっぽいので、やはりIntelliJのほうが使い勝手は良いです😥

手軽にコーディングする際はVS Code、ガッツリコーディングするときはIntelliJとかで分けると良さそうですね。

## 参考

- [Git Lens Official](https://gitlens.amod.io/)