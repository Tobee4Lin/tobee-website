interface IBlogSummary {
  id: string;
  title: string;
  description: string;
  date: string;
}

const blogSummary: IBlogSummary[] = [
  {
    id: "",
    title: "服务端渲染&客户端渲染",
    description: "服务端渲染&客户端渲染",
    date: "2022-09-11",
  },
  {
    id: "",
    title: "使用GitHub Action和Puppeteer定期爬取Bing壁纸",
    description: "使用GitHub Action和Puppeteer定期爬取Bing壁纸",
    date: "2022-09-01",
  },
  {
    id: "",
    title: "部署小程序脚手架到npm",
    description: "部署小程序脚手架到npm",
    date: "2022-08-21",
  },
];

blogSummary.forEach(
  (item) => (item.id = Math.random().toString(32).substring(2))
);

export default blogSummary;
