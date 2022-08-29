import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  SlideFade,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { useNavigate, Link as ReactRouterLink } from "react-router-dom";
import { routes } from "@/routes/index";
import type { RouteObject } from "@/routes/interface";

export default function Nav() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [menuShow, setMenuShow] = useState(true);

  const handleMouseWheel = useCallback((event: any): void => {
    if (event.wheelDelta) {
      // wheelDelta 判断鼠标滚动滚动条的反向（正数向上，负数向下）
      // 还有一个detail 也是判断鼠标滚动滚动条的反向的，不过正数表向下 负数表向上
      if (event.wheelDelta > 0) {
        //判断浏览器IE，谷歌滑轮事件
        if (document.documentElement.scrollTop > 0) {
          setMenuShow(true);
        }
      } else {
        setMenuShow(false);
      }
    }
  }, []);
  useEffect(() => {
    window.addEventListener("mousewheel", handleMouseWheel, false);
    return () => window.removeEventListener("mousewheel", handleMouseWheel);
  }, []);

  return (
    // <SlideFade in={!isOpen} offsetY="20px">
    <Box
      sx={{ position: "sticky", top: "0", zIndex: 1000 }}
      transition={"transform 200ms ease-in-out;"}
      transform={menuShow ? "none" : "translate3d(0,calc(-100% - 2px),0);"}
    >
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Flex display={{ base: "none", md: "flex" }}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            _hover={{
              bg: "pink.300",
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
    // </SlideFade>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const linkProps = {
    p: 2,
    fontSize: "sm",
    fontWeight: 500,
    color: linkColor,
    _hover: {
      textDecoration: "none",
      color: linkHoverColor,
    },
  };
  return (
    <Stack direction={"row"} spacing={4}>
      {routes.map((navItem) => (
        <Box key={navItem.label || navItem.path}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              {navItem.children ? (
                <Link {...linkProps}>{navItem.label}</Link>
              ) : (
                <Link as={ReactRouterLink} to={navItem.path} {...linkProps}>
                  {navItem.label}
                </Link>
              )}
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, subLabel, path }: RouteObject) => {
  const navigate = useNavigate();
  return (
    <Link
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
      as={ReactRouterLink}
      to={path}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {routes.map((navItem) => (
        <MobileNavItem key={navItem.path} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, subLabel, path }: RouteObject) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Link as={ReactRouterLink} to={path}>
          <Text
            fontWeight={600}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            {label}
          </Text>
        </Link>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link
                key={child.label}
                py={2}
                as={ReactRouterLink}
                to={child.path}
              >
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
