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
      <Flex align="center" justify="center">
        <Box
          ref={ref}
          style={{
            whiteSpace: "pre",
            fontSize: "26px",
            userSelect: "none",
          }}
          color={useColorModeValue("gray.900", "white")}
        />
      </Flex>
    </>
  );
}

export default TypingAnimation;
