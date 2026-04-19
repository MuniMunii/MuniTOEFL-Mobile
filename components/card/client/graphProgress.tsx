import { YStack, Text, View } from "tamagui";
import { PieChart } from "react-native-gifted-charts";
import { TypeTest } from "../../../types/Test";
const pieData = [
  {
    value: 70,
    color: "#177AD5",
  },
  {
    value: 30,
    color: "lightgray",
  },
];
export default function GraphProgress({
  type,
  data,
}: {
    // adding props later
    data?:any[],
  type: TypeTest;
}) {
  return (
    <YStack
      flexGrow={1}
      alignItems="center"
      justifyContent="space-between"
      maxWidth={300}
      minWidth={180}
      height={250}
      borderWidth={1}
      borderColor={"$borderColor"}
      borderRadius={15}
      p={8}
    >
      <Text
        textTransform="uppercase"
        fontFamily={"$body"}
        fontSize={"$3"}
        fontWeight={"$semiBold"}
      >
        {type}
      </Text>
      {/* dummy graph */}
      <View
        width={120}
        height={120}
        borderRadius={100}
        borderWidth={1}
        borderColor="$accent1"
        alignItems="center"
        justifyContent="center"
      >
        <PieChart
          donut
          radius={60}
          innerRadius={30}
          data={pieData}
          centerLabelComponent={() => {
            return (
              <Text
                fontWeight={"$bold"}
                style={{ fontSize: 24, color: "#000000ab" }}
              >
                {Math.max(...pieData.map((v) => v.value))}
              </Text>
            );
          }}
        />
      </View>
      <Text
        textTransform="uppercase"
        fontFamily={"$body"}
        fontSize={"$1"}
        color={"$white06"}
      >
        0/69
      </Text>
    </YStack>
  );
}
