---
title: "Hugoで記事が一年以上過ぎた場合はnoticeを表示するようにした"
date: 2019-11-12T21:36:21+09:00
tags: [hugo, go, template]
archives: "2019"
author: Amatsuki
draft: false
---
## TL;DR
以下の書き方で実装可（⚠️`Bulma`での実装）

```go-html-template
{{ $year := (div (sub now.Unix .Lastmod.Unix) 31536000) }}
{{ if le 1 $year }}
<div class="notification is-warning">
    この記事は、掲載されてから {{ $year }} 年間修正されておりません。
</div>
{{ end }}
```

- Hugo公式の`.Unix`ページを見よ

## はじめに
唐突に、「記事が老朽化している表示」はほしいなと思い、色々と検索して実装ができた感じです。`Go`のテンプレートエンジンにだけ詳しくなっていく…

## 方法
一番上に書いてあるとおり、
```go-html-template
<!-- 再掲 -->
{{ $year := (div (sub now.Unix .Lastmod.Unix) 31536000) }}
{{ if le 1 $year }}
<div class="notification is-warning">
    この記事は、掲載されてから {{ $year }} 年間修正されておりません。
</div>
{{ end }}
```
で実装できる。  
実際の表示はこんな感じ😗

![display-warning](/resources/show-notification-if-now-greater-equal-updated-time/no-update-one-year.png)


多分上記のコードを読んだらわかると思いますが、一応解説します。

```go-html-template
{{ $year := (div (sub now.Unix .Lastmod.Unix) 31536000) }}
```
ここでは、

1. 現在時刻のUnix時刻と最終更新のUnix時刻を取得して、引く
2. 記事を更新してから何秒経過したのかがわかるので、31536000秒（一年=365日で計算）で割り、時刻を年単位変換します。
3. $year変数に代入

を行っています。

後は、1年以上かどうかでif文判定して表示している感じです。
Hugoの`.Unix`ページに書いてあったのになぜもっと早く見ておけばよかった。公式ページでは1日を算出しています。

計算が面倒くさい人用に、早見表を参考に置いてます。

## 参考
- [「早見表」すぐわかる1分～100年まで何秒なのか一覧表](https://www.rougebleu.net/%E4%BD%95%E7%A7%92%EF%BC%9F/)
- [Hugo > .Unix](https://gohugo.io/functions/unix/)
- [Goのtemplateにおける値の評価の書き方](https://ema-hiro.hatenablog.com/entry/20170729/1501320887)
- [Hugoでも「この記事は最終更新日からX年以上経過しています」みたいなアラートを表示したい](https://42-design.work/technology/hugo-old-entry-alert/)