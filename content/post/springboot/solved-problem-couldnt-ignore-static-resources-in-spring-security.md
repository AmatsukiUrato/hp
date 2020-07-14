---
title: 'SpringSecurityのconfigureにて、静的ファイルが対象外にならない'
description: ''
date: 2020-06-01T01:55:26+09:00
tags: [SpringBoot, SpringSecurity]
archives: '2020'
author: matsu4ki
draft: false
toc: false
---

## 概要

SpringSecurity を導入している SpringBoot のプロジェクトにて、静的ファイルを対象外にするための設定が反映されてなかったです。

## 原因

静的リソースフォルダとして扱われるフォルダ内が、ルートとして扱われるみたいです。

```shell
src/main/resources/public
└── js/
└── css/
└── file1/
```

上記のようなフォルダ構成の場合で、js と css を open にしたい場合は下記のように設定します。

```java
@Override
public void configure(WebSecurity web) throws Exception {
    web.ignoring().antMatchers("/js/**", "/css/**");
}
```

public で指定しても、SpringSecurity の保護対象外にならないです。

```java
@Override
public void configure(WebSecurity web) throws Exception {
    // 意味ない
    web.ignoring().antMatchers("/public/**");
}
```
