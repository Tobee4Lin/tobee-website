import { useColorModeValue } from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  a11yDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Box, Flex, VStack } from "@chakra-ui/react";

export default function CodeBlock(props: any) {
  const themeValue = useColorModeValue(oneLight, a11yDark);
  return (
    <Flex maxW={["22rem", "md", "xl", "3xl"]}>
      <SyntaxHighlighter language="javascript" style={themeValue}>
        {props.children}
      </SyntaxHighlighter>
    </Flex>
  );
}
