# PostCSS学习指南-插件（二）

继上一次[PostCSS学习指南（一）](http://git.oschina.net/janking/Infinite-f2e/issues/IEFRG)后，渐渐开始在项目中应用。

这次决定主要讲解一些个人认为非常有帮助的PostCSS插件。

> 本期主要介绍以下几个插件和几个坑
>
> 1. [autoprefixer](https://github.com/postcss/autoprefixer)
> 2. [postcss-partial-import](https://github.com/jonathantneal/postcss-partial-import)
> 3. [postcss-advanced-variables](https://github.com/jonathantneal/postcss-advanced-variables)
> 4. [cssnano](http://cssnano.co/)
> 5. [postcss-px2rem](https://github.com/songsiqi/px2rem-postcss)
> 6. [precss](https://github.com/jonathantneal/precss)
> 7. [postcss-nesting](https://github.com/jonathantneal/postcss-nesting)和[postcss-nested](https://github.com/postcss/postcss-nested)
> 8. 坑( ఠൠఠ )ﾉ

### [autoprefixer](https://github.com/postcss/autoprefixer)

这个就不用多说了，必装插件之一。方便的写规范的css，它会为你提供非常[完整的hack兼容方案](https://github.com/postcss/autoprefixer/tree/master/lib/hacks)的。当然这里需要了解一下的是，它的大部分兼容数据来源[Can I Use](http://caniuse.com/)，另外一个稍微需要了解的插件配置参数就是[browsers](https://github.com/postcss/autoprefixer#options)，比如这样写：

```javascript
module.exports = {
  plugins: [
    require('autoprefixer')({ browsers: 'last 2 versions' })
  ]
}
```

关于这个参数的详细介绍可以看看[Browserslist Queries](https://github.com/ai/browserslist#queries)，文中说了，强烈建议将查询写入package.json（后面会告诉你为何要写在这里），而非配置postcss.config.js中autoprefixer的browsers参数。所以此处建议写法如下：

postcss.config.js

```javascript
module.exports = {
  plugins: [
    require('autoprefixer');
  ]
}
```

package.json内增加如下示例

```
"browserslist": [
  "> 1%",
  "last 2 versions"
]
```

这里我对着官方文档简单说一下数组内的值对应的含义：

- `last 2 versions`: 每个浏览器中最新的两个版本。
- `> 5%` or `>= 5%`: 全球浏览器使用率大于5%或大于等于5%（上例中则是1%）。

其他的一些参数简单介绍：

- `ie 6-8`: 选择包含ie6-8的版本。
- `Firefox > 20`: 火狐版本号大于20。

还有很多不一一列举，这里的配置还是很详细的，一般来说最省事的就是不加参数，按照默认即可。

需要配置的话，就在package.json里面添加`browserslist`参数，这样其他插件也能够从中获取到项目将要兼容的版本，目前包含以下几个插件会读取改配置：

- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [babel-preset-env](https://github.com/babel/babel-preset-env) (no config support, only tool option)
- [eslint-plugin-compat](https://github.com/amilajack/eslint-plugin-compat)
- [stylelint-no-unsupported-browser-features](https://github.com/ismay/stylelint-no-unsupported-browser-features)
- [postcss-normalize](https://github.com/jonathantneal/postcss-normalize)

关于autoprefixer的介绍差不多就这些了~

### [postcss-partial-import](https://github.com/jonathantneal/postcss-partial-import)

这个没啥好说的，也是很容易理解的插件，就是让你的css文件支持`@import`，支持W3C的写法也支持SASS那种写法，这里就不多说啦。

### [postcss-advanced-variables](https://github.com/jonathantneal/postcss-advanced-variables)

同样的，像SASS那样可以自定义变量并进行引用，用法也十分简单，相信大家一定不用点开[官方文档](https://github.com/jonathantneal/postcss-advanced-variables)也会用的~（你肯定还是点开了哈哈哈~你这叫胡开链接综合症，生怕错过了啥内容。）

### [cssnano](http://cssnano.co/)

很显然这个插件作者比较高调，[github的cssnano](https://github.com/ben-eb/cssnano)上面是没有什么说明和介绍的，当然官方也写得很详细了。这个插件通俗来讲，就是css代码压缩工具，他的配置建议采用[默认配置](http://cssnano.co/guides/presets/)，除非你知道你在做什么。

当然我在测试使用中遇到了一点点问题，关于cssnano和autoprefixer结合使用，或者说是postcss.config.js插件引入顺序有关的造成输出不同的问题？我暂时还在研究，先看代码：

testcssnano.css

```css
.test {
  -moz-border-radius: 10px;
  border-radius: 10px;
  display: flex;
}
```

postcss.config.js（第一种）

```javascript
module.exports = {
  plugins: [
    require('cssnano')({
      preset: 'default',
    }),
    require('autoprefixer')
  ]
}
```

输出结果：

```css
.test{border-radius:10px;display:flex}
```

postcss.config.js（第二种）

```javascript
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    })
  ]
}
```

输出结果：

```css
.test{border-radius:10px;display:-webkit-box;display:-ms-flexbox;display:flex}
```

问题一，如果手写`-moz-`，cssnano会清除，可见[示例](http://cssnano.co/optimisations/autoprefixer/)，当然或许这个属性在火狐已经支持不需前缀所以，就被去掉了。

问题二，如果在配置文件中，cssnano在autoprefixer之前引用，假设根据webpack的loader执行顺序规则相同的话，大概postcss.config.js中的插件也是这样由下而上依次执行，因此，在第一种例子中，css代码先被autoprefixer处理，然后再执行cssnano清除了那些多余的前缀代码？大致可分解为：

第一步autoprefixer处理结果：

```css
.test {
  -moz-border-radius: 10px;
  border-radius: 10px;
  display: flex;
  display: -webkit-box;
  display: -ms-flexbox;
}
```

第二步cssnano处理结果：

```css
.test{border-radius:10px;display:flex}
```

**可是我要遗憾的告诉大家。。。这个可能是错误的结论！！！**

因为我将第一步的结果作为初始css，将postcss.config.js中仅引用一个cssnano插件来执行的结果如下：

```css
.test{border-radius:10px;display:flex;display:-webkit-box;display:-ms-flexbox}
```

因此，这个问题就来了。。。cssnano确实将`-moz-`去掉，但是他并没有处理其他的关于display的兼容代码。

于是我再做了一个测试：

我将css代码改为：

```css
.test {
  -webkit-transform: scale(.5) translate(10, 20);
  -moz-transform: scale(.5) translate(10, 20);
  -ms-transform: scale(.5) translate(10, 20);
  -o-transform: scale(.5) translate(10, 20);
  transform: scale(.5) translate(10, 20);
}
```

而postcss.config.js还是同时引入cssnano和autoprefixer，经过测试，无论谁先谁后输出结果均为：

```css
.test{-webkit-transform:scale(.5) translate(10,20);transform:scale(.5) translate(10,20)}
```

如果css代码改为：

```css
.test {
  transform: scale(.5) translate(10, 20);
}
```

postcss.config.js同时引入cssnano和autoprefixer，

第一种cssnano在前结果：

```
.test{transform:scale(.5) translate(10,20)}
```

第二种autoprefixer在前结果：

```css
.test{-webkit-transform:scale(.5) translate(10,20);transform:scale(.5) translate(10,20)}
```

结果又不一样，不知道看到这里大家晕了没有。

**根据观察，postcss.config.js的插件执行顺序是有要求的，至少在同时使用cssnano和autoprefixer的时候，cssnano一定要在autoprefixer之后，否则autoprefixer可能会失效！**

另外cssnano和autoprefixer都会对很旧的兼容写法进行精简，例如上文有一段有很多个transform属性的css代码，autoprefixer会（根据browserslist）剔除其他的。

至于顺序问题，我后面继续进行研究！

### [postcss-px2rem](https://github.com/songsiqi/px2rem-postcss)

做移动端，适配是个头疼的问题，不过我目前还是使用想对稳定的方案[flexible](https://github.com/huainanhai/flexible)，那么就需要用rem来做主要的单位，这里不说适配问题只说这个插件，一般移动端，设计师给的设计稿都是750px宽，你只需要下面这样设置，就可以直接在代码里面写你在PSD量的像素值了，这真是太令人激动了！

```javascript
require('postcss-px2rem')({
  remUnit: 75,
  threeVersion: true
})
```

因为这个postcss-px2rem又是来源于[px2rem](https://github.com/songsiqi/px2rem)的，所以详细的说明见[px2rem](https://github.com/songsiqi/px2rem#cli-tool)，我这里写了两个参数，一个remUnit，这个对应的是每rem对应的px值，既然750px，就写75啦，不知道这样理解对不对。另一个threeVersion则对应三个不同dpr下的大小，这个比较少用，需要注意的是处理这些参数，是否转换rem都和注释有关，这里就不细说了，看看文档就好~当然这里也埋下一个坑，等下会提到。

### [precss](https://github.com/jonathantneal/precss)

这就是个大杂烩，主要是为了满足SASS开发者的习惯，继承了很多插件，本篇前后文都有提及precss内的部分插件，如果并不是全部用到，我建议还是一个个手动安装所需插件来进行配置，这东西，配好了以后也就不会经常改动了，而且个人认为用大杂烩很容易出现一些坑，又很难排查，例如下面两个插件，大家仔细看看。

另外还有几个插件，建议安装（当然如果你完全不知道干啥的可以忽略）：

1. [postcss-mixins](https://github.com/postcss/postcss-mixins) 一个和SASS的mixins用法相同的插件
2. [postcss-atroot](https://github.com/OEvgeny/postcss-atroot) 让你的嵌套css处于根部，官方有个bar.css的@import的例子很棒，可以看看举一反三
3. [postcss-extend](https://github.com/travco/postcss-extend) 有相同结构却有那么一点点不同的区别，用这个可以方便的统一管理相同部分样式代码

其他的一些我个人觉得不常用或者说实用意义不大所以就没有写出来了。

### [postcss-nesting](https://github.com/jonathantneal/postcss-nesting)和[postcss-nested](https://github.com/postcss/postcss-nested)

这两个也是从precss里面拿出来的，就是仿SASS的嵌套css写法用。为啥把这两个放一起写，因为他们长的太像了。只看名字鬼知道他们的区别，然而他们都被加入到precss里面去了。据precss介绍，他们两个的区别是：

- [postcss-nesting](https://github.com/jonathantneal/postcss-nesting): W3C nested selectors
- [postcss-nested](https://github.com/postcss/postcss-nested): Sass-like nested selectors

光看这两行我是看不懂到底是个啥玩意，难道第一个是符合W3C规范的嵌套选择？粗略看了下两个插件的说明文档，没看出没啥区别。行，那手动写代码来一个个试试。先安装[postcss-nesting](https://github.com/jonathantneal/postcss-nesting)，编译试试，哗嚓一片红。。。咋回事，我们先看看代码片段。

```scss
.catis-list {
  padding: 0 50px;
  overflow: hidden;
  li {
    list-style: none;
    float: left;
    margin-top: 38px;
    width: 113px;
    &:not(:nth-child(4n)) {
      margin-right: 66px;
    }
    .iconfont {
      font-size: 100px;
      line-height: 100px;
      color: #506071;
      display: block;
      text-align: center;
    }
    .cati-name {
      font-size: 28px;
      line-height: 40px;
      display: block;
      color: #999;
      text-align: center;
    }
  }
}
```

看似SASS写法没有任何问题。可是它提示的报错信息让人看不大懂

```javascript
ERROR in ./src/style/index.css
Module build failed: ModuleBuildError: Module build failed: Error: undefined:783:6: property missing ':'
    at error (D:\webProjects\mobileweb\node_modules\css\lib\parse\index.js:62:15)
    at declaration (D:\webProjects\mobileweb\node_modules\css\lib\parse\index.js:223:33)
    at declarations (D:\webProjects\mobileweb\node_modules\css\lib\parse\index.js:252:19)
```

啥玩意missing了个冒号嘛。。。改来改去都不对。索性拿来官方的实例。才看清楚。原来每个嵌套的样式前面都需要一个`&`（注意符号后面有个空格），实际上应该如下才对：

```
.catis-list {
  padding: 0 50px;
  overflow: hidden;
  & li {
    list-style: none;
    float: left;
    margin-top: 38px;
    width: 113px;
    &:not(:nth-child(4n)) {
      margin-right: 66px;
    }
    & .iconfont {
      font-size: 100px;
      line-height: 100px;
      color: #506071;
      display: block;
      text-align: center;
    }
    & .cati-name {
      font-size: 28px;
      line-height: 40px;
      display: block;
      color: #999;
      text-align: center;
    }
  }
}
```

这里面有一段用到伪类其中&符号后面是没有空格的，是正确的。编译后的结果：

```css
.catis-list {
  padding: 0 0.666667rem;
  overflow: hidden;
}

.catis-list li {
  list-style: none;
  float: left;
  margin-top: 0.506667rem;
  width: 1.506667rem;
}

.catis-list li:not(:nth-child(4n)) {
  margin-right: 0.88rem;
}

.catis-list li .iconfont {
  font-size: 1.333333rem;
  line-height: 1.333333rem;
  color: #506071;
  display: block;
  text-align: center;
}

.catis-list li .cati-name {
  font-size: 0.373333rem;
  line-height: 0.533333rem;
  display: block;
  color: #999;
  text-align: center;
}
```

那么这样就没有问题了。和官方的说明的是一样的，但是另一方面，如果每次都要写&加空格，那岂不是很麻烦，习惯写SASS的兄弟们肯定不愿意这样做啦。

那么我要说的就是另一个插件[postcss-nested](https://github.com/postcss/postcss-nested)，如precss所述，这个的确是SASS-LIKE了。当然我暂时还不太明白为何precss要收入两个nest插件（为了满足不同开发人员的习惯？）。我们修改postcss.config.js使用postcss-nested，并重新修改样式代码之前第一段，再次编译执行，一切OK，那么**结论就是，如果仅习惯于SASS的嵌套写法，安装postcss-nested插件即可~**

### 坑( ఠൠఠ )ﾉ

1. 最后来说说我遇到的坑，除了刚才说的cssnano和autoprefixer同时使用需要注意顺序问题。还有另一个顺序研究，就是确定好将要使用的插件后，在postcss.config.js中配置插件require顺序还是有讲究的，这里我个人观察的确还是**从上往下**的（至于是不是每个插件轮流处理完文件后挨个执行我尚不确定），比如说，`postcss-partial-import`这个理应是第一个引入的，你若是把它放在最后面，而css代码中第一行就用了`@import`那肯定会报错！所以，建议根据css代码的写法来决定你的执行顺序。

2. postcss-nested插件是大部分SASS开发者所喜爱的，但是你在css文件中用sass写法会遇到以下几个问题：

   1. csslint，css文件不支持嵌套，变量等写法，如果你将文件模式改为sass，注释的方式会变成`//`，而非`/* comments */`，当然你可以手写`/* ... */`这样的注释，但是用快捷键进行注释会很痛苦。

      这里有个小技巧，让项目所有css文件均为sass模式下编辑，在项目settings.json添加：

      ```
      "files.associations": {
        "*.css": "scss"
      }
      ```

      当然你若是想要支持`//`注释也是可以的，请再安装[postcss-scss](https://github.com/postcss/postcss-scss)插件，我这里不多说这个了，因为我已经决定手写注释了😭

   2. 你手写注释没有问题，然而编译出来的东西会出问题，你样式中最后一行如果将注释写在花括号内部，它转换出来的代码，注释会在外部，这是个大坑，因为在使用postcss-px2rem的时候，那注释来控制是否转换的功能就失效了。我文字描述可能让人迷糊，所以看看代码：

      例如CSS部分代码：

      ```scss
      .test {
        color:#999;
        border:1px solid #ddd; /* no */
        .inner {
          color:#333;
        }
      }
      ```

      转换后：

      ```css
      .test {
        color:#999;
        border:0.13333rem solid #ddd;
      }
      /* no */
      .test .inner {
        color:#333;
      }
      ```

      而不是我想要的：

      ```css
      .test {
        color:#999;
        border:1px solid #ddd;
      }
      .test .inner {
        color:#333;
      }
      ```

      理论上是应该输出我想要的结果，却没有输出正确，错误的将1px的border转成rem，原因就是先执行的postcss-nested将注释弄在外部后，postcss-px2rem无法识别到它的规则了。

      我一开始也是装了precss后发现该问题，后来查了很久才发现是这个插件的问题。同时也发现了这个人其实已经提过issue了[Wrong location of comment of the last declaration in a nested rule definition](https://github.com/jonathantneal/precss/issues/53)只是没人解决。

      而我临时处理的方法就是只好将要注释的那段代码不要写在最后一行了。如下：

      ```scss
      .test {
        border:1px solid #ddd; /* no */
        color:#999;
        .inner {
          color:#333;
        }
      }
      ```

      可能有时候并不会有两个样式给border垫底，如果只有一行border的样式，就只能这样：

      ```scss
      .test {
        .inner {
          color:#333;
        }
        border:1px solid #ddd; /* no */
      }
      ```

      这样倒是可以了，不过看起来很奇怪，所以如果你使用和我相同的处理方式时，务必注意此点（写完本文时我似乎发现了更好的解决方案，等确认了没有问题后，放在下一期来写~）。

（我记得好像还有坑的，硬是想了半天想不起来了。。。那就先这样吧）

### 本期结语

最后如果你还想探索更多好玩的好用的插件，你可以看看这里[PostCSS Plugins List](https://github.com/postcss/postcss/blob/master/docs/plugins.md)还有这个可以搜索的[分类插件列表](https://www.postcss.parts/)，如果你发现了更棒的插件，也欢迎留言喔~
另外上面的例子如果我没有写的很明白，或者你只是想直接拿来快速测试使用的话，可以看看这个[mobileweb](https://github.com/whidy/mobileweb)

（关于第三期PostCSS的内容还在考虑。。。可能是对第二期的补充和填坑~敬请期待🙃）