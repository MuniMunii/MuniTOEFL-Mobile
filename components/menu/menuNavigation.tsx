import { X } from "@tamagui/lucide-icons";
import { useState } from "react";
import {
  Adapt,
  Button,
  isWeb,
  Popover,
  Separator,
  Sheet,
  Text,
  YStack,
} from "tamagui";
import { authClient } from "../../lib/authClients";
import SignoutButton from "../button/signout";

export default function MenuNavigation() {
  const { data: session } = authClient.useSession.get();
  return (
    <Popover stayInFrame allowFlip offset={15}>
      <Popover.Trigger asChild>
          <Button
            flexShrink={1}
            circular
          >
            ...
          </Button>
      </Popover.Trigger>
      <Popover.FocusScope>
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        <Popover.Content
          paddingVertical={12}
          paddingHorizontal={0}
          borderWidth={1}
          borderColor="$borderColor"
          width={150}
          height={session ? 200 : "fit-content"}
          enterStyle={{ y: -10, opacity: 0 }}
          exitStyle={{ y: -10, opacity: 0 }}
          transition={"quick"}
        >
          <Popover.ScrollView width={"100%"}>
            <YStack gap={6} p={0}>
              <Button backgroundColor={"$colorTransparent"}>About</Button>
              <Button backgroundColor={"$colorTransparent"}>Pricing</Button>
              {session && (
                <>
                  <Separator />
                  <Button backgroundColor={"$colorTransparent"}>Profile</Button>
                  <Separator />
                  <SignoutButton transparent />
                </>
              )}
            </YStack>
          </Popover.ScrollView>
        </Popover.Content>
      </Popover.FocusScope>
    </Popover>
  );
}
