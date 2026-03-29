import { memo, SetStateAction, useState } from "react";
import { Sheet, Toast, YStack } from "tamagui";
import { authClient } from "../../lib/authClients";
import { Paragraph, Input, Text } from "tamagui";
import { Button } from "tamagui";
import { useRouter } from "expo-router";
import { useToastController } from "tamagui";
const SheetContent = memo(({ setOpen, name, setUsername }: any) => {
  const [newName, setNewName] = useState<string>(name);
  const toastController = useToastController();

  const handleChange = async () => {
    try {
      const changeUsername = await authClient.updateUser({ name: newName });
      if (!changeUsername.error) {
        console.log("change name success");
        toastController.show("Success", {
          message: "Success changing username",
          customData: { type: "success" },
        });
        setOpen(false);
        await authClient.getSession();
        return setUsername(newName);
      }
      return toastController.show("Error", {
        myPreset: "error",
        message: "Error changing username, try again later",
        customData: { type: "success" },
      });
    } catch (err) {
      console.log("change name error:" + err);
      return toastController.show("Error", {
        myPreset: "error",
        message: "Error changing username, try again later",
        customData: { type: "success" },
      });
    }
  };
  return (
    <>
      <YStack
        gap={"$3"}
        justify={"center"}
        items={"flex-start"}
        flexGrow={1}
        width={"100%"}
      >
        <Text fontSize={"$5"}>Personalize</Text>
        <Paragraph textAlign="center" color={"$gray11"}>
          Change your username here!
        </Paragraph>
        <Input
          autoFocus
          width={"100%"}
          flexGrow={1}
          placeholder="Input your username here"
          value={newName}
          onChangeText={(text) => {
            console.log(text);
            setNewName(text);
          }}
        />
        <Button onPress={handleChange} type="button">
          Change username
        </Button>
      </YStack>
    </>
  );
});
export default function EditUsername({
  open,
  setOpen,
  setUsername,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setUsername: React.Dispatch<SetStateAction<string>>;
}) {
  const [modal, _setModal] = useState<boolean>(true);
  const { data: session } = authClient.useSession.get();
  const router = useRouter();
  return (
    <>
      {open && (
        <Sheet
          transition={"lazy"}
          zIndex={100_000}
          dismissOnSnapToBottom
          defaultOpen={false}
          open={open}
          modal={modal}
          onOpenChange={setOpen}
          snapPointsMode="mixed"
          snapPoints={["fit", 100]}
          moveOnKeyboardChange
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
            <SheetContent
              {...{ open, setOpen, name: session?.user.name, setUsername }}
            />
          </Sheet.Frame>
        </Sheet>
      )}
    </>
  );
}
