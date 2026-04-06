import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import { ScrollView, Text, Button, YStack, Paragraph, XStack } from "tamagui";
import { apiClient } from "../../../lib/apiClient";
import queryFn, { DataProps } from "../../../utils/queryFn";
import { MetaTestDataInterface } from "../../../types/Test";
import { FlatList } from "react-native-gesture-handler";
import { Skeleton, SkeletonProvider } from "../../../components/skeleton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function LessonTab() {
  const [type, setType] = useState<
    "writing" | "listening" | "reading" | "speaking"
  >("writing");
  const [allData, setAllData] = useState<MetaTestDataInterface[]>([]);
  const inset = useSafeAreaInsets();
  const router=useRouter()
  const {
    data: metaTest,
    isFetchingNextPage,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<DataProps<MetaTestDataInterface>>({
    queryKey: ["metatest", type],
    queryFn: ({ pageParam = 1 }) =>
      queryFn(
        `/api/test/metadata/published?type=${type}&page=${pageParam}`,
        false,
      ),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.meta.page >= lastPage.meta.total) {
        return undefined;
      }
      return lastPage.meta.page + 1;
    },
    initialPageParam: 1,
  });
  useEffect(() => {
    setAllData([]);
  }, [type]);
  useEffect(() => {
    console.log("metaTest", metaTest?.pages);
    const flattenData = metaTest?.pages.flatMap((f) => f.data) ?? [];
    if (metaTest) {
      setAllData((prev) => [...prev, ...flattenData]);
    }
  }, [metaTest]);
  useEffect(() => {
    console.log("this is All Data:", allData);
  }, [allData]);
  const filteredData = useMemo(
    () => allData.filter((d) => d.type === type),
    [allData, type],
  );
  return (
    <FlatList
      data={filteredData ?? []}
      keyExtractor={(item, i) => item.titleSlug + i}
      style={{ marginTop: 12 }}
      contentContainerStyle={{ gap: 12, paddingBottom: inset.bottom + 80 }}
      renderItem={({ item }) =>
        isFetching ? (
          <YStack
            gap={8}
            width={"95%"}
            p={8}
            maxWidth={500}
            borderWidth={1}
            borderColor={"$white06"}
            borderRadius={12}
            marginHorizontal={"auto"}
          >
            <SkeletonProvider>
              <Skeleton width={"60%"} />
              <Skeleton height={12} />
              <Skeleton height={12} />
              <Skeleton height={12} />
              <Skeleton />
            </SkeletonProvider>
          </YStack>
        ) : (
          <>
            <YStack
              gap={8}
              marginVertical={8}
              width={"95%"}
              p={8}
              maxWidth={500}
              borderWidth={1}
              borderColor={"$white06"}
              borderRadius={12}
              marginHorizontal={"auto"}
            >
              <Text
                fontWeight={"$semiBold"}
                fontSize={"$4"}
                textTransform="uppercase"
              >
                {item.title}
              </Text>
              <Paragraph color={"$gray11"}>{item.description}</Paragraph>
              <XStack justifyContent="space-between">
                <YStack gap={4}>
                  <Text fontSize={"$1"}>{item.time}</Text>
                  <Text fontSize={"$1"}>
                    {item.isFree ? "Free" : "Exclusive Content"}
                  </Text>
                </YStack>
                <Button onPress={()=>router.navigate(`/client/test/confirmation/${item._id}`)}>Start Lesson</Button>
              </XStack>
            </YStack>
          </>
        )
      }
      onEndReached={() => {
        if (hasNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={
        isError ? (
          <Text>Data is Error, Please try again later</Text>
        ) : (
          <Text>Data Is Empty</Text>
        )
      }
      ListHeaderComponent={
        <>
          <ScrollView
            horizontal
            contentContainerStyle={{ gap: 12, paddingHorizontal: 12 }}
            showsHorizontalScrollIndicator={false}
          >
            <Button onPress={() => setType("writing")}>Writing</Button>
            <Button onPress={() => setType("listening")}>Listening</Button>
            <Button onPress={() => setType("reading")}>Reading</Button>
            <Button onPress={() => setType("speaking")}>Speaking</Button>
          </ScrollView>
        </>
      }
      ListFooterComponent={
        isFetchingNextPage ? <Text>isLoading...</Text> : null
      }
    />
  );
}
