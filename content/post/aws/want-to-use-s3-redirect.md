---
title: 'S3のリダイレクト機能でgithubのpageへ飛ばしたい'
date: 2019-07-02T23:33:13Z
tags: [AWS, S3, Route53]
draft: false
archives: '2019'
author: matsu4ki
---

~~完成してないです。~~ 動きました。
前に取得した`.net`のドメインを踏んだときに S3 のリダイレクト機能を使ってこのページに飛べるようにしようと思い設定してました。

## 出来たこと

- s3 のエンドポイント(http のリンク)にアクセスすると githubPage にリダイレクトする
- s3 のエイリアスを作成する

## 出来てないところ

- `.net`ドメインにアクセスしても s3 のリダイレクト用エンドポイントにまでたどり着かない - not found エラーが発生する - Route53 での設定が正しく行えていないと予想

## 追記

Route53のDNSを正しく設定できていなかったことが原因でした。
詳しくは[こちらの記事]({{< ref "/post/aws/route53/resolved-routing-problem-on-route53.md" >}})を参照
