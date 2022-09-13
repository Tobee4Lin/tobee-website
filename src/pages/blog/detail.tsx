import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { marked } from "marked";
import BlogContent from "./components/content";
import TitleOfContent from "./components/title-of-content";
import { type IHeading, titleTypeEnum } from "./types";

// let headings: IHeading[] = [];

const BlogDetail = () => {
  const [searchParams] = useSearchParams();
  const bg = useColorModeValue("white", "gray.800");
  const [blogContent, setBlogContent] = useState<string>("");
  const [headings, setHeadings] = useState<IHeading[]>([]);
  const staticUrl = searchParams.get("staticUrl") as string;

  useEffect(() => {
    fetch(staticUrl)
      .then((res) => res.text())
      .then((text) => {
        setBlogContent(text);
        try {
          const html = marked.parse(text);
          const reg = /<(h|H)[3-4].*?>.*?<\/(h|H)[3-4].*?>/g;
          const matchArr = html.match(reg);
          const headings = matchArr!.map((item) => ({
            level:
              item.slice(1, 3) === "h3" ? titleTypeEnum.h3 : titleTypeEnum.h4,
            text: item.split('">')[1].split("</")[0],
            id: item.split('">')[1].split("</")[0],
          }));
          setHeadings(headings);
        } catch (error) {
          console.error(error);
        }
      });
  }, [staticUrl]);

  return (
    <Box
      maxWidth={1140}
      mx="auto"
      boxShadow="0 12px 15px 0 rgb(0 0 0 / 24%), 0 17px 50px 0 rgb(0 0 0 / 19%)"
      position="relative"
    >
      <Box
        id="content"
        mx="auto"
        mb="20px"
        minH="76vh"
        borderRadius="0.5rem"
        pt={8}
        pb={8}
        bg={bg}
      >
        <Flex>
          {/* 左侧主体内容 */}
          <Box minW="0" flex="auto" px={{ base: "4", sm: "6", xl: "8" }} pt="0">
            <BlogContent>{blogContent}</BlogContent>
          </Box>
          {/* 右侧标题导航内容 */}
          <TitleOfContent
            visibility={headings.length === 0 ? "hidden" : "initial"}
            headings={headings}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default BlogDetail;
