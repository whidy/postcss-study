打开终端


npm install


npm run start

研究一下postcss

# PostCSS学习指南

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

截至目前（2017年7月）PostCSS已经有超过200个插件，你可以[插件列表](https://github.com/postcss/postcss/blob/master/docs/plugins.md)查找有没有你所需要的插件。如果你想自己写个插件，据说这是一个不错的主意，而且非常简单，你可以试着[搞点事](https://github.com/postcss/postcss/blob/master/docs/writing-a-plugin.md)。

看到这里，你可能没有发现它的强大之处，甚至我自己都没有被我翻译的这段官方文字所打动。~~因为没(wǒ)有(yě)对(bù)比(tài)就(huì)没(yòng)有(zhè)伤(wán)害(yì)。~~好了，是时候启动装逼模式了。

维基百科，阿里巴巴，谷歌，Wordpress，Twitter等网站均在使用，大佬们都在用你有什么理由不跟上步伐。





赶紧对比一下其他CSS预处理器，看看PostCSS究竟有何牛逼之处吧~

## PostCSS安装及使用

PostCSS一般是结合自动化工具使用，如果要单独使用可以安装[PostCSS CLI](https://github.com/postcss/postcss-cli)，这里我先对PostCSS CLI的安装使用讲解下。Windows下安装（文中操作全部基于WINDOWS环境）：

`npm i -g postcss-cli`

我试过，安装到项目内依赖貌似行不通，只能全局安装。安装完成后，试着输入PostCSS，出现以下结果，说明安装OK

![安装成功](https://github.com/whidy/postcss-study/blob/master/src/images/postcss-01.png?raw=true)



## PostCSS结合Webpack应用



## PostCSS结合Gulp应用



## PostCSS学习心得及总结



> 参考文献汇总：
>
> 关于POSTCSS
>
> [Using PostCSS Together with Sass, Stylus, or LESS](https://webdesign.tutsplus.com/tutorials/using-postcss-together-with-sass-stylus-or-less--cms-24591)
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
> [How postCSS is better than SASS and LESS](https://codingsec.net/2016/09/postcss-better-sass-less/)
>
> [From Sass to PostCSS](https://pawelgrzybek.com/from-sass-to-postcss/)
>
> [PostCSS – Sass Killer or Preprocessing Pretender?](https://ashleynolan.co.uk/blog/postcss-a-review)