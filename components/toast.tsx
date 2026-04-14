import { Toast, ToastViewport, Button, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToastState } from "@tamagui/toast";
import { X } from "@tamagui/lucide-icons";
export const CurrentToast = () => {
  const toast = useToastState();
  // don't show any toast if no toast is present or it's handled natively
  if (!toast || toast.isHandledNatively) {
    return null;
  }
  return (
    <Toast
      key={toast.id}
      duration={toast.duration}
      flex={1}
      flexDirection="row"
      gap={6}
      alignItems="center"
      justifyContent="space-between"
      maxWidth={'350px'}
      width={'90%'}
    >
      <YStack alignItems="flex-start" justifyContent="center">
        <Toast.Title fontWeight={"$semiBold"} fontSize={'$3'} color={toast.customData?.type==='error'?'$red10':'$green10'}>{toast.title}</Toast.Title>
        {toast.message&&<Toast.Description>{toast.message}</Toast.Description>}
      </YStack>
      <Toast.Close asChild>
        <Button icon={X} p={10} iconSize={24} size={30} borderRadius={10}/>
      </Toast.Close>
    </Toast>
  );
};

export const SafeToastViewport = () => {
  const { left, top, right } = useSafeAreaInsets();
  return (
    <ToastViewport
      flexDirection="column-reverse"
      top={top}
      left={left}
      right={right}
    />
  );
};
