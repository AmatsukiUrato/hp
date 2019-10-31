---
title: "IntelliJでwebpack導入後、フォルダが見えなくなる問題の解決法"
date: 2019-06-30T20:08:06+09:00
tags: [IntelliJ, Webpack]
archives: "2019"
author: Amatsuki
draft: false
---
# TL;DR
設定からWebpackを開いて、configuration fileのパスを消す

# 原因
**IntelliJ**が賢すぎた。  
というのも、webpackのアウトプット先がintelliJ IDEA上でExcluded(非表示になりIntellij上から閲覧できなくなる)のは、  
webpackの出力先フォルダだからです。

設定は以下の場所にあり、  
`Preferences | Languages & Frameworks | JavaScript | Webpackwebpack`  の`configuration file:`の項目を空文字列にすることによってIntelliJ上から編集できるようになります。  

![intellijのsetting画像](/resources/why-did-webpack-hide-outputfile-on-intellij/intellij-webpack.png)

消している理由は

1. パフォーマンスのため  
2. そもそも編集する必要がないため

みたいですね。  
これ解決するのに結構時間かかりました…

# 参考
[intellij bundlei\_jsが消える理由](https://youtrack.jetbrains.com/issue/WEB-35875)
