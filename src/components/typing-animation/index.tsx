import React, { useEffect, useRef } from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import Typed from "typed.js";
type TypeingAnimationProp = {
  strings: string[];
};

function TypingAnimation(prop: TypeingAnimationProp) {
  const ref = useRef<HTMLDivElement>(null!);
  const { strings } = prop;
  const options = {
    strings,
    typeSpeed: 50,
    backSpeed: 50,
    loop: true,
  };

  useEffect(() => {
    const typed = new Typed(ref.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <Flex
        align="center"
        justify="center"
        minWidth={400}
        minHeight={90}
        padding={5}
        bgColor={useColorModeValue("white", "gray.900")}
        boxShadow={"dark-lg"}
        borderRadius={"md"}
      >
        <Box
          ref={ref}
          whiteSpace={"pre"}
          userSelect={"none"}
          fontSize={"lg"}
          color={useColorModeValue("gray.900", "white")}
        />
      </Flex>
    </>
  );
}

export default TypingAnimation;
