import React from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'

export function useRefreshOnFocus({queryKey=[]}:{queryKey:string[]}) {
  const queryClient = useQueryClient()
  const firstTimeRef = React.useRef(true)
  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false
        return
      }
      // refetch all stale active queries
      queryClient.refetchQueries({
        queryKey: queryKey,
        stale: true,
        type: 'active',
      })
    }, [queryClient]),
  )
}