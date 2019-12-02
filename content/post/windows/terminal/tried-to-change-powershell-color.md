---
title: "PowerShellの色をWindows Terminal変更してみた"
date: 2019-12-02T13:21:43+09:00
tags: [Windows, Windows Terminal, PowerShell, Terminal, Setting]
archives: "2019"
author: Amatsuki
draft: true
---
# TL;DR
- `Color Tool`でもできるっぽいが、今後は`Windows Terminal`を使う
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
まず、[`Microsoft Store`](https://www.microsoft.com/store/productId/9N0DX20HK701) or [`Github`](https://github.com/microsoft/terminal/releases/)から最新版をダウンロードしてきます。起動すると、以下のようなターミナルが開くと思いますので、画像の箇所をクリックして、`Settings`をクリックします。

![セッティングを開く](/resources/tried-to-change-powershell-color/1.png)

Settingを開くと`profiles.json`が開かれます。
こちらに、色などの設定を記載します。
詳細は、[こちら](https://raw.githubusercontent.com/microsoft/terminal/master/doc/cascadia/profiles.schema.json)に書かれているのですが、面倒くさいので、私は[ t-eckertさんの`flat-ui-v1.json`](https://gist.github.com/t-eckert/9fd7c587c470e8312f07d8e65182644f)をそのまま利用してます。  
以下が私の`profiles.json`となります。

```json
// To view the default settings, hold "alt" while clicking on the "Settings" button.
// For documentation on these settings, see: https://aka.ms/terminal-documentation

{
    "$schema": "https://aka.ms/terminal-profiles-schema",

    "defaultProfile": "{c6eaf9f4-32a7-5fdc-b5cf-066e8a4b1e40}",

    "profiles":
    [
        {
            // Make changes here to the powershell.exe profile
            "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
            "name": "PS",
            "commandline": "powershell.exe",
            "hidden": false,
            "fontSize": 10,
            "black":"#000000",
            "blue":"#2980b9",
            "brightBlack":"#7f8c8d",
            "brightBlue":"#3498db",
            "brightCyan":"#1abc9c",
            "brightGreen":"#2ecc71",
            "brightPurple":"#9b59b6",
            "brightRed":"#e74c3c",
            "brightWhite":"#ecf0f1",
            "brightYellow":"#f1c40f",
            "cyan":"#16a085",
            "green":"#27ae60",
            "purple":"#8e44ad",
            "red":"#c0392b",
            "white":"#ecf0f1",
            "yellow":"#f39c12",
            "background":"#2f2f38",
            "foreground":"#c6d9fd"
        },
        {
            // Make changes here to the cmd.exe profile
            "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
            "name": "cmd",
            "commandline": "cmd.exe",
            "hidden": false
        },
        {
            "guid": "{c6eaf9f4-32a7-5fdc-b5cf-066e8a4b1e40}",
            "hidden": false,
            "name": "Ubuntu",
            "source": "Windows.Terminal.Wsl",
            "fontSize": 10,
            "background":"#2c2525",
            "foreground":"#fdc6c6"
        },
        {
            "guid": "{b453ae62-4e3d-5e58-b989-0a998ec441b8}",
            "hidden": false,
            "name": "Azure Cloud Shell",
            "source": "Windows.Terminal.Azure"
        }
    ],

    // Add custom color schemes to this array
    "schemes": [],

    // Add any keybinding overrides to this array.
    // To unbind a default keybinding, set the command to "unbound"
    "keybindings": []
}
```