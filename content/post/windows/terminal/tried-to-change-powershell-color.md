---
title: "PowerShellの色をWindows Terminal変更してみた"
date: 2019-12-02T13:21:43+09:00
tags: [Windows, Windows Terminal, PowerShell, Terminal, Setting]
archives: "2019"
author: Amatsuki
draft: true
---
# TL;DR
- `Windows Terminal`を使う
- `Settings`の`profiles`に設定を記述すると適応される
- 詳細は[ここ](https://aka.ms/terminal-profiles-schema)を確認すること

# はじめに
プライベートでは`Mac Book Pro`を使用しているのですが、会社ではThinkPadのWindowsPCを開発PCとして利用しています。  
ちょっとした作業をする際には、`WSL`を利用して行うようにしているのですが、どうしても`PowerShell`で処理を走らせないと駄目な場面がでてきます。そこでようやく`PowerShell`を開くのですが、デフォルトの色が嫌がらせレベルで見ずらい…  

ということで、色を変更する方法を調査しました。

# 変更方法を探す
軽くググったところ、どうやら`Color Tool`というWindowsチームが作成した非公式のツールを使えば変更できるみたいです。

- [10分でWindows PowerShellの配色とフォントを変更して”使える”ツールに変貌させる](https://mimimopu.com/windows-powershell-color-font-change/)
- [Color Tool April 2019](https://github.com/microsoft/terminal/releases/tag/1904.29002)

しかし、こちらのリポジトリの最新版が`Windows Terminal`になっていることから、  
「今後は`Windows Terminal`の設定で色変更ができるようになるから、そっちで変更してな🤗」  
という事になっていると思われます。

そのため、今回は`Windows Terminal`を利用する形で色変更を行いたいと思います。

# Windows Terminalで色変更を行うまで
