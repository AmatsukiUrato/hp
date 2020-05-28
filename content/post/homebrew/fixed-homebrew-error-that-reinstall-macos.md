---
title: 'MacOSを入れ直したらbrew upgradeでエラーが出るようになった'
date: 2016-10-31
tags: [Homebrew, MacOS]
archives: '2016'
author: matsu4ki-old-hatenaBlog
draft: false
---

<div class="notification">
旧サイトの記事を移行してきたものとなります。
</div>

```bash
==> Using the sandbox
Error: /usr/local/opt/jpeg not present or broken
Please reinstall jpeg. Sorry :(
```

why!??
結構悩みましたが、以下のコマンドで直りました。

```bash
brew unlink jpeg && brew link jpeg
```

こういう系の問題って目的の記事とかが見つかれば一瞬なんですけど、  
見つかるまで永遠に解決しないので本当に辛い・・・。

## 参考

- [Library not loaded: /usr/local/opt/jpeg/lib/libjpeg.8.dylib #323](https://github.com/lovell/sharp/issues/323)
