import { useQuery } from '@tanstack/react-query'
import { useState,useEffect } from 'react'
import {ScrollView,Text,Button}from 'tamagui'
import { apiClient } from '../../../lib/apiClient'
import queryFn from '../../../utils/queryFn'
import { MetaTestDataInterface } from '../../../types/Test'
import { FlatList } from 'react-native-gesture-handler'
export default function LessonTab(){
    const [type,setType]=useState<'writing'|'listening'|'reading'|'speaking'>('writing')
    const [page,setPage]=useState<number>(1)
    const [allData,setAllData]=useState<MetaTestDataInterface[]>([])
    const {data:metaTest,isLoading,isError}=useQuery({
        queryKey:['metatest',type,page],
        queryFn:()=>queryFn<MetaTestDataInterface[]>(`/api/test/metadata/published?type=${type}&page=${page}`,false)
    })
    useEffect(()=>{console.log(metaTest)
        if(metaTest){
            setAllData((prev)=>[...prev,...metaTest])
        }
    },[metaTest])
    return (
<FlatList
data={allData}
  keyExtractor={(item) => item.titleSlug}
  renderItem={({ item }) => <Text>{item.title}</Text>}
  onEndReached={()=>setPage((prev)=>prev+1)}
  onEndReachedThreshold={0.5}
  ListHeaderComponent={
    <>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
        showsHorizontalScrollIndicator={false}
      >
        <Button onPress={() => setType("writing")}>Writing</Button>
        <Button onPress={() => setType("listening")}>Listening</Button>
        <Button onPress={() => setType("reading")}>Reading</Button>
        <Button onPress={() => setType("speaking")}>Speaking</Button>
      </ScrollView>
      <Text>This is lesson page</Text>
    </>
  }
/>
    )
}