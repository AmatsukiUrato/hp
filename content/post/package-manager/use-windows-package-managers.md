---
title: 'wingetのプレビュー版が公開されたので、他のパッケージ管理ソフトとかと一緒に使ってみる'
description: 'microsoftよりwingetというパッケージマネージャがプレビュー版で公開されたので、wingetを試すついでに他のパッケージマネージャも試してみました'
date: 2020-05-20T19:59:35+09:00
tags: [windows, package-manager, winget, scoop, chocolatey, AppGet]
archives: '2020'
author: matsu4ki
draft: false
---

## はじめに

2020-5-13 に Microsoft より、 **winget** のプレビュー版が公開されたので、
これを気に windows で使えるパッケージソフトをひととおり試してみました。
今回は VS Code のインストールを行っていきます。

試したパッケージマネージャは

- winget
- chocolatey
- scoop
- AppGet
- Npackd

です。

## winget を使う

1. [GitHub のページ](https://github.com/microsoft/winget-cli/releases/tag/v0.1.4331-preview)から Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.appxbundle をダウンロードする
2. 起動してインストール
3. powershell を起動して vscode をインストールをする

```powershell
winget install vscode
```

これで vscode がインストールされます。
結構楽にインストールできましたが、アンインストールは今のところないっぽいです。
因みに、パッケージ名が複数あった場合は同じ名前が複数個あると言われるので、Id を入力すれば OK です。

以下の画像の例では、git が被ってます。
`winget install Git.Git`で一番上の Git をインストールできます。

![パッケージ名がダブってる場合](/post/package-manager/img/winget-duplicate-name.png)

インストールできるパッケージは`winget search`または[パッケージリスト](https://github.com/microsoft/winget-pkgs/tree/master/manifests)から確認できます

## chocolatey を使う

1. [Chocolatey Software | Installing Chocolatey](https://chocolatey.org/install)からインストール用のコマンドをコピーする
2. powershell を管理者で起動した後、[1.]でコピーしたコマンドを実行する
3. インストール後に vscode をインストールする
4. インストールするかを聞かれるので y を押して開始する

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
choco install vscode
```

## scoop を使う

1. [Scoop](https://scoop.sh/)から Install コマンドをコピーする
2. powershell を起動した後、[1.]でコピーしたコマンドを実行する
3. インストール後にエクストラバケットを追加する
4. vscode をインストールする

```powershell
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')
scoop bucket add extras
scoop install vscode
```

```powershell
# scoop本体のインストールでエラーが発生した場合は実行する
Set-ExecutionPolicy RemoteSigned -scope CurrentUser
```

## AppGet を使う

1. [公式](https://appget.net/)より、インストーラをダウンロードしインストールを行う
2. vscode をインストールする

```powersehl
appget install visual-studio-code
```

## Npackd を使う

Npackd はインストールコマンドを叩きましたがコマンドが使えなかったため、省きます。

## 使ってみて

winget は使いやすいと感じました。
しかし、いま時点ででパッケージマネージャを使う分には、やはりパッケージ数が多く安定している chocolatey や scoop、Appget を使ったほうが良いと思います。
個人的には Program Files に保存してくれる chocolatey がオススメです。
Appget は使いやすいのですが、やはりパッケージ数が心もとないです。
scoop も悪くはないのですが、デフォルトの設定では path が scoop 独自のものになるため、各ソフト内で参照している exe ファイルを自分で設定することになる場合があります。
なので、scoop を把握していない人が気軽に使うとちょっとややこしくなります。

## まとめ（2020-05-21 時点）

|                              |    winget     |  chocolatey   |      scoop      |    AppGet     |
| :--------------------------: | :-----------: | :-----------: | :-------------: | :-----------: |
|         パッケージ数         |      166      |     7771      |      2693       |      893      |
| デフォルト<br>インストール先 | Program Files | Program Files | User/scoop/apps | Program Files |

**scoop bucket 内訳**<br>
702(main)+1004(extras)+131(games)+107(nerd-fonts)+27(nirsoft)+186(Java)+90(Scoop-JetBrains)+65(scoop-nonportable)+381(PHP)

パッケージ数で見るとやはり chocolatey が圧倒的です…

## 参考

- [microsoft/winget-cli: Windows Package Manager CLI (aka winget)](https://github.com/microsoft/winget-cli)
  - [［速報］Windows 用パッケージマネージャ「winget」がプレビューリリース。コマンドラインからアプリケーションをインストール。Microsoft Build 2020 － Publickey](https://www.publickey1.jp/blog/20/windowswingetmicrosoft_build_2020.html)
  - [Windows Package Manager Preview | Windows Command Line](https://devblogs.microsoft.com/commandline/windows-package-manager-preview/)
- [Chocolatey Software | Chocolatey - The package manager for Windows](https://chocolatey.org/)
- [Scoop](https://scoop.sh/)
- [AppGet - Windows Package Manager](https://appget.net/)
- [Ninite - Install or Update Multiple Apps at Once](https://ninite.com/)
- [Npackd](https://www.npackd.org/)
- [PackageManagement](https://docs.microsoft.com/en-us/powershell/module/packagemanagement/)
