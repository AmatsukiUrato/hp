---
title: "認証系知識ゼロからAmazon Cognitoを利用して、ユーザ認証基盤を作るまでやってみた"
date: 2019-10-19T13:44:41+09:00
tags: [AWS,Coginito, ユーザ認証]
archives: "2019"
author: Amatsuki
draft: true
---
## そもそもAmazon Cognitoってなんぞ
アプリの[認証](#認証と認可)、[認可](#認証と認可)、ユーザ管理ができ、  
ユーザー名+パスワードかFacebook、Amazon、Googleでサインインできるようにするサービスだよ！

>Amazon Cognito は、ウェブアプリケーションやモバイルアプリケーションの認証、許可、ユーザー管理をサポートしています。ユーザーは、ユーザー名とパスワードを使用して直接サインインするか、Facebook、Amazon、Google などのサードパーティーを通じてサインインできます。  
[Amazon Cognito とは](https://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/what-is-amazon-cognito.html)

## ユーザープールの管理とIDプールの管理とは？
ちゃんと下にデカデカと書いてありました(自分は見過ごしてましたｗ)  
![userPoolとIdentifyPoolの違い]()
### ユーザプール
サインアップ/サインインを行うための基盤を提供する

### IDプール
匿名ユーザ/サインインしたユーザに  
AWSサービスへの一時的なアクセス権を与える

>Amazon Cognito の主な 2 つのコンポーネントは、ユーザープールと ID プールです。ユーザープールは、アプリユーザーのサインアップとサインインオプションを提供するユーザーディレクトリです。ID プールは、AWS の他のサービスに対するアクセスをユーザーに許可します。ID プールとユーザープールは別々に使用することも、一緒に使用することもできます。  
![test](/resources/認証系知識ゼロからAmazon-Cognitoを利用して、ユーザ認証基盤を作るまでやってみた/cognito-userpool-identitypool-flow.png)  
[Amazon Cognito とは](https://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/what-is-amazon-cognito.html)  
[Amazon Cognito とは > Amazon Cognitoの機能](https://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/what-is-amazon-cognito.html#feature-overview)



## ユーザプールを作成する
- どうやってサインインさせるか
- 標準属性とは？

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


### OAuth2.0
https://qiita.com/TakahikoKawasaki/items/e37caf50776e00e733be


### フェデーレーション
>一度認証を通れば、その認証情報を使って、許可されているすべてのサービスを使えるようにする仕組み  
https://wa3.i-3-i.info/word12731.html

## 参考
- Cognitoで認証するまで
    - https://qiita.com/TakahikoKawasaki/items/e37caf50776e00e733be
    - https://dev.classmethod.jp/cloked/alb-cognito-user-pool/

- ログイン画面のオリジナル化
    - https://www.tdi.co.jp/miso/amazon-cognito-sign-up
    - https://qiita.com/Yuki_BB3/items/4286545e8b889ec13088