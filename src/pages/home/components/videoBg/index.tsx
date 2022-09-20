import React from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import TypingAnimation from "@/components/typing-animation";
import Message from "../message";
import video from "@/static/home/video.mp4";
import mask from "@/static/home/mask.jpg";
import "./index.less";

function VideoBg() {
  return (
    <>
      <Flex
        align="center"
        justify="center"
        className="video-bg-wrap"
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
      >
        <video src={video} autoPlay loop muted></video>
        <Box
          as="img"
          filter={useColorModeValue("invert(0.2)", "invert(0.8)")}
          mixBlendMode={useColorModeValue("screen", "multiply")}
          src={mask}
          alt="mask"
          className="mask"
        />

        <Flex
          zIndex={3}
          width="100%"
          align="center"
          justify="center"
          flexWrap="wrap"
        >
          <TypingAnimation
            strings={[
              "Some <i>strings</i> are slanted",
              "Some <strong>strings</strong> are bold",
              "HTML characters &times; &copy;",
            ]}
          />
          <Box zIndex={3} width="100%" height="30vh">
            <Message message="Tobee's Website" />
          </Box>
        </Flex>
        {/* <Box as="h2" color={useColorModeValue("white", "gray.300")}>
          Tobee Website
        </Box> */}
      </Flex>
    </>
  );
}

export default VideoBg;
