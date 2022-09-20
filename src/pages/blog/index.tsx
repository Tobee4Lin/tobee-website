import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Stack,
  Link,
  useColorModeValue,
  Heading,
  Image,
  chakra,
  Skeleton,
} from "@chakra-ui/react";
import {
  Paginator,
  Container,
  Previous,
  usePaginator,
  Next,
  PageGroup,
} from "chakra-paginator";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useNavigate, createSearchParams } from "react-router-dom";
import { RootState, useSelector, useDispatch } from "@/redux";
import { setBlogList } from "@/redux/modules/blog";
import blogSummary from "@/extraFiles/blogs/getBlogSummary";
import picsJsonData from "@/assets/json/picsUrlList.json";

const bingPrefix = "https://cn.bing.com";

const Blog = () => {
  const bg = useColorModeValue("white", "gray.800");
  const navigate = useNavigate();
  // 通过slice的name字段获取state
  const blogState = useSelector((state: RootState) => state.blog);
  const blogList = blogState.blogList || [];
  const nextBlogList = [{ id: 2, title: "测试第二篇" }];
  const dispatch = useDispatch();

  const [mdUrlList, setMdUrlList] = useState<string[]>([]);
  const [isPicLoaded, setIsPicLoaded] = useState(false);

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
    });
    setMdUrlList(mdUrls);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPicLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const { pagesQuantity, currentPage, setCurrentPage, pageSize } = usePaginator(
    {
      total: blogSummary.length,
      initialState: {
        pageSize: 10,
        currentPage: 1,
        isDisabled: false,
      },
    }
  );
  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
  };
  const filterBlogs = blogSummary.slice(
    pageSize * (currentPage - 1),
    pageSize * currentPage
  );

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
    // <Box mt="4">
    //   <Button
    //     colorScheme="teal"
    //     size="sm"
    //     onClick={() => dispatch(setBlogList(nextBlogList))}
    //   >
    //     更新博客
    //   </Button>
    // </Box>
    <Box
      maxWidth={{ base: "540px", md: 1140 }}
      mx="auto"
      boxShadow="0 12px 15px 0 rgb(0 0 0 / 24%), 0 17px 50px 0 rgb(0 0 0 / 19%)"
      position={"relative"}
      borderRadius="0.5rem"
      bg={bg}
      mb={8}
    >
      <Flex>
        <Flex w={{ base: "100%", md: "82%" }} mx="auto">
          <Stack my="12" spacing="14" direction={"column"} w={"100%"} px={3}>
            {filterBlogs.map((item, index) => (
              <Flex key={item.id} flexWrap="wrap">
                <Link
                  _hover={{ textDecor: "none" }}
                  flex={{ base: "0 0 100%", md: "0 0 33.33%" }}
                  px={15}
                  onClick={() => navigateToDetail(index)}
                >
                  <Skeleton
                    height="10rem"
                    isLoaded={isPicLoaded}
                    bg="green.500"
                    color="white"
                    fadeDuration={1}
                  >
                    <Image
                      width={"100%"}
                      boxShadow={
                        "0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%)"
                      }
                      height="10rem"
                      objectFit={"cover"}
                      src={
                        bingPrefix +
                        picsJsonData[
                          Math.floor(Math.random() * picsJsonData.length)
                        ].url
                      }
                      alt=""
                    />
                  </Skeleton>
                </Link>
                <Box flex={1} padding={"8px 15px"}>
                  <Link
                    _hover={{ textDecor: "none" }}
                    onClick={() => navigateToDetail(index)}
                  >
                    <Heading
                      fontWeight="medium"
                      size="lg"
                      _hover={{ color: "accent" }}
                    >
                      {item.title}
                    </Heading>
                  </Link>
                  <Text
                    as={"div"}
                    my="0.5rem"
                    overflow={"hidden"}
                    color="gray.500"
                    lineHeight={"1.4rem"}
                    wordBreak="break-word"
                    height={"4.5rem"}
                  >
                    {item.description}
                  </Text>
                  <Stack
                    direction={"row"}
                    fontSize="14px"
                    color={"#718096"}
                    spacing={4}
                  >
                    <Box>
                      <chakra.i />
                      <chakra.time>{item.date}</chakra.time>
                    </Box>
                    <Box>
                      <chakra.i />
                      {/* <chakra.span>主题描述</chakra.span> */}
                    </Box>
                  </Stack>
                </Box>
              </Flex>
            ))}
          </Stack>
        </Flex>
      </Flex>
      <Flex justifyContent={"center"} pb={6}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Paginator
          currentPage={currentPage}
          pagesQuantity={pagesQuantity}
          onPageChange={handlePageChange}
          normalStyles={{
            bg: "transparent",
            _hover: {
              color: "purple.300",
            },
          }}
          activeStyles={{
            bg: "transparent",
            color: "purple.300",
            _hover: {
              color: "purple.300",
            },
          }}
        >
          <Container>
            <Previous variant="ghost" colorScheme="purple">
              <ChevronLeftIcon></ChevronLeftIcon>
              {/* Or an icon from `react-icons` */}
            </Previous>
            <PageGroup align="center" />
            <Next
              variant="ghost"
              colorScheme="purple"
              background={"transparent"}
              _hover={{
                background: "transparent",
              }}
            >
              <ChevronRightIcon />
              {/* Or an icon from `react-icons` */}
            </Next>
          </Container>
        </Paginator>
      </Flex>
    </Box>
  );
};

export default Blog;
