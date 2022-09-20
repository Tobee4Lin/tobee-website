### 以发布公司uniapp微信小程序脚手架为例(seer-uni-cli)

由于在公司负责了几个小程序的开发工作，发现公司小程序项目大部分公共代码可以复用，每次搭建项目花时间太多在搬运代码上，故在uniapp基础上搭建该脚手架，放入基本的代码模板以便之后开发新的小程序可以直接复用（当然关于请求封装等功能是基于公司后端而适配）。

搭建流程大致分两个方向，一是代码层面和功能逻辑的封装，另一个是发布并提供下载的功能。

---

#### 1. 代码层面和功能逻辑封装

```
// 此处进行业务相关代码逻辑封装
```

---

#### 2. 发布并提供下载

npm发布流程具体如下：

1. 首先注册一个npm账号；
2. 接着将已写好的代码文件放到git服务器上，可以放在自己的github上，也可以协商放在公司的gitlab上，以供其他同事使用；
3. 在已有的代码目录中，执行**npm init**命令，使其生成package.json文件，并在其中链接到git地址；
4. 接着需要在package.json文件中加入如下代码：
```
"bin": {
    "seer-uni-cli": "index.js"
}
// bin字段用于让用户在安装完cli之后，可以执行“seer-uni-cli”命令。
```
5. 项目根目录新建index.js文件，加入如下代码：**（旧）**
```
#!/usr/bin/env node
// 这种用法是为了防止操作系统用户没有将node装在默认的/usr/bin路径里。当系统看到这一行的时候，
// 首先会到env设置里查找node的安装路径，再调用对应路径下的解释器程序完成操作。

const program = require('commander');
let process1 = require('child_process');
//version 版本号
//name 新项目名称
program.version('1.0.3', '-v, --version')
	.command('init <name>')
	.action((name) => {
		console.log('clone template ...');
		process1.exec('git clone https://github.com/Tobee4Lin/seer-uni-cli.git ' + name, function(error, stdout, stderr) {
			if (error !== null) {
				console.log('exec error: ' + error);
				return;
			}
			console.log(stdout);
			console.log('clone success');
		});
	});
program.parse(process.argv);
```
此处child_process用于执行命令行，commander用于注册命令

**（新）**
```
#!/usr/bin/env node

const program = require("commander");
const download = require("download-git-repo");
const inquirer = require("inquirer");
const fs = require("fs");
const ora = require("ora");
const chalk = require("chalk");
const symbols = require("log-symbols");

const promptList = [
	{
		type: "list",
		message: "请选择分支:(master分支为基础分支，boost-isp-common为智慧监管公共内容增强集合分支)",
		name: "branch",
		choices: [
			"master",
			"boost-isp-common"
		]
	},
];

program.version("1.0.8", "-v, --version")
	.command("init <name>")
	.action((name) => {
		if (fs.existsSync(name)) {
			// 错误提示项目已存在，避免覆盖原有项目
			console.log(symbols.error, chalk.red("项目已存在"));
			return;
		}
		inquirer
			.prompt(promptList)
			.then(answers => {
				const spinner = ora("正在下载" + answers.branch + "分支模板...");
				spinner.start();
				download(
					"https://github.com:XXXX(your name)/XXXX(your repo)#" + answers.branch,
					name, {
						clone: true
					},
					err => {
						console.log(err)
						if (!err) {
							spinner.succeed();
							console.log(symbols.success, chalk.green("项目初始化完成"));
						} else {
							spinner.fail();
							console.log(symbols.error, chalk.red(`拉取远程仓库失败${err}`));
						}
					}
				);
			});
	});
program.parse(process.argv);
```
6. 将包发布到npm上

> npm登录命令：npm login <br>
> npm发布命令：npm publish --registry=https://registry.npmjs.org/

该命令指定了发布的地址，不然会直接发布到cnpm上，导致在npm官网个人中心中查看不到。

**npm更新包**需要手动修改package.json中的版本号，同时为了让获取版本的命令有效（```npx seer-uni-cli -v```），需要在index.js入口文件中手动修改版本号。

7. 最后即可直接进行安装和创建新项目了

> 全局安装脚手架：npm install seer-uni-cli -g

> 根据脚手架创建项目：npm seer-uni-cli init my-project


#### 命令行工具Ora
```
const ora = require("ora");
const spinner = ora("加载中...").start();
setTimeout(() => {
    spinner.text = "加载成功";
    spinner.succeed();
}, 1000);
```
> Ora在window上不支持unicode，所以只能看到最基础的加载动画