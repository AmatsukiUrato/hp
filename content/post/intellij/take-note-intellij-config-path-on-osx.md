---
title: 'OSX上にインストールしたIntelliJのconfigファイル保存場所をメモする'
description: 'mac版intellijのconfigファイル保存場所がどこにあるかをメモりました。'
date: 2020-05-28T02:43:26+09:00
tags: [intellij, location, setting, memo, mac]
archives: '2020'
author: matsu4ki
draft: false
---

メモ。以下にあります。<br>
windows と違って散らばってるのが少し面倒くさいですね。
また、CommunityEdition と UltimateEdition では微妙に path が違います。
<YYYY>と<M>はそれぞれ、リリース年とリリース月替入ります。

## UltimateEdition Path

| target File |                          path                          |
| :---------: | :----------------------------------------------------: |
|   config    |     `~/Library/Preferences/IntelliJIdea<YYYY>.<M>`     |
|   System    |       `~/Library/Caches/IntelliJIdea<YYYY>.<M>`        |
|   Plugins   | `~/Library/Application Support/IntelliJIdea<YYYY>.<M>` |
|    Logs     |        `~/Library/Logs/IntelliJIdea<YYYY>.<M>`         |

Logs に関して、IntelliJ IDEA 9 以前のものは System location に保存されているみたいです。

## CommunityEdition Path

| target File |                            path                            |
| :---------: | :--------------------------------------------------------: |
|   config    |                             ?                              |
|   System    |       `~/Library/Caches/JetBrains/IdeaIC<YYYY>.<M>`        |
|   Plugins   | `~/Library/Application Support/JetBrains/IdeaIC<YYYY>.<M>` |
|    Logs     |        `~/Library/Logs/JetBrains/IdeaIC<YYYY>.<M>`         |

CE では JetBrains というフォルダを間に噛ますみたいですね。
config だけは表示されませんでした。こっちは Plugin と違って import/export があるので、良いっちゃ良いのですが、少し気持ち悪いですね。

## 参考

- [macos - Where is IntelliJ IDEA config stored in OSX? - Stack Overflow](https://stackoverflow.com/questions/23115091/where-is-intellij-idea-config-stored-in-osx)
  - [Directories used by the IDE to store settings, caches, plugins and logs – IDEs Support (IntelliJ Platform) | JetBrains](https://intellij-support.jetbrains.com/hc/en-us/articles/206544519-Directories-used-by-the-IDE-to-store-settings-caches-plugins-and-logs)
