const puppeteer = require("puppeteer");
const fs = require("fs");

//bing地址
const SITE_URL = "https://cn.bing.com/";
//bing地址前缀
// const _perfix = "https://cn.bing.com";
//写入文件路径
const WRITE_FILE_PATH = "src/assets/json/picsUrlList.json";

(async () => {
  //创建一个Browser浏览器实例，并设置相关参数
  const browser = await puppeteer
    .launch({
      headless: true,
      defaultViewport: null,
      args: ["--start-maximized"],
      ignoreDefaultArgs: ["--enable-automation"],
    })
    .catch(() => browser.close);
  //创建一个Page实例
  const page = await browser.newPage();
  await page.keyboard.press("F12");

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

  //监听请求返回，获取图片相关接口的返回内容
  try {
    // const finalResponse = await page.waitForResponse(
    //   async (response) => {
    //     return (await response.url()).includes("/model");
    //   },
    //   { timeout: 6 }
    // );
    // return finalResponse.ok();
    // console.log(JSON.stringify(response, null, 4));

    // 当网络请求返回太快时，用 page.waitForResponse() 来等待会不稳定或者会来不及拦截，所以使用 page.on('response') 来监听最可靠
    const getResponseData = new Promise((resolve) => {
      async function get(res) {
        if (res.url().includes("/model") && res.status() === 200) {
          page.removeListener("response", get);
          resolve(await res.text());
        }
      }
      page.on("response", get);
    });
    await page.goto(SITE_URL, {
      waitUntil: "networkidle2",
    });
    const response = await Promise.race([
      page.waitForTimeout(6000),
      getResponseData,
    ]);

    const responseContent = JSON.parse(response);
    //仅获取当天壁纸
    const currentDayImage = responseContent.MediaContents[0];
    const currentDayImageInfo = {
      fullDateString: currentDayImage.FullDateString,
      title: currentDayImage.ImageContent.Title,
      description: currentDayImage.ImageContent.Description,
      downloadable: currentDayImage.ImageContent?.Image?.Downloadable,
      //   url: _perfix + currentDayImage.ImageContent?.Image?.Url,
      url: currentDayImage.ImageContent?.Image?.Url,
    };
    readAndwriteInfoToFile(currentDayImageInfo);
  } catch (error) {
    console.error("解析图片字段失败：", error);
  }

  await browser.close();
})();
