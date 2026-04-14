import { useState } from "react";
import { Input, Text, useToastController } from "tamagui";
import { YStack } from "tamagui";
import { authClient } from "../../../lib/authClients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../lib/apiClient";
import { ResponseProps } from "../../../types/Response";
import { VoucherType } from "../../../types/Voucher";
import { Button } from "tamagui";

export default function ActivatedVoucher(){
      const [voucherId, setVoucherId] = useState<string>("");
      const userCookie = authClient.getCookie();
      const toastController = useToastController();
      const queryClient=useQueryClient()
      const mutateActivateVoucher = useMutation({
        mutationKey: ["activated-voucher"],
        mutationFn: async ({ id }: { id: string }) => {
          try{
          const res = await apiClient.post(
            "/api/voucher/activate-voucher",
            { id },
            { headers: { Cookie: userCookie } },
          );
          return res.data as ResponseProps<VoucherType>;
        }catch(err:any){
          console.log(err.response.data)
          return {
            data:null,
            message:err.response.data.message,
            error:err.response.data.error,
            success:false
          } as ResponseProps<VoucherType>
        }
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey:['active-voucher']})
          toastController.show(data.message ?? "Voucher Activated");
        },
        onError: (err) => {
          toastController.show(err.message ?? "Voucher Error");
        },
      });
    return (
        <YStack gap={16}>
          <Text
            borderLeftWidth={3}
            borderLeftColor={"$accent11"}
            paddingLeft={12}
          >
            Voucher
          </Text>
          <YStack
            gap={12}
            backgroundColor={"$borderColorPress"}
            p={10}
            width={"100%"}
          >
            <Text>Activate Voucher</Text>
            <Input
              placeholder="Input code here"
              placeholderTextColor="$gray12"
              onChangeText={(e) => {setVoucherId(e);console.log(e)}}
            />
            <Button
              onPress={() => {if(!voucherId||!voucherId.trim()){return toastController.show('Voucher input cannot be empty',{customData:{type:'error'}})};mutateActivateVoucher.mutate({ id: voucherId })}}
            >
              Activate
            </Button>
          </YStack>
        </YStack>
    )
}