---
title: "マルチAZとクロスリージョンレプリケーションの違い"
date: 2019-11-06T22:21:12+09:00
tags: [Amazon RDS, DB, AWS]
archives: "2019"
author: Amatsuki
draft: false
---
つい最近、表題について調べることが合ったため、忘備録として記載しておきます。

# 違いについて
結論から書くと、

- クロスリージョンレプリカはサブがリードレプリカなのに対して、マルチAZではスタンバイレプリカになっている
- クロスリージョンレプリカは複数リージョンを利用するのに対し、マルチAZでは同一リージョンを利用する

が大きな違いかなと思います。

# MultiAZ構成について
RDSをマルチAZ構成で起動するとMasterとは別のAZにSlaveのRDSが立ち上げられ、同期レプリケーションが行われます。俗に言うMaster-Slave構成。

Masterがサーバダウンすれば、Slaveくんが変わりに担当してくれるわけです。

# クロスリージョンレプリケーションについて
名の通り、複数のリージョンにまたがってRDSを建てる仕組みのことです。  
各リージョンには、リードレプリカが設置されて、Masterがダウンすると、リードレプリカくんが代わりに担当してくれます。


# え？じゃあMultiAZよりもいいんじゃね？
~~そうなんです、MultiAZはオワコンです。~~  
と思っていた時期が私にもありました。

クロスリージョンを行うには以下の制約があります。

- `MySQL` `PostgreSQL` `MariaDB` `Amazon Aurora MySQL DB`にしか適応できない
- リージョン間の通信の遅延時間が長くなる
- Amazon RDS のデータ転送料金が発生する
- VPCが5つを超えるクロスリージョンリードレプリカのインスタンスについては保証されていない(ACLに制限が
あるため)
- 昇格プロセスが完了するまで数分以上かかる場合がある

とりあえずクロスリージョンにすれば良いというわけでもないのです。  
コストや時間、RDSのDBエンジンなども考慮に入れないと行けないわけですね。

昇格プロセスについては、数分かかるとAWSのドキュメントに記載してあったので、書いてます。  
具体的にMultiAZとクロスリージョンとで、起動にどれぐらいの差があるかは気になりますね。  
気が向いたら検証してみます。

# さいごに
DBの重要性やコスト感を考えて運用していくことが大事。  
ユースケースに合ったモデルを選びましょう。

# 参考
- [【新機能】RDS for PostgreSQLでもリージョン間レプリケーションが可能に！](https://dev.classmethod.jp/cloud/aws/rds-for-postgresql-cross-region-replication/)
- [別のAWSリージョンでのリードレプリカの作成 > クロスリージョンレプリケーションの考慮事項](https://docs.aws.amazon.com/ja_jp/AmazonRDS/latest/UserGuide/USER_ReadRepl.html#USER_ReadRepl.XRgn)
- [AWS リージョン間での Amazon Aurora MySQL DB クラスターのレプリケート](https://docs.aws.amazon.com/ja_jp/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Replication.CrossRegion.html)
- [Amazon RDS での高可用性 (マルチ AZ)](https://docs.aws.amazon.com/ja_jp/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html)