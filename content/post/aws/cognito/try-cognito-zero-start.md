---
title: "認証系知識ゼロからAmazon Cognitoを利用して、ユーザ認証基盤を作るまでやってみた"
date: 2019-10-19T13:44:41+09:00
tags: [AWS,Coginito, ユーザ認証]
archives: "2019"
author: Amatsuki
draft: true
---
# 前提
## そもそもAmazon Cognitoってなんぞ
アプリの[認証](#認証と認可)、[認可](#認証と認可)、ユーザ管理ができ、  
ユーザー名+パスワードかFacebook、Amazon、Googleとかのアカウントでサインインできるようにするサービスだよ！

>Amazon Cognito は、ウェブアプリケーションやモバイルアプリケーションの認証、許可、ユーザー管理をサポートしています。ユーザーは、ユーザー名とパスワードを使用して直接サインインするか、Facebook、Amazon、Google などのサードパーティーを通じてサインインできます。  
[Amazon Cognito とは](https://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/what-is-amazon-cognito.html)


## ユーザープールの管理とIDプールの管理とは？
ちゃんと下にデカデカと書いてありました(自分は見過ごしてました😇)  

![userPoolとIdentifyPoolの違い](/resources/try-cognito-zero-start/what-is-userpool-identitypool.png)

### ユーザプール
サインアップ/サインインを行うための基盤を提供する

### IDプール
匿名ユーザ/サインインしたユーザに  
AWSサービスへの一時的なアクセス権を与える

>Amazon Cognito の主な 2 つのコンポーネントは、ユーザープールと ID プールです。ユーザープールは、アプリユーザーのサインアップとサインインオプションを提供するユーザーディレクトリです。ID プールは、AWS の他のサービスに対するアクセスをユーザーに許可します。ID プールとユーザープールは別々に使用することも、一緒に使用することもできます。  
![flow](/resources/try-cognito-zero-start/cognito-userpool-identitypool-flow.png)  
[Amazon Cognito のユーザープールと ID プールの違いは何ですか?](https://aws.amazon.com/jp/premiumsupport/knowledge-center/cognito-user-pools-identity-pools/)  
[Amazon Cognito とは > Amazon Cognitoの機能](https://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/what-is-amazon-cognito.html#feature-overview)



---
# 実際に触ってみる
基本的には  
[インフラエンジニアが一切コードを書かずにWebサーバーに認証機能を実装した話](https://dev.classmethod.jp/cloked/alb-cognito-user-pool/)  
([魚拓](https://megalodon.jp/2019-1020-1537-54/https://dev.classmethod.jp:443/cloud/alb-cognito-user-pool/))  
を参考に構築していきました。

ここでは、途中でよくわからなかったところを記載していきます。

- Cognitoで認証するまで


## ユーザプールを作成する
- どうやってサインインさせるか
- 標準属性とは？

## X回間違えたら利用時間制限orロックを行うには？
アカウントロックを実装するにはAWS_APIの`AdminResetUserPassword API`を利用する必要がある。

[Amazon Cognito Lock Out Policy](https://forums.aws.amazon.com/thread.jspa?threadID=238535)  
[Amazon Cognito User Lock Out](https://forums.aws.amazon.com/thread.jspa?messageID=871010&#871010)  
[How to Expire a User in User Pool forcefully using API](https://forums.aws.amazon.com/thread.jspa?messageID=895756&#895756)


## ユーザの作成ができない
必須の標準属性で指定しており、cognitoのユーザーの作成画面で表示されていない項目がある場合はエラーになるみたいです。
![flow](/resources/try-cognito-zero-start/user-create-modal.png)
[AWS cognito- create new user giving “Unable to parse the number” error](https://stackoverflow.com/questions/53719173/aws-cognito-create-new-user-giving-unable-to-parse-the-number-error)

## 単語一覧
### 認証と認可
認証

>ある個人を特定すること。
「Aさんですね？」

認可  

>行動やリソースの使用を許可すること。  
>「伺っております。奥へどうぞ」

1. [認証と認可](https://qiita.com/wingsys/items/44b45e1a286f2d4c3a29)
2. [よくわかる認証と認可](https://dev.classmethod.jp/security/authentication-and-authorization/)
3. [OAuth 2.0 + OpenID Connect のフルスクラッチ実装者が知見を語る > 認証と認可](https://qiita.com/TakahikoKawasaki/items/f2a0d25a4f05790b3baa#%E8%AA%8D%E8%A8%BC%E3%81%A8%E8%AA%8D%E5%8F%AF)


### OAuth
アクセストークンの要求と、その応答を標準化したもの  
[一番分かりやすい OAuth の説明
](https://qiita.com/TakahikoKawasaki/items/e37caf50776e00e733be)


### フェデーレーション
>一度認証を通れば、その認証情報を使って、許可されているすべてのサービスを使えるようにする仕組み  
https://wa3.i-3-i.info/word12731.html

## 参考
- ログイン画面のオリジナル化
    - https://www.tdi.co.jp/miso/amazon-cognito-sign-up
    - https://qiita.com/Yuki_BB3/items/4286545e8b889ec13088