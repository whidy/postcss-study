# PostCSS学习指南（一）

> ##### 关于本次学习的目标
>
> 任务描述：
>
> PostCSS一个后处理器，相比预处理器，它更轻量，更快速，很值得去学习的一个技术。
>
> 完成标准：
>
> 1. 对比预处理器（less/stylus/sass任选其一），讲述一下它们之前的区别。
> 2. 新手起步，安装，及各种常用插件的使用。
> 3. 结合自动化工具（webpack/rollup/gulp任选其二），在项目中实战应用。
> 4. 以书面形式作报告，（公开演讲而外加分）



## PostCSS介绍

[PostCSS](https://github.com/postcss/postcss)是一个利用JS插件来对CSS进行转换的工具，这些插件非常强大，强大到无所不能。其中，[Autoprefixer](https://github.com/postcss/autoprefixer)就是众多PostCSS插件中最流行的一个。

截至目前（2017年7月）PostCSS已经有**超过200**个插件，你可以[插件列表](https://github.com/postcss/postcss/blob/master/docs/plugins.md)查找有没有你所需要的插件。如果你想自己写个插件，据说这是一个不错的主意，而且非常简单，你可以试着[搞点事](https://github.com/postcss/postcss/blob/master/docs/writing-a-plugin.md)。

看到这里，你可能没有发现它的强大之处，甚至我自己都没有被我翻译的这段官方文字所打动。~~因为没(wǒ)有(yě)对(bù)比(tài)就(huì)没(yòng)有(zhè)伤(wán)害(yì)。~~好了，是时候启动装逼模式了。

维基百科，阿里巴巴，谷歌，Wordpress，Twitter等网站均有使用，大佬们都在用你有什么理由不跟上步伐。

再来看看这张PostCSS下载数量的npm-stat统计表：

![PostCSS下载数量](https://github.com/whidy/postcss-study/blob/master/src/images/postcss-00.png?raw=true)

学习PostCSS之前需要了解一些事情：

1. PostCSS插件的处理方式类似那些CSS预处理器，而非预处理器和后处理器（[PostCSS is Not a *Pre-*processor and Not a *Post-*processor either](https://webdesign.tutsplus.com/tutorials/postcss-deep-dive-what-you-need-to-know--cms-24535)）
2. PostCSS is Not “Future Syntax”（不是新式语法？不知道怎么翻译）
3. PostCSS本身并非整理或优化CSS的工具
4. Blablabla...

那么它还有一些特性，例如创建了一个插件功能极强的生态系统，具有模块化需要什么用什么，相比其他的CSS预处理器它的优势主要体现在以下几个方面：

1. 拥有极高的处理性能（[3倍以上的处理速度](https://github.com/postcss/benchmark)）
2. 你既可以写正常的CSS，也可以结合LESS或者SASS一起编写
3. 对Source Map支持更好
4. 他的插件真的太多太强大太便利了

其他对比SASS和LESS的区别在于他们内置了大量的方法，而也许你只需要用到几个变量而已，大材小用。而PostCSS则可制定个人需求的一套解决方案（仅安装需要的插件）。这也就是他高性能的主要原因。几乎SASS和LESS有的功能全都有！

总之好处太多了。这里就不一一列举了。迫不及待的你已经等不及安装使用了吧。

## PostCSS安装及使用

PostCSS一般是结合自动化工具使用，如果要单独使用可以安装[PostCSS CLI](https://github.com/postcss/postcss-cli)，这里我先对PostCSS CLI的安装使用讲解下。Windows下安装（文中操作全部基于WINDOWS环境）：

~~`npm i -g postcss-cli`~~或者`npm i --save-dev postcss-cli`

CLI是否建议全局安装?（这样包括其对应的插件都要全局了？如果不全局就失去了CLI的意义了？）。全局安装完成后，试着输入PostCSS，出现以下结果，说明安装OK

![安装成功](https://github.com/whidy/postcss-study/blob/master/src/images/postcss-01.png?raw=true)

不过我个人习惯仅安装在项目中，于是我没有选择安装CLI，而是直接在项目中安装PostCSS，`npm i --save-dev postcss`，我这里有个[例子](https://github.com/whidy/postcss-study)可以看看

接下来，我们还做不了什么，我们需要安装一些插件配合PostCSS，例如，我现在安装一个autoprefixer

`npm install --save-dev autoprefixer`，并参考例子中的[style01.css](https://github.com/whidy/postcss-study/blob/master/src/style01.css)，我要通过PostCSS对它进行处理。这里两个方法：

1. 通过`cd node_modules/.bin/`进入node_modules/.bin/目录内再执行

   `postcss ../../src/style01.css -o ../../dist/output_style01.css -u autoprefixer`

2. 通过修改package.json中的scripts，增加一条postcss命令

   `"postcss:style01": "postcss ./src/style01.css -o ./dist/output_style01.css -u autoprefixer"`

   然后再回到根目录（postcss-study目录）下执行

   `npm run postcss:style01`

两者效果相同，当然我倾向于后者啦。完成后一条鲜亮的绿色的让人安全感十分强列的提示语出现了*√ Finished ...*前面还有个sweet勾勾，请看编译后的[output_style01.css](https://github.com/whidy/postcss-study/blob/master/dist/output_style01.css)聪明的你一定能举一反三的。做出更多惊奇的事情的~

另外我们可以同样的采用Parser插件来编译样式文件，我的demo里面请参考[style02.sss](https://github.com/whidy/postcss-study/blob/master/src/style02.sss)文件的编译。这里就不多说了。

还有一种预先写好配置文件，这个就稍微先进一些，也不会看起来很乱。我们创建一个**postcss.config.js**文件：

```javascript
module.exports = {
  parser: 'sugarss',
  plugins: [
    require('autoprefixer')
  ]
}
```

不过这种经过我个人测试，仅适用于全局安装了PostCSS-CLI和sugarss的情况下再该配置文件目录下执行`postcss ./src/style02.sss -o ./dist/test.css`命令就好了。这里个人不是很推荐。关于CLI下的一些方法暂时就不多说了，如有错误请各位大佬指正~😂

## PostCSS主要插件说明和介绍

官方对于插件根据用途做了分类，主要有以下几个类别：

解决全局CSS问题

使用未来的CSS语法

编写可读性更好的CSS

用于图片和字体

CSS语法检查

其他

以上内容主要是用来熟悉一下PostCSS的。接下来说点实际的，如何利用PostCSS结合自动化工作在项目中使用。

## PostCSS结合Webpack应用

关于webpack基础配置的相关内容这里就不多说了~前面已有大神写了有兴趣可以[膜拜一下](http://git.oschina.net/janking/Infinite-f2e/issues/IDOHZ)。



## PostCSS结合Gulp应用



## PostCSS学习心得及总结



因为这次学习，纯粹是根据“教科书”来学，来讲解的，因此也就没有什么真正的精髓。我希望以后在项目中尽可能的用好PostCSS，带来一篇简短而有用的文章分享给大家。

> 参考文献汇总：
>
> **[PostCSS Deep Dive](https://webdesign.tutsplus.com/series/postcss-deep-dive--cms-889)**（强烈推荐！我看完了才发现有部分译文：[PostCSS深入学习](http://www.w3cplus.com/PostCSS/postcss-deep-dive-what-you-need-to-know.html)）
>
> [PostCSS深入学习: PostCSS和Sass、Stylus或LESS一起使用](https://www.w3cplus.com/PostCSS/using-postcss-together-with-sass-stylus-or-less.html)
>
> [PostCSS 是个什么鬼东西？](https://segmentfault.com/a/1190000003909268)
>
> [PostCSS一种更优雅、更简单的书写CSS方式](http://www.cnblogs.com/givebest/p/4771154.html)
>
> [PostCSS及其常用插件介绍](http://www.css88.com/archives/7317)
>
> [PostCSS – A Comprehensive Introduction](https://www.smashingmagazine.com/2015/12/introduction-to-postcss/)
>
> [http://www.cnblogs.com/terrylin/p/5229169.html](http://www.cnblogs.com/terrylin/p/5229169.html)
>
> 相当不错的PPT形式
>
> [https://ai.github.io/about-postcss/en/](https://ai.github.io/about-postcss/en/)
>
> postcss的优势
>
> [From Sass to PostCSS](https://pawelgrzybek.com/from-sass-to-postcss/)
>
> [PostCSS – Sass Killer or Preprocessing Pretender?](https://ashleynolan.co.uk/blog/postcss-a-review)