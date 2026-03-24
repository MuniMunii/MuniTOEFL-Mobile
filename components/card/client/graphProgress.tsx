import { YStack,Text,View } from "tamagui";

export default function GraphProgress({type}:{type:'writing'|'listening'|'speaking'|'reading'}){
    return (
        <YStack flexGrow={1} alignItems="center" justifyContent="space-between" maxWidth={300} minWidth={180} height={250} borderWidth={1} borderColor={'$borderColor'} borderRadius={15} p={8}>
            <Text textTransform="uppercase" fontFamily={'$body'} fontSize={'$3'} fontWeight={'$semiBold'}>{type}</Text>
            {/* dummy graph */}
            <View width={120} height={120} borderRadius={100} borderWidth={1} borderColor="$accent1"/>
            <Text textTransform="uppercase" fontFamily={'$body'} fontSize={'$1'} color={'$white06'}>0/69</Text>
        </YStack>
    )
}