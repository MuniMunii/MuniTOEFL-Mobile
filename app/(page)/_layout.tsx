import { DrawerActions } from "@react-navigation/native";
import { Menu } from "@tamagui/lucide-icons";
import { Stack, useNavigation,Slot } from "expo-router";
import { Button } from "tamagui";

export default function StackLayout() {
  const navigate = useNavigation();
  return (
    // <Stack
    //   screenOptions={{
    //     headerLeft: () => {
    //       return (
    //         <Button
    //           icon={Menu}
    //           onPress={() => {
    //             navigate.dispatch(DrawerActions.openDrawer());
    //           }}
    //         />
    //       );
    //     },
    //     presentation: "transparentModal",
    //     animation: "fade",
    //     animationDuration: 200,
    //   }}
    // >
    //   <Stack.Screen name={"(home)"} />
    //   <Stack.Screen name={"client"} />
    // </Stack>
  //   <Stack screenOptions={{headerShown:false}}>
  //  <Stack.Screen name={"(home)"} />
  //   <Stack.Screen name={"client"} />
  //   </Stack>
  <Slot/>
  );
}
