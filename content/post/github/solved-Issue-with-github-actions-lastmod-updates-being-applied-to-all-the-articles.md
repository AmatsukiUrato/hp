---
title: 'github-actions上でbuildした際、lastmodの更新がすべての記事に適用される問題を解決した'
date: 2020-04-02T02:47:24+09:00
tags: [github, ci, hugo]
archives: '2020'
author: matsuaki
draft: false
---

## はじめに

[hugo のジェネレートを GitHub-actions を使って、push するだけでデプロイできるようにした]({{< ref "/post/github/build-hugo-homepage-by-github-action.md" >}})のですが、全記事の最終更新日が更新されていたため原因調査をおこないました。

## TL;DR

- git の clone を行う際に最新コミットしか取得していなかった
- `actions/checkout`を利用する場合は以下の方法で fetch させ、全履歴を取得する

```yaml
- uses: actions/checkout@v2
  with:
    fetch-depth: 0 # Fetch all history for .GitInfo and .
```

## 試したこと

### GitHub-actions 上と local の比較

| icon |                   結果                    |
| :--: | :---------------------------------------: |
|  ✅  | 更新対象記事のみ lastmod が更新されていた |
|  ❎  |   すべての記事に対して更新が入っていた    |

- ローカル
  - ✅MacOS でのビルド
  - ✅Vagrant 内の Ubuntu:18.04.4 でのビルド
- CI 環境
  - ❎Ubuntu:ubuntu-18.04 でのビルド
  - ❎MacOS:latest でのビルド
  - ✅hugo のビルドを省いてデプロイ
  - ❎ オプションを外してビルド
  - ❎ 既存の workflow を使わずにコマンドでインストール（下記コマンドを実行）
    ```bash
    wget https://github.com/gohugoio/hugo/releases/download/v0.68.3/hugo_0.68.3_Linux-64bit.deb
    sudo apt-get install -y ./hugo_0.68.3_Linux-64bit.deb
    ```

### git 周りの確認

- 参照先の commitID が対象コミットの commitID になっているか
  - 対象のコミット ID でした
- `git log`の結果が正常に表示されているか
  - **CI 上のログでは、1 件しか表示されていなかった**

## 結果

`actions/checkout@v2`という公式の workflow を利用して git の clone を行っていたのですが、デフォルトでは最新のコミットしか取ってこないようです。
更新日時の参照先が見つけられなくなるため、すべての記事が最新のコミット更新日時を取得しに行ってしまったのだと思います。

> ```markdown
> # Number of commits to fetch. 0 indicates all history.
>
> # Default: 1
>
> fetch-depth: ''
> ```
>
> https://github.com/actions/checkout#usage

すべての履歴を clone してくることで、解決しました。
GitHub Actions の yml ファイルでは、以下のように記載するようです。

> ```yaml
> - uses: actions/checkout@v2
> - run: |
>     git fetch --prune --unshallow
> ```
>
> https://github.com/actions/checkout#fetch-all-history-for-all-tags-and-branches

**2020-04-04 追記**  
actions-hugo の製作者様から直接コメントで連絡をいただきました。以下の方法でもできるみたいです。上記の設定よりも簡潔なので、こちらを利用したほうが良いと思います。感謝 🙇‍♂️

> ```yaml
> - uses: actions/checkout@v2
>  with:
>    fetch-depth: 0    # Fetch all history for .GitInfo and .
> ```
>
> https://github.com/peaceiris/actions-hugo#%EF%B8%8F-use-the-latest-version-of-hugo

## さいごに

最初は hugo のセットアップに使っている workflow が悪いのかを疑ってたせいで、結構解決までに時間がかかりました…

今回のような問題を早期発見するために、確認用の Step も入れたほうが良いのかなと思いました。

## 参考

- [actions/checkout: Action for checking out a repo](https://github.com/actions/checkout)
- [peaceiris/actions-hugo: GitHub Actions for Hugo ⚡️ Setup Hugo quickly and build your site fast. Hugo extended, Hugo Modules, Linux (Ubuntu), macOS, and Windows are supported.](https://github.com/peaceiris/actions-hugo)
