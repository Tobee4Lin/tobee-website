import React, { useState, useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { RootState, useSelector, useDispatch } from "@/redux";
import { setBlogList } from "@/redux/modules/blog";

const Blog = () => {
  const navigate = useNavigate();
  // 通过slice的name字段获取state
  const blogState = useSelector((state: RootState) => state.blog);
  const blogList = blogState.blogList || [];
  const nextBlogList = [{ id: 2, title: "测试第二篇" }];
  const dispatch = useDispatch();

  const [mdUrlList, setMdUrlList] = useState<string[]>([]);

  useEffect(() => {
    const mdUrls: string[] = [];
    // 导入所有markdown
    const moduleMarkdowns = require.context(
      "../../extraFiles/blogs/",
      false,
      /\.md$/
    );
    moduleMarkdowns.keys().forEach((key) => {
      mdUrls.push(moduleMarkdowns(key));
      console.log(mdUrls, "mdUrls");
      // fetch(mdUrls[0])
      //   .then((res) => res.text())
      //   .then((text) => console.log(text, "text"));
      // const _key: string = key.match(/(?<=.\/).*?(?=.md)/)![0];
      // moduleMarkdowns(key).default;
    });
    setMdUrlList(mdUrls);
  }, []);

  const navigateToDetail = (index: number) => {
    const query = {
      staticUrl: mdUrlList[index],
    };
    navigate({
      pathname: "/blog/detail",
      search: `?${createSearchParams(query)}`,
    });
  };

  return (
    <Box mt="4">
      {/* <Button
        colorScheme="teal"
        size="sm"
        onClick={() => dispatch(setBlogList(nextBlogList))}
      >
        更新博客
      </Button>

      {blogList.map((item: any) => {
        return <div key={item.id}>{item.title}</div>;
      })} */}
      {mdUrlList.map((url, index) => (
        <Button
          colorScheme="teal"
          key={url}
          size="sm"
          onClick={() => navigateToDetail(index)}
        >
          博客详情 - {index}
        </Button>
      ))}
    </Box>
  );
};

export default Blog;
