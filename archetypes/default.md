---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
lastmod: {{ .Date }}
archives: "{{ dateFormat "2006" now }}"
author: Amatsuki
draft: false
---
