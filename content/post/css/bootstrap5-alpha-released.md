---
title: 'Bootstrap5のα版がリリースされました'
description: 'Bootstrap5のα版がリリースされたので、現時点での変更点と、bootstrap4との容量比較を行いました。'
date: 2020-06-19T03:53:12+09:00
tags: [Bootstrap5, css]
archives: '2020'
author: matsu4ki
draft: false
toc: true
---

## 概要

2020-06-16 に Bootstrap5 の α 版が公開されました!!

[Bootstrap 5 alpha! | Bootstrap Blog](https://blog.getbootstrap.com/2020/06/16/bootstrap-5-alpha/)

公式のブログを読むと、以下の対応が挙げられていました。

- **jQuery を捨てたよ**
- **IE サポートを捨てたよ**
- 公式ドキュメントを改善したよ
  - Hugo を使っているよ
- ロゴを新しくしたよ
- form 系の要素を見直したよ
- Utilities を強化したよ
- html と css のみでボタンのトグルを実装したよ
- CSS のカスタムプロパティを使い始めたよ
- カラーパレット拡張したよ

近日公開予定のものは割愛しております。
Bootstrap のために jQuery 入れてたりしてたので、脱 jQuery は嬉しいですね。

## 容量を測ってみる

公式で CDN 提供されているものから取得しました。
少なくとも jQuery の分だけ早くなっているはず……！

bootStrap5 読み込み

```html
<!-- css -->
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
  integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I"
  crossorigin="anonymous"
/>
<!-- js -->
<script
  src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
  integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
  crossorigin="anonymous"
></script>
<script
  src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"
  integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/"
  crossorigin="anonymous"
></script>
```

Bootstrap4 読み込み

```html
<!-- css -->
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
  integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
  crossorigin="anonymous"
/>
<!-- js -->
<script
  src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
  integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
  crossorigin="anonymous"
></script>
<script
  src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
  integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
  crossorigin="anonymous"
></script>
<script
  src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
  integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
  crossorigin="anonymous"
></script>
```

### 結果

|                          | Bootstrap5 | Bootstrap4 |
| -----------------------: | :--------: | :--------: |
|        bootstrap.min.css |   21.7kB   |   24.2kB   |
| jquery-3.5.1.slim.min.js |    0kB     |   25.1kB   |
|            popper.min.js |    8kB     |    8kB     |
|         bootstrap.min.js |   16.4kB   |   15.2kB   |
|                     合計 |   46.1kB   |   72.5kB   |

26.4kB の減量に成功していております！

まだリリースしていない機能もあるみたいですが、jQuery が消えたので Bootstrap4 を超えることはないと思います。
だいぶダイエットしてますね。

## 参考

- [Bootstrap5 公式](https://v5.getbootstrap.com/)
- [Bootstrap4 公式](https://getbootstrap.com/)
