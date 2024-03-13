import { supabase } from "@/src/app/lib/supabase"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

export const useInsertOrderSubscription = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const orderSubscription = supabase
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          console.log("Change Recieved", payload)
          queryClient.invalidateQueries({ queryKey: ["orders"] })
        }
      )
      .subscribe()

    return () => {
      orderSubscription.unsubscribe()
    }
  }, [])
}

export const useUpdateOrderSubscription = (id: number) => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const orders = supabase
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          console.log("Change Recieved", payload)
          queryClient.invalidateQueries({ queryKey: ["orders", id] })
        }
      )
      .subscribe()

    return () => {
      orders.unsubscribe()
    }
  }, [])
}

const refetch = () => {
  const queryClient = useQueryClient()
  queryClient.invalidateQueries({ queryKey: ["orders"] })
}
