---
title: "Material-uiのmakestyleにて、複数のクラスを動的に指定する方法"
date: 2019-10-14T15:28:36+09:00
lastmod: 2019-10-14T15:28:36+09:00
tags: [React, Front, CSS]
draft: false
---
## TL;DR
1. classデータをstring配列として持つ
2. `配列.join(' ')`を該当の`className={}`の中に記述する

## 概要
最近、Reactについての勉強を行っていたところ、`class`の指定に手間取ってしまったのでメモ。
方法としては、探したところ、以下2つがあるみたい。
1. class名の配列を作成して、最後にjoinで配列の間に` `を入れて出力
2. `className`の中で、２つのclass名を呼び出す。

面倒くさいのでソースベタ貼りしてます。  
`Box`は`Material-ui`のUtil-componentです。

## 方法1
```js
    return (
        <Box display="flex" alignItems="center" justifyContent="center"
            className={classes.block}>
            {(() => {
                const discClass: string[] = [classes.disc];

                if (props.discStatus === DiscStatus.White) {
                    discClass.push(classes.discWhite);
                } else if (props.discStatus === DiscStatus.Black) {
                    discClass.push(classes.discBlack);
                }
                return <Box component="div" 
                            onClick={handleOnClickDisc} 
                            className={discClass.join(' ')}></Box>
            })()}
        </Box>
    );
```

## 方法2
```js
    return (
        <Box display="flex" alignItems="center" justifyContent="center"
            className={classes.block}>
            {(() => {
                if (props.discStatus === DiscStatus.White) {
                    return <Box component="div"
                        className={`${classes.disc} ${classes.discWhite}`}></Box>
                } else if (props.discStatus === DiscStatus.Black) {
                    return <Box component="div"
                        className={`${classes.disc} ${classes.discBlack}`}></Box>
                } else if (props.discStatus === DiscStatus.Empty) {
                    return <Box component="div"
                        className={classes.disc}></Box>
                }
            })()}
        </Box>
    );
```