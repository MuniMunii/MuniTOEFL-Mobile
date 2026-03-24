import { AnimatePresence, SizableText, Tabs } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useSegments } from "expo-router";
import { useState } from "react";
import { authClient } from "../../lib/authClients";
import LoginListModal from "../sheet/Loginmodal";
export default function BottomNavbar() {
  const { data: session } = authClient.useSession.get();
  const inset = useSafeAreaInsets();
  const router = useRouter();
  const segments = useSegments();
  const activeTab = segments[segments.length - 1];
  const [section, setSection] = useState("home");
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  return (
    <>
      <LoginListModal open={openLogin} setOpen={setOpenLogin} />
      <Tabs
        defaultValue={section}
        onValueChange={setSection}
        width={"100%"}
        maxWidth={500}
        height={55}
        bg={"black"}
        position="absolute"
        bottom={inset.bottom+12}
        zIndex={100}
        orientation="horizontal"
        overflow="hidden"
        // backgroundColor={"#3B413C"}
        border={'2px solid'}
        borderColor={'$borderColor'}
        borderRadius={30}
      >
        <AnimatePresence>
          <Tabs.List height={"100%"}>
            <Tabs.Tab
              key={"home-tab-navbar"}
              height={"fit"}
              flex={1}
              backgroundColor={"$colorTransparent"}
              borderStartEndRadius={20}
              borderStartStartRadius={20}
              activeStyle={{ backgroundColor: "rgb(160, 0, 27)" }}
              value="home"
              onPress={() => {
                router.navigate("/");
              }}
            >
              <SizableText fontSize={14}>Home</SizableText>
            </Tabs.Tab>
            <Tabs.Tab
              height={"fit"}
              flex={1}
              rounded={0}
              backgroundColor={"$colorTransparent"}
              activeStyle={{ backgroundColor: "rgb(160, 0, 27)" }}
              value="lesson"
            >
              <SizableText fontSize={14}>Lesson</SizableText>
            </Tabs.Tab>
            <Tabs.Tab
              height={"100%"}
              width={"100%"}
              maxWidth={"$16"}
              flex={1}
              rounded={0}
              bg={"$colorTransparent"}
              activeStyle={{ backgroundColor: "rgb(160, 0, 27)" }}
              value="setting"
              onPress={() => {
                if (session) {
                  return router.navigate(session.user.role!=='admin'?"/client/dashboard/home":"/admin/dashboard/home");
                } else {
                  setOpenLogin(true);
                }
              }}
            >
              <SizableText fontSize={14}>{session ? "Dashboard" : "Login"}</SizableText>
            </Tabs.Tab>
            <Tabs.Tab
              height={"fit-content"}
              width={"fit-content"}
              flex={0}
              bg={"$colorTransparent"}
              activeStyle={{ backgroundColor: "rgb(160, 0, 27)" }}
              value="menu"
              justify={"flex-end"}
              p="8"
            >
            </Tabs.Tab>
          </Tabs.List>
        </AnimatePresence>
      </Tabs>
    </>
  );
}
