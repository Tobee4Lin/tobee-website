import React, { useRef, useEffect } from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import VanillaTilt from "vanilla-tilt";
import "./index.less";

function Glassmorphism() {
  const tiltRef = useRef<HTMLDivElement[]>([]);
  let lineColor = useColorModeValue(
    "rgba(0,0,0,0.05)",
    "rgba(255,255,255,0.05)"
  );
  let line1Color = useColorModeValue("gray.800", "#fff");
  let aColor = useColorModeValue("#fff", "gray.800");
  let aBgColor = useColorModeValue("gray.800", "#fff");

  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {
      // scale: 1.05,
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 1,
    });
  }, []);

  return (
    <>
      <Flex
        align="center"
        justify="center"
        flexWrap="wrap"
        className="glassmorphism-wrap"
        bg={useColorModeValue("white", "gray.800")}
      >
        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <Flex
              ref={(el) => (tiltRef.current[index] = el!)}
              // ref={tilt}
              key={index}
              align="center"
              justify="center"
              className="glassmorphism-box"
            >
              <Box className="content">
                <Box as="h2" color={lineColor}>
                  0{index}
                </Box>
                <Flex
                  padding="5"
                  align="center"
                  flexDirection="column"
                  justify="center"
                >
                  <Box as="h3" color={line1Color}>
                    Card - {index}
                  </Box>
                  <Box as="p" color={line1Color}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptas unde non fugiat pariatur excepturi aut dicta nobis
                    quae neque voluptates, vero suscipit quo nesciunt adipisci
                    molestias architecto. Facere, ipsum totam.
                  </Box>
                  <Box as="a" color={aColor} bgColor={aBgColor}>
                    READ MORE
                  </Box>
                </Flex>
              </Box>
            </Flex>
          );
        })}
      </Flex>
    </>
  );
}

export default Glassmorphism;
