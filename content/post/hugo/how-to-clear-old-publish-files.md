---
title: "Hugoで一度publishしてしまったファイルをデプロイ時に消す"
date: 2020-02-04T02:40:26+09:00
tags: [hugo, command]
archives: "2020"
author: Amatsuki
draft: false
---
# はじめに
`hugo`でデプロイする際に、よくミスって不要記事をpublishしてしまうことがあります。
その後再度公開を行うと、出力元のフォルダからは消えているのにもかかわらず残り続けます。

今回はそれの解決を行いました。  
（今まではpublic以下をスクリプトで消してた…）

# TL;DR
- `hugo --cleanDestinationDir`でおｋ

# How to
ほぼほぼTL;DRで終わっちゃってますが、個人的にTL;DRがある記事のほうが手っ取り早く答えを見つけられると思っているので記載してます。  
ググってもあんまり情報がなかったので、こういうときはとりあえず、helpを見ようということで見たら乗ってました✌️  
以下が`hugo server -h`の内容です（Version : Hugo Static Site Generator v0.58.3）。該当箇所は一応矢印で強調してます。

```bash
Hugo provides its own webserver which builds and serves the site.
While hugo server is high performance, it is a webserver with limited options.
Many run it in production, but the standard behavior is for people to use it
in development and use a more full featured server such as Nginx or Caddy.

'hugo server' will avoid writing the rendered and served content to disk,
preferring to store it in memory.

By default hugo will also watch your files for any changes you make and
automatically rebuild the site. It will then live reload any open browser pages
and push the latest content to them. As most Hugo sites are built in a fraction
of a second, you will be able to save and see your changes nearly instantly.

Usage:
  hugo server [flags]

Aliases:
  server, serve

Flags:
      --appendPort             append port to baseURL (default true)
  -b, --baseURL string         hostname (and path) to the root, e.g. http://spf13.com/
      --bind string            interface to which the server will bind (default "127.0.0.1")
  -D, --buildDrafts            include content marked as draft
  -E, --buildExpired           include expired content
  -F, --buildFuture            include content with publishdate in the future
      --cacheDir string        filesystem path to cache directory. Defaults: $TMPDIR/hugo_cache/
# ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
      --cleanDestinationDir    remove files from destination not found in static directories
# ⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️
  -c, --contentDir string      filesystem path to content directory
  -d, --destination string     filesystem path to write files to
      --disableBrowserError    do not show build errors in the browser
      --disableFastRender      enables full re-renders on changes
      --disableKinds strings   disable different kind of pages (home, RSS etc.)
      --disableLiveReload      watch without enabling live browser reload on rebuild
      --enableGitInfo          add Git revision, date and author info to the pages
      --forceSyncStatic        copy all files when static is changed.
      --gc                     enable to run some cleanup tasks (remove unused cache files) after
 the build
  -h, --help                   help for server
      --i18n-warnings          print missing translations
      --ignoreCache            ignores the cache directory
  -l, --layoutDir string       filesystem path to layout directory
      --liveReloadPort int     port for live reloading (i.e. 443 in HTTPS proxy situations) (defa
ult -1)
      --meminterval string     interval to poll memory usage (requires --memstats), valid time un
its are "ns", "us" (or "µs"), "ms", "s", "m", "h". (default "100ms")
      --memstats string        log memory usage to this file
      --minify                 minify any supported output format (HTML, XML etc.)
      --navigateToChanged      navigate to changed content file on live browser reload
      --noChmod                don't sync permission mode of files
      --noHTTPCache            prevent HTTP caching
      --noTimes                don't sync modification time of files
      --path-warnings          print warnings on duplicate target paths etc.
  -p, --port int               port on which the server will listen (default 1313)
      --renderToDisk           render to Destination path (default is render to memory & serve from there)
      --templateMetrics        display metrics about template executions
      --templateMetricsHints   calculate some improvement hints when combined with --templateMetrics
  -t, --theme strings          themes to use (located in /themes/THEMENAME/)
      --trace file             write trace to file (not useful in general)
  -w, --watch                  watch filesystem for changes and recreate as needed (default true)

Global Flags:
      --config string        config file (default is path/config.yaml|json|toml)
      --configDir string     config dir (default "config")
      --debug                debug output
  -e, --environment string   build environment
      --ignoreVendor         ignores any _vendor directory
      --log                  enable Logging
      --logFile string       log File path (if set, logging enabled automatically)
      --quiet                build in quiet mode
  -s, --source string        filesystem path to read files relative from
      --themesDir string     filesystem path to themes directory
  -v, --verbose              verbose output
      --verboseLog           verbose logging
```

一応該当箇所の日本語訳も書いておくと、  
「スタティックなディレクトリにはないやつを出力先フォルダから消すでー」  
といった感じです。そのまんまですね。

# さいごに
ちゃんと、公式の、ドキュメントは、読もう📔

# 参考
- helpコマンド
- [公式](https://gohugo.io/commands/hugo_server/)