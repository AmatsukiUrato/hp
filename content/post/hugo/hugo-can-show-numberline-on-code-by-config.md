---
title: "configの設定からHugoで表示するコードに番号を表示する"
date: 2020-02-18T21:50:42+09:00
tags: [hugo]
archives: "2020"
author: Amatsuki
draft: false
---
# 以前
昔（v0.60.0以前）はソースコードに行数を入れるには、以下のような記述が必要でした。
```go
{{</* highlight go "linenos=table,hl_lines=8 15-17,linenostart=199" */>}}
// ... code
{{</* / highlight */>}}
```

# 今
今は以下のconfig（config.toml）を設定しておくことで、
バッククォート(`)だけのコードでも行数が付くようになってます。

```toml
[markup]
  [markup.highlight]
    codeFences = true
    guessSyntax = false
    hl_Lines = ""
    lineNoStart = 1
    lineNos = false
    lineNumbersInTable = true
    noClasses = true
    style = "monokai"
    tabWidth = 4
```
意味を乗っけておくと、
- codeFences
    - syntaxHighlightを使うかの設定。
- guessSyntax
    - 書かれている言語を推測してハイライトするかの設定。
- hl_Lines
    - highLightする範囲の設定で、monokaiだと黄色くなる。  
    書き方は"8 10-17"みたいな感じ。
- lineNoStart
    - 最初の行カウントを何にするかを決められる。普通は0か1だと思う。
- lineNos
    - 行数つけるかを決める。
- lineNumbersInTable
    - 行数とコードをhtmlとして、別のブロックで分けるかを決める。  
    `true`にしているとコピペがしやすい。ただ横幅が`false`の設定のときよりやや長くなる。
- noClasses
    - スタイル指定をクラスで行うかを決める。
- style
    - 何のスタイルを使うかを決める。
- tabWidth
    - tab幅。2か4で迷う。

# My設定
最後に自分の設定乗っけておきます。
```toml
[markup]
    [markup.highlight]
        codeFences = true
        guessSyntax = true
        hl_Lines = ""
        lineNoStart = 1
        lineNos = true
        lineNumbersInTable = true
        noClasses = true
        style = "monokai"
        tabWidth = 4
```

# 参考
- [Highlight Shortcode](https://gohugo.io/getting-started/configuration-markup/#configure-markup)
- [Hugo v0.60 から既定の Markdown パーサが Goldmark になったようだ](https://text.baldanders.info/release/2019/11/hugo-v0_60-with-goldmark-parser/)
- [Escaping Hugo shortcodes({{}}のエスケープ方法/記事書くときに参考にしました)](https://liatas.com/posts/escaping-hugo-shortcodes/)