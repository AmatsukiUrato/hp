---
title: 'マルチAZとクロスリージョンレプリケーションの違い'
date: 2019-11-06T22:21:12+09:00
tags: [Amazon RDS, DB, AWS]
archives: '2019'
author: Amatsuki
draft: false
---

つい最近、表題について調べることが合ったため、忘備録として記載しておきます。

## 違いについて

結論から書くと、

- クロスリージョンレプリカはサブがリードレプリカなのに対して、マルチ AZ ではスタンバイレプリカになっている
- クロスリージョンレプリカは複数リージョンを利用するのに対し、マルチ AZ では同一リージョンを利用する

が大きな違いかなと思います。

## MultiAZ 構成について

RDS をマルチ AZ 構成で起動すると Master とは別の AZ に Slave の RDS が立ち上げられ、同期レプリケーションが行われます。俗に言う Master-Slave 構成。

Master がサーバダウンすれば、Slave くんが変わりに担当してくれるわけです。

## クロスリージョンレプリケーションについて

名の通り、複数のリージョンにまたがって RDS を建てる仕組みのことです。  
各リージョンには、リードレプリカが設置されて、Master がダウンすると、リードレプリカくんが代わりに担当してくれます。

## え？じゃあ MultiAZ よりもいいんじゃね？

~~そうなんです、MultiAZ はオワコンです。~~  
と思っていた時期が私にもありました。

クロスリージョンを行うには以下の制約があります。

- `MySQL` `PostgreSQL` `MariaDB` `Amazon Aurora MySQL DB`にしか適応できない
- リージョン間の通信の遅延時間が長くなる
- Amazon RDS のデータ転送料金が発生する
- VPC が 5 つを超えるクロスリージョンリードレプリカのインスタンスについては保証されていない(ACL に制限が
  あるため)
- 昇格プロセスが完了するまで数分以上かかる場合がある
- RDS のリードレプリカは昇格するとスタンドアロンの RDS になるため、一般的なマスタ-スレイブ構成のようにフェールバックができない

とりあえずクロスリージョンにすれば良いというわけでもないのです。  
コストや時間、RDS の DB エンジンなども考慮に入れないとベストな選択はできなさそうです。

昇格プロセスについては、数分かかると AWS のドキュメントに記載してあったので、書いてます。  
具体的に MultiAZ とクロスリージョンとで、起動にどれぐらいの差があるかは気になりますね。  
気が向いたら検証してみます。

## さいごに

DB の重要性やコスト感を考えて運用していくことが大事。  
ユースケースに合ったモデルを選びましょう。

## 参考

- [【新機能】RDS for PostgreSQL でもリージョン間レプリケーションが可能に！](https://dev.classmethod.jp/cloud/aws/rds-for-postgresql-cross-region-replication/)
- AWS 公式
  - [別の AWS リージョンでのリードレプリカの作成 > クロスリージョンレプリケーションの考慮事項](https://docs.aws.amazon.com/ja_jp/AmazonRDS/latest/UserGuide/USER_ReadRepl.html#USER_ReadRepl.XRgn)
  - [AWS リージョン間での Amazon Aurora MySQL DB クラスターのレプリケート](https://docs.aws.amazon.com/ja_jp/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Replication.CrossRegion.html)
  - [Amazon RDS での高可用性 (マルチ AZ)](https://docs.aws.amazon.com/ja_jp/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html)
