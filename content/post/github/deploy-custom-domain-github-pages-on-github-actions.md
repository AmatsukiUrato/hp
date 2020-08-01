---
title: 'GitHub-ActionsでカスタムドメインのGitHub-Pagesをデプロイすると、カスタムドメインの登録が消える'
date: 2020-03-01T22:24:43+09:00
tags: [github-actions, ci, github-pages]
archives: '2020'
author: matsuaki
draft: false
---

GitHub-Actions でデプロイを行うと、custom ドメインで設定したものが初期化されていました。
原因は GitHub-Actions で利用している[actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)にて、cname の設定を忘れていたためでした。

[こちら](https://github.com/peaceiris/actions-gh-pages#%EF%B8%8F-disable-nojekyll)に乗っている通り、`with.cname`に自身のカスタムドメイン名を記入すれば正常にデプロイされるはずです。

```yaml
- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./public
    cname: github.com
```
