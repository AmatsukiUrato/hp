---
title: 'GCPのVMに新しいfirewallの設定を適応させる'
description: 'gcpでVMを立てた後に、新しくポートを開ける方法がわからなかったので調べました。'
date: 2020-06-21T21:20:42+09:00
tags: [gcp, virtualMachine, firewall, port開放]
archives: '2020'
author: matsu4ki
draft: false
toc: true
---

## はじめに

gcp にて、VM インスタンスを立てた後に新しいポートを開けようとしたのですが、あまり情報が落ちてなかったので書きました。

## TL;DR

VM インスタンスの詳細から、新しく追加した firewall ルールのタグ名をネットワークタグに追加する。

## 新しい firewall のルールを VM に追加する

VM を作成した段階からの手順です。

1. VPC ネットワークからファイアウォールを選択する<br>![fire-wall](/post/gcp/img/firewall-setting-1.png)
2. **ファイアウォール ルールを作成**を選択する<br>![fire-wall2](/post/gcp/img/firewall-setting-2.png)
3. **名前、ネットワーク、優先度、ターゲットタグ、ソース IP の範囲**を入力する。<br>ターゲットタグは後で VM 側から指定する firewall の設定グループ名になる。
4. 作成完了後、VM インスタンス一覧の画面に戻る
5. インスタンス名をクリックしてインスタンスの詳細を開く<br>（ずっと自分はネットワークの詳細の表示を選択してました…）<br>![fire-wall3](/post/gcp/img/firewall-setting-3.png)
6. **編集**を選択する<br>![fire-wall4](/post/gcp/img/firewall-setting-4.png)
7. [3.]で指定したネットワークタグを選択する<br>![fire-wall5](/post/gcp/img/firewall-setting-5.png)

上記の手順で新しく定義した firewall の設定が VM に対して適応されています。

## さいごに

自分は VM の詳細ページへ行くところで詰まるというくっそしょーもない問題で詰まってました。
しかも、参考にしたサイトをちゃんと読んだら、インスタンスの名称をクリックしろって書いてましたね。かなしい。

調べて思ったんですが、AWS に比べると GCP の情報量は思ってたよりも少ないです。
GCP はアメリカサーバーのしょぼい VM(f1-micro) だと無料で使えたりするので、お遊びでサーバーがほしい際には是非使ってみてください。

## 参考

- [ファイアウォール ルールの使用 | VPC | Google Cloud](https://cloud.google.com/vpc/docs/using-firewalls?hl=ja)
- [Google Cloud Platform のファイアウォール設定方法 | 85's life](https://eightyfivelife.com/2019/09/google-cloud-platform-firewall-setting/)
