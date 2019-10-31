---
title: "iCloudのディレクトリをホームディレクトリに持ってくる方法"
date: 2019-10-29T05:47:19+09:00
tags: [iCloud, シンボリックリンク]
archives: "2019"
author: Amatsuki
draft: false
---
クラウドストレージを比較している途中で、  
iCloudをhomeディレクトリに移す(シンボリックリンクを貼る)作業が少し手間だったので、メモとして載せてます。

# ターミナルからアクセスしづらい問題
ターミナル上からiCloud Driveのファイルへアクセスしようとするには、  
```
Users/[userName]/Library/Mobile\ Documents/com~apple~CloudDocs
```  
にまでアクセスしなければならないです。  
一応シンボリックリンクは貼れますが、これも少し曲者でリンク元の方にスペース` `が入っているため、クォーテーションでくくってあげないとだめです(自分は気づかずに10分ぐらい悩んだ)。  
```
ln -s "/Users/$USER/Library/Mobile Documents/com~apple~CloudDocs" iCloud
```

# 参考
[Make A Symbolic Link to Your iCloud Drive](https://levlaz.org/make-a-symbolic-link-to-your-icloud-drive/)  
[ターミナルからiCloud driveに移動する方法](https://qiita.com/mom0tomo/items/aba245bcd4ce07e9a48f)