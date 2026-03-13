import { memo, SetStateAction, useState } from "react";
import { Button, H2, Paragraph, Sheet, SizableText, YStack } from "tamagui";
import GoogleSignIn from "../button/googleSignIn";
import { useRouter } from "expo-router";
import LoginWithCredentials from "../button/loginWithCredentials";
const SheetContent = memo(({router,setOpen}:any) => {
  return (
    <>
      <YStack gap={"$1"} justify={"center"} items={"center"}>
        <H2>Start Your Test</H2>
        <Paragraph textAlign="center" fontSize={"$2"} color={"$gray11"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          libero, ipsa reprehenderit nostrum atque ad!
        </Paragraph>
      </YStack>
      <GoogleSignIn setOpen={setOpen} fromModal={true}/>
      <LoginWithCredentials setOpen={setOpen}/>
    </>
  );
});
export default function LoginListModal({open,setOpen}:{open:boolean,setOpen:React.Dispatch<SetStateAction<boolean>>}) {
  const [modal, _setModal] = useState<boolean>(true);
  const router=useRouter()
  return (
    <>
      {open && (
        <Sheet
          transition={"lazy"}
          zIndex={100_000}
          dismissOnSnapToBottom
          defaultOpen={false}
          open={open}
          onOpenChange={setOpen}
          modal={modal}
          snapPointsMode="mixed"
          snapPoints={["fit", 100]}
        >
          <Sheet.Overlay
            transition={"lazy"}
            bg={"$shadow6"}
            enterStyle={{ opacity: "0" }}
            exitStyle={{ opacity: "0" }}
          />
          <Sheet.Handle />
          <Sheet.Frame
            p="$4"
            pb={"$10"}
            justify={"flex-start"}
            items={"center"}
            gap={"$3"}
          >
            <SheetContent {...{router,setOpen}}/>
          </Sheet.Frame>
        </Sheet>
      )}
    </>
  );
}
