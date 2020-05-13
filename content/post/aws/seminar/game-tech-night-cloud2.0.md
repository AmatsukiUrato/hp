---
title: 'Amazon Game Tech Night Osakaに行ってみた'
date: 2019-10-31T02:19:44+09:00
tags: [AWS, AWSLoft, Cloud2.0, Feeling, Game]
archives: '2019'
author: Amatsuki
draft: false
---

畑違いの業種なのですが、  
AWS Pop-Up Loft Osaka が行われるとのことだったので、Game Tech Night へ参加しました！

会場は最初から最後まで、飲食ありのラフな感じで開催されておりました 😊  
登壇者は全員おもしろい発表をされていましたが、とくに面白かった Cloud2.0 についての所感を記載しております。

## もうそこまで迫っている！ Cloud2.0 時代の開発

### info

- 登壇者
  - 丹羽さん/GS2 の CEO
- HP
  - https://gs2.io/

<script async class="speakerdeck-embed" data-id="50f13b6a8ff1443e9a71615e7a0aab9d" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

### フルマネージドサービスを使おう

- 処理をフルマネージドにすることで、復旧対策や管理まで AWS が担保してくれる
  - あえてロックインされにいく
- コントローラブルなものを利用する=問題が発生したら、自分で解決しなければならない。
- フルマネージドのサービスを利用して自身の責務をなくす
  - API Gateway
  - App Sync
  - DynamoDB
  - S3
  - SNS
  - SQS
  - Kinesis Data Firehose
  - Athena

### イベントに対してプログラミングを行う

マイクロサービスを利用し、イベント駆動開発を行う。  
アプリ開発者は、自分のやりたいこと（XX のときの処理）だけを書けば良い形になる。
マイクロサービスが落ちたときの担保は、途中の通信処理を Queue に入れて行う。

### より耐久性の高いものにする

- ステートレスに設計することが大切
  - **ステートフルで設計を行うと耐障害性が下がる**
  - 運用不要にするにはサーバ側で状態を持ってはいけない
- 状態管理用データをどこかへ避難させることが重要
  - Lambda を利用する場合
    - DynamoDB へ逃がす（コスト高）
    - Step Functions を利用する（コスト高）
- クライアントに情報を持たす（ロールバックされても良いデータのみ）

## さいごに

来月の SoftwareDesign に Cloud2.0 に関しての記事が掲載されるみたいです
