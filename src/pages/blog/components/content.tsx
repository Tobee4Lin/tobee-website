import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import {
  Box,
  Image,
  Link,
  VStack,
  Alert,
  Code,
  Text,
  Divider,
  Heading,
} from "@chakra-ui/react";
import CodeBlock from "./styles-comps/code-block";
import picsJsonData from "@/assets/json/picsUrlList.json";

const bingPrefix = "https://cn.bing.com";

const BlogContent = ({ children }: any) => {
  const [picIndex, setPicIndex] = useState<number>(0);
  useEffect(() => {
    if (
      !picsJsonData ||
      (Array.isArray(picsJsonData) && picsJsonData.length === 0)
    )
      return;
    setPicIndex(Math.floor(Math.random() * picsJsonData.length));
  }, []);
  const newTheme = {
    h3: (props: any) => {
      props = {
        ...props,
        id: props.children[0],
      };
      return (
        <Heading as="h3" size="lg" {...props}>
          {props.children}
        </Heading>
      );
    },
    h4: (props: any) => {
      props = {
        ...props,
        id: props.children[0],
      };
      return (
        <Heading as="h4" size="md" {...props}>
          {props.children}
        </Heading>
      );
    },
    code: (props: any) => {
      if (props.inline) return <Code px="2" mx="2" children={props.children} />;
      return <CodeBlock {...props} />;
    },
    a: (props: any) => {
      return (
        <Link color="teal.500" {...props}>
          {props.children}
        </Link>
      );
    },
    blockquote: (props: any) => (
      <Alert
        role="none"
        status="warning"
        variant="left-accent"
        as="blockquote"
        rounded="4px"
        {...props}
      />
    ),
  };

  return (
    <div>
      <Box borderRadius="lg" overflow="hidden">
        <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
          <Image
            transform="scale(1.0)"
            src={bingPrefix + picsJsonData[picIndex].url}
            objectFit="contain"
            width="100%"
            transition="0.3s ease-in-out"
            _hover={{
              transform: "scale(1.05)",
            }}
            alt={picsJsonData[picIndex].description}
          />
        </Link>
      </Box>
      <Text fontSize="sm" as="i" color="gray.500">
        ( 图片随机来源于爬虫爬取的Bing壁纸。图为
        {picsJsonData[picIndex].title} )
      </Text>
      <VStack mt="4" spacing="2" alignItems="flex-start">
        <Divider />
        <ReactMarkdown
          components={ChakraUIRenderer(newTheme)}
          children={children}
          skipHtml
        />
      </VStack>
    </div>
  );
};

export default BlogContent;
