---
title: "PowerShellの色を変えようと思ってたら、Windows Terminal(Preview)で変更してた"
date: 2019-12-02T13:21:43+09:00
tags: [Windows, Windows Terminal, PowerShell, Terminal, Setting]
archives: "2019"
author: Amatsuki
draft: false
---
# TL;DR
- `Color Tool`でもできるっぽいが、今後は`Windows Terminal`を使う
- `Settings`の`profiles`に設定を記述すると適応される
- 詳細は[ここ](https://github.com/microsoft/terminal/blob/master/doc/cascadia/SettingsSchema.md)を確認すること

# はじめに
プライベートではMacBook Proを使用しているのですが、会社ではThinkPadのWindowsPCを開発PCとして利用しています。  
ちょっとした作業をする際には、`WSL`を利用して行うようにしているのですが、どうしても`PowerShell`で処理を走らせないと駄目な場面がでてきます。そこでようやく`PowerShell`を開くのですが、デフォルトの色が嫌がらせレベルで見ずらい…  

ということで、色を変更する方法を調査しました。

# 変更方法を探す🔎
軽くググったところ、どうやら`Color Tool`というWindowsチームが作成した非公式のツールを使えば変更できるみたいです。

- [10分でWindows PowerShellの配色とフォントを変更して”使える”ツールに変貌させる](https://mimimopu.com/windows-powershell-color-font-change/)
- [Color Tool April 2019](https://github.com/microsoft/terminal/releases/tag/1904.29002)

しかし、こちらのリポジトリの最新版が`Windows Terminal`になっていることから、  
「今後は`Windows Terminal`の設定で色変更ができるようになるから、そっちで変更してな🤗」  
という事になっていると思われます。

そのため、今回は`Windows Terminal`を利用する形で色変更を行いたいと思います。

# Windows Terminalで色変更を行うまで🎨
まず、[`Microsoft Store`](https://www.microsoft.com/store/productId/9N0DX20HK701) or [`Github`](https://github.com/microsoft/terminal/releases/)から最新版をダウンロードしてきます。起動すると、以下のようなターミナルが開くと思いますので、画像の箇所をクリックして、`Settings`をクリックします。

![セッティングを開く](/resources/tried-to-change-powershell-color/1.png)

Settingを開くと`profiles.json`が開かれます。
こちらに、色などの設定を記載します。

テーマを適応したい場合は、Schemaにテーマを追加した後に`profiles`の該当ターミナルの設定に`colorscheme`として名前を追加すればOKです。  
試しに以下のテーマを適応してみました。

<script src="https://gist.github.com/t-eckert/9fd7c587c470e8312f07d8e65182644f.js"></script>

適応すると以下のようになります。背景、入力文字、エラー文字がデフォルトの`PowerShell`から変わっていることが確認できます。

![適応結果](/resources/tried-to-change-powershell-color/2.png)

他にも背景にgif画像を設定できたり、細かなキー設定ができたりと結構カスタマイズ性が高いっぽいので、好きな人はガッツリカスタマイズするのもありだと思います。

詳細は、[こちら](https://github.com/microsoft/terminal/blob/master/doc/cascadia/SettingsSchema.md#background-images-and-icons)に書かれています。

私はとりあえず、`foreground`と`background`のみ変更して利用をしています。

以下が自分の`profiles.json`です。一応載せておきます。

```json
// To view the default settings, hold "alt" while clicking on the "Settings" button.
// For documentation on these settings, see: https://aka.ms/terminal-documentation

{
    "$schema": "https://aka.ms/terminal-profiles-schema",

    "defaultProfile": "{Your GUID}",

    "profiles":
    [
        {
            // Make changes here to the powershell.exe profile
            "guid": "{Your GUID}",
            "name": "PS",
            "commandline": "powershell.exe",
            "hidden": false,
            "fontSize": 10,
            "background":"#2f2f38",
            "foreground":"#c6d9fd"
        },
        {
            // Make changes here to the cmd.exe profile
            "guid": "{Your GUID}",
            "name": "cmd",
            "commandline": "cmd.exe",
            "hidden": false
        },
        {
            "guid": "{Your GUID}",
            "hidden": false,
            "name": "Ubuntu",
            "source": "Windows.Terminal.Wsl",
            "fontSize": 10,
            "background":"#2c2525",
            "foreground":"#fdc6c6"
        },
        {
            "guid": "{Your GUID}",
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

# さいごに
よく使うソフトを整備することは、効率化やモチベアップにつながるので、継続的に知識を入れていきたいです🤓

windows terminalを調べていると、他のターミナルも気になりました。気力があれば記事にします。


# 参考
- [Profiles.json Documentation](https://github.com/microsoft/terminal/blob/master/doc/cascadia/SettingsSchema.md)
- [Windows Terminal Setting ベータ版](https://qiita.com/syui/items/3236495744a16d982464)
- [10分でWindows PowerShellの配色とフォントを変更して”使える”ツールに変貌させる](https://mimimopu.com/windows-powershell-color-font-change/)
- [Color Tool April 2019](https://github.com/microsoft/terminal/releases/tag/1904.29002)