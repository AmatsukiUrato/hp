---
title: "github-actions上でbuildした際、lastmodの更新がすべての記事に適用される問題を解決した"
date: 2020-04-02T02:47:24+09:00
tags: [github, ci, hugo]
archives: "2020"
author: matsuaki
draft: false
---
## はじめに

[hugoのジェネレートをGitHub-actionsを使って、pushするだけでデプロイできるようにした]({{< ref "/post/github/build-hugo-homepage-by-github-action.md" >}})のですが、全記事の最終更新日が更新されていたため原因調査をおこないました。

## TL;DR

- gitのcloneを行う際に最新コミットしか取得していなかった
- `actions/checkout`を利用する場合は以下の方法でcloneさせ、全履歴を取得する

```yaml
- uses: actions/checkout@v2
- name: Checkout
  run: |
    git fetch --prune --unshallow
```

## 試したこと

### GitHub-actions上とlocalの比較
|icon|結果|
|:---:|:---:|
|✅|更新対象記事のみlastmodが更新されていた|
|❎|すべての記事に対して更新が入っていた|

- ローカル
    - ✅MacOSでのビルド
    - ✅Vagrant内のUbuntu:18.04.4でのビルド
- CI環境
    - ❎Ubuntu:ubuntu-18.04でのビルド
    - ❎MacOS:latestでのビルド
    - ✅hugoのビルドを省いてデプロイ
    - ❎オプションを外してビルド
    - ❎手動でhugo install and build
        ```bash
        wget https://github.com/gohugoio/hugo/releases/download/v0.68.3/hugo_0.68.3_Linux-64bit.deb
        sudo apt-get install -y ./hugo_0.68.3_Linux-64bit.deb
        ```

### git周りの確認

- 参照先のcommitIDが対象コミットのcommitIDになっているか
    - 対象のコミットIDでした
- `git log`の結果が正常に表示されているか
    - **CI上のログでは、1件しか表示されていなかった**

## 結果

`actions/checkout@v2`という公式のworkflowを利用してgitのcloneを行っていたのですが、デフォルトでは最新のコミットしか取ってこないようです。
更新日時の参照先が見つけられなくなるため、すべての記事が最新のコミット更新日時を取得しに行ってしまったのだと思います。

>```markdown
># Number of commits to fetch. 0 indicates all history.
># Default: 1
>fetch-depth: ''
>```
>https://github.com/actions/checkout#usage

すべての履歴をcloneしてくることで、解決しました。
GitHub Actionsのymlファイルでは、以下のように記載するようです。

>```yaml
>- uses: actions/checkout@v2
>- run: |
>    git fetch --prune --unshallow
>```
>https://github.com/actions/checkout#fetch-all-history-for-all-tags-and-branches

## さいごに

最初はhugoのセットアップに使っているworkflowが悪いのかを疑ってたせいで、結構解決までに時間がかかりました…

今回のような問題を早期発見するために、確認用のStepも入れたほうが良いのかなと思いました。

## 参考

- [actions/checkout: Action for checking out a repo](https://github.com/actions/checkout)
- [peaceiris/actions-hugo: GitHub Actions for Hugo ⚡️ Setup Hugo quickly and build your site fast. Hugo extended, Hugo Modules, Linux (Ubuntu), macOS, and Windows are supported.](https://github.com/peaceiris/actions-hugo)