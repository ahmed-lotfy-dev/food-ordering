import { supabase } from "@/src/app/lib/supabase"
import { useAuth } from "@/src/providers/AuthProvider"
import { InsertTables, OrderStatus, Tables, UpdateTables } from "@/src/types"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"

export const useAdminOrderList = ({ archived = false }) => {
  const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"]

  return useQuery({
    queryKey: ["orders", { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .in("status", statuses)
        .order("created_at", { ascending: false })
      if (error) {
        throw new Error(error.message)
      }
      console.log(data)
      return data
    },
  })
}

export const useMyOrderList = () => {
  const { session } = useAuth()
  const id = session?.user.id

  return useQuery({
    queryKey: ["orders", { userId: id }],
    queryFn: async () => {
      if (!id) return null
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", id)
        .order("created_at", { ascending: false })
      if (error) {
        throw new Error(error.message)
      }
      return data
    },
  })
}

export const useOrderDetails = (id: number) => {
  return useQuery<Tables<"orders">>({
    queryKey: ["orders", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*, products(*))") // Include order_items with products
        .eq("id", id)
        .single()

      console.log(data)

      if (error) {
        throw new Error(error.message)
      }

      // Check if data exists and if order_items are included
      if (!data || !data.order_items) {
        throw new Error("Order details not found or order items not included")
      }

      return data // Return the entire response
    },
  })
}

export const useInsertOrder = () => {
  const queryClient = useQueryClient()
  const { session } = useAuth()
  const userId = session?.user.id

  return useMutation({
    async mutationFn(data: InsertTables<"orders">) {
      const { error, data: newProduct } = await supabase
        .from("orders")
        .insert({ ...data, user_id: userId })
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }
      return newProduct
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["orders"] })
    },
  })
}

export const useUpdateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn({
      id,
      updatedFields,
    }: {
      id: number
      updatedFields: UpdateTables<"orders">
    }) {
      const { error, data: updatedOrder } = await supabase
        .from("orders")
        .update(updatedFields)
        .eq("id", id)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }
      return updatedOrder
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ["orders"] })
      await queryClient.invalidateQueries({ queryKey: ["orders", id] })
    },
  })
}