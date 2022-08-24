import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { RootState, useSelector, useDispatch } from "@/redux";
import { setBlogList } from "@/redux/modules/blog";

const Blog = () => {
  // 通过slice的name字段获取state
  const blogState = useSelector((state: RootState) => state.blog);
  const blogList = blogState.blogList || [];
  const nextBlogList = [{ id: 2, title: "测试第二篇" }];
  const dispatch = useDispatch();

  return (
    <Box mt="4">
      <Button
        colorScheme="teal"
        size="sm"
        onClick={() => dispatch(setBlogList(nextBlogList))}
      >
        更新博客
      </Button>
      {blogList.map((item) => {
        return <div key={item.id}>{item.title}</div>;
      })}
    </Box>
  );
};

export default Blog;
