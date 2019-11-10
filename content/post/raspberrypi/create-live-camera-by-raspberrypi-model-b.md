---
title: "RaspberryPi 3 MODEL Bで遊ぶ"
date: 2017-02-01
tags: [RaspberryPi, uv4l]
archives: "2017"
author: Amatsuki-old-Blogger
draft: false
---
<div class="notification">
旧サイトの記事を移行してきたものとなります。
</div>

今日のご飯が何かを確認したいためのラズパイカメラ作成を行います

この前RaspberryPi 3 Model Bを買ってそこら辺に転がってたUSBカメラと繋げて台所に出て来るご飯をブラウザ上から見られるようにしたのでその時の経緯を記載。

# NOOBSを使ってRaspbianを入れる
お前初心者かよｗｗと煽っているわけではないです。  
NOOBSとは、ラズパイ用に作られたDebianベースのOSであるRaspbianとかを簡単にインストールできるようにしたインストーラーです。  
[NOOBSダウンロードページ](https://www.raspberrypi.org/downloads/noobs/)でNOOBS落としてSDカードにブチ込んで終了。

# Raspbianを起動してsshdをRaspbian起動時に起動させるようにする
※sudo apt-get install sysv-rc-confでsysv-rc-confを入れてRaspbian起動時設定してもうまくいきません。  
どうやらRaspbianはsystemdで制御しないとだめみたいです。  
[参考](https://teratail.com/questions/62910)

# IP固定設定をする
これはそこら辺ググったら出てくるので投げちゃいます。

# uv4lのインストールをする
uv4lっていうinstallしたらほぼほぼ何もしなくてもブラウザ上でWebカメラを見られるようにできるやつを使う。  
[Raspberry Pi3とUSB WEBカメラでストリーミング](https://qiita.com/sp_ice/items/7f15e262fffd69d3375c)を参考すればおｋ。

# 確認
以下の画像のようになってたらおｋ。

![uv4l](/resources/create-live-camera-by-raspberrypi-model-b/uv4l-homepage.png)

# ポート開放やその他
僕はローカルのみでの運用なのであまり設定してないけどssh(22)とかuv4l(8090)で使うのポート変更&開放をする。

以上でおしまい！
本当はpythonとか使って自分でWebカメラキャプチャ用のプログラムとか組みたかったんだけど調べてる途中で面倒になってやめました・・・ｗ
今後機会があればまたやってみたいと思います。