---
title: 'GradleのArtifactとはなんぞや'
description: 'GradleのArtifactがどういったものなのかをよく忘れるので概要をメモしました。'
date: 2020-05-27T12:15:43+09:00
tags: [gradle, setting]
archives: '2020'
author: matsu4ki
draft: false
---

毎回忘れるのでメモ。

## Artifact とはなんぞや

該当プロジェクトが、一意に参照できるようにするためのもの。
プロジェクトの名前やライブラリの名前になることが多いと思う。

java のライブラリ管理はドメイン名と Artifact で行われており、それぞれをつなげたのものファイル名にする。
そのため、_example.com_ というドメインを所持している会社の _foo-library_ というライブラリを配布する場合、

```shell
com/
└── example
    └── foo-library
```

といった形になる。
また、Gradle の設定ファイルである`build.gradle`には、ドメイン部分の

```
group = 'com.example'
```

が記載される。

## じゃあ Name ってなんなん

Gradle では、複数のプロジェクトを 1 つのプロジェクトファイルにまとめることができる。
その際に使用する alias。
なので、単一プロジェクトでは Artifact と同じ名称になるかと思います。

## 参考

### Artifact について

> Artifact
> A file or directory produced by a build, such as a JAR, a ZIP distribution, or a native executable.
>
> Artifacts are typically designed to be used or consumed by users or other projects, or deployed to hosting systems. In such cases, the artifact is a single file. Directories are common in the case of inter-project dependencies to avoid the cost of producing the publishable artifact.
>
>[Gradle:Artifact](https://docs.gradle.org/current/userguide/dependency_management_terminology.html#sub:terminology_artifact)

### 複数プロジェクトをまとめる方法について

- [Gradle によるマルチプロジェクトの基本 | まくまく Gradle ノート](https://maku77.github.io/gradle/multi-project.html)
- [Gradle でマルチプロジェクト - Qiita](https://qiita.com/shiena/items/371fe817c8fb6be2bb1e)
