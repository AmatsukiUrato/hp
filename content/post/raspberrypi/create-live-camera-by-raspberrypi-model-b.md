---
title: 'RaspberryPi 3 Model Bで遊ぶ'
date: 2017-02-01
tags: [RaspberryPi, uv4l]
archives: '2017'
author: Amatsuki-old-Blogger
draft: false
---

<div class="notification">
旧サイトの記事を移行してきたものとなります。
</div>

今日のご飯が何かを確認したいためのラズパイカメラ作成を行います

この前 RaspberryPi 3 Model B を買ってそこら辺に転がってた USB カメラと繋げて台所に出て来るご飯をブラウザ上から見られるようにしたのでその時の経緯を記載。

## NOOBS を使って Raspbian を入れる

お前初心者かよｗｗと煽っているわけではないです。  
NOOBS とは、ラズパイ用に作られた Debian ベースの OS である Raspbian とかを簡単にインストールできるようにしたインストーラーです。  
[NOOBS ダウンロードページ](https://www.raspberrypi.org/downloads/noobs/)で NOOBS 落として SD カードにブチ込んで終了。

## Raspbian を起動して sshd を Raspbian 起動時に起動させるようにする

`sudo apt-get install sysv-rc-conf`で`sysv-rc-conf`を入れて Raspbian 起動時設定してもうまくいきません。  
どうやら Raspbian は`systemd`で制御しないとだめみたいです。  
[参考](https://teratail.com/questions/62910)

## IP 固定設定をする

これはそこら辺ググったら出てくるので投げちゃいます。

## uv4l のインストールをする

uv4l っていう install したらほぼほぼ何もしなくてもブラウザ上で Web カメラを見られるようにできるやつを使う。  
[Raspberry Pi3 と USB WEB カメラでストリーミング](https://qiita.com/sp_ice/items/7f15e262fffd69d3375c)を参考すればおｋ。

## 確認

以下の画像のようになってたらおｋ。

![uv4l](/resources/create-live-camera-by-raspberrypi-model-b/uv4l-homepage.png)

## ポート開放やその他

僕はローカルのみでの運用なのであまり設定してないけど ssh(22)とか uv4l(8090)で使うのポート変更&開放をする。

以上でおしまい！
本当は python とか使って自分で Web カメラキャプチャ用のプログラムとか組みたかったんだけど調べてる途中で面倒になってやめました・・・ｗ
今後機会があればまたやってみたいと思います。
