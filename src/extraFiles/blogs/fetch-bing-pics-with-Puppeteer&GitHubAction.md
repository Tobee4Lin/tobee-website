### 前言
众所周知，[Bing搜索](https://cn.bing.com/)每天都会有不同的精美壁纸，因此产生了将壁纸抓取下来，后续可以放在博客中展示的想法。大致流程则是通过**Puppeteer**对壁纸地址进行爬取，并写入文件中，最后配置**Github Action**实现自动化抓取。

过程中使用到的技术如下：

*– Github Action
– Nodejs
– Puppeteer+Chromium*

### 内容获取
**[Puppeteer](https://pptr.dev/)** 是一个针对Chromium API进行封装的Node包，可以模拟对网页的各种操作。
首先使用```puppeteer.launch```方法创建一个浏览器示例，再用```browser.newPage```创建页面示例，Puppeteer中的所有操作都是异步的，因此每一步都需要使用await进行。
接下来进行响应拦截操作，在这步骤中获取我们想要的接口内容。

```javascript
const getResponseData = new Promise((resolve) => {
  async function get(res) {
    if (res.url().includes("/model") && res.status() === 200) {
      page.removeListener("response", get);
      resolve(await res.text());
    }
  }
  page.on("response", get); // 在此处进行响应监听
});
```
最开始用的是```page.waitForResponse```这个API，但是发现当网络请求返回太快时，用 ```page.waitForResponse()```来等待会不稳定或者会来不及拦截，所以使用 ```page.on('response')```来监听最可靠。
接着就是在接口返回的内容中获取我们想要的内容进行拼接，并放入我们自己的文件中。
```javascript
//写入文件路径
const WRITE_FILE_PATH = "src/assets/json/picsUrlList.json";
// 先读取原有文件内容，与新图片路径信息拼接后再写入文件
const readAndwriteInfoToFile = (fileInfo) => {
    let writeData = "";
    try {
      const readStream = fs.createReadStream(WRITE_FILE_PATH);
      readStream.on("data", (chunk) => {
        writeData += chunk.toString();
      });
      readStream.on("end", () => {
        const writerStream = fs.createWriteStream(WRITE_FILE_PATH);
        const data = writeData ? JSON.parse(writeData) : [];
        data.push(fileInfo);
        writerStream.write(JSON.stringify(data, undefined, 2), "UTF8");
        writerStream.end();
      });
      readStream.on("error", (err) => {
        console.error("读取文件内容失败：", err);
      });
    } catch (error) {
      console.error("写入文件错误：", error);
    }
};
```
在该过程中，先读取文件中原有的内容流，然后再将新的内容拼接进去，再覆盖到文件中。
以上这个脚本就是一个一次性脚本，实现了一次对目标网站的地址打开，并抓取壁纸地址之后存放到项目中。

### 自动化
脚本已经实现完成了，下一步就需要一个定期执行这个脚本的方式，而免费的Github Action更是首选，主要是因为：
- Github 服务器都在国外，其下载Node依赖包会非常快。
- 配置简单，有完善的机制

[Github Action文档地址](https://docs.github.com/cn/actions/using-workflows)，
推荐文章 [还不会用 GitHub Actions ？看看这篇](https://github.com/mqyqingfeng/Blog/issues/237)

首先进行actions的创建，首先在仓库中找到Actions项，

![选中Action](https://s1.xptou.com/2022/09/06/6316a36685f19.jpg)

接着选择Node.js的配置项，点击配置按钮，

![选中node配置项](https://s1.xptou.com/2022/09/06/6316a3dbddd67.jpg)

最后更改yml文件名（可改可不改），actions工作流的配置也很方便，大致的想法就是在每天的某个时间进行脚本的执行，将爬取到的内容定时存放到文件中即可，根据这个思路，可以配置yml文件如下，将yml文件中的内容替换为如下内容即可，

![配置界面](https://s1.xptou.com/2022/09/06/6316a3fc55ce3.jpg)

```yml
name: get bing pictures CI

on:
  #当位于main分支且push了src文件夹下js文件时，才会触发工作流程
  push:
    branches:
      - "main"
    paths:
      - "src/**.js"
  schedule:
    - cron: "0 20 * * *" #国际标准时间，北京时间+8，即上午4点钟

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x, 16.x]

    steps:
      - uses: actions/checkout@v3

      # 缓存安装的node modules 这里使用的是github action中关于node modules方式
      - name: Cache node modules
        uses: actions/cache@v3
        env:
          cache-name: cache-node-modules
        with:
          # npm cache files are stored in `~/.npm` on Linux/macOS
          path: ~/.npm
          key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-build-${{ env.cache-name }}-
            ${{ runner.os }}-build-
            ${{ runner.os }}-
      # 安装node依赖
      - name: Install Dependencies
        run: npm install

      # 执行具体脚本
      - name: Run script
        run: node src/puppeteerGetBingPics.js

        # 将新的bing图片路径文件用git提交到仓库中
      - name: Push snapshot
        run: |
          git config --global user.name 'Tobee4Lin'
          git config --global user.email '1114656879@qq.com'
          git add src/assets/json/
          git commit -am "fetch new picture info"
          git push
```

可以看到，右边有一个类似“actions市场”的列表框，可以在其中选择你想要的action，可以快速便捷创建别人已经开源的action而不用自己配置工作流。

### 总结
Puppeteer是一个非常不错的包，优点是可以用它实现程序对浏览器的操作，用于截图、一些固定顺序类操作，可以直接用程序去模拟完成，但它的缺点就是每次浏览其实都是需要将页面所有资源都载入完成，对于做爬虫类等要求速度的程序，则有些太慢了。
Github Action 是一个不错的CD/CI工具，也让更多的仓库从 Travis CI 迁移改为 Github Action，而且语法也简单，是个不错的选择。

本文所有相关代码已经发在[github](https://github.com/Tobee4Lin/tobee-website/blob/main/src/puppeteerGetBingPics.js)上。