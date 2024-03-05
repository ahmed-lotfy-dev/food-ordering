import { PropsWithChildren, createContext, useContext, useState } from "react"
import { CartItem, Product } from "../types"
import { randomUUID } from "expo-crypto"

type CartType = {
  items: CartItem[]
  addItem: (product: Product, size: CartItem["size"]) => void
  updateQuantity: (itemId: string, amount: 1 | -1) => void
  total: number
}

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
})

export default function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([])

  const total = +items
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    .toFixed(2)

  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product.id === product.id && item.size === size
    )
    if (existingItem) {
      updateQuantity(existingItem.id, 1)
      return
    }

    const newCartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    }

    setItems((existingItem) => [newCartItem, ...existingItem])
  }

  const updateQuantity = (itemId: string, amount: 1 | -1) => {
    setItems((existingItems) =>
      existingItems
        .map((it) =>
          it.id === itemId ? { ...it, quantity: it.quantity + amount } : it
        )
        .filter((item) => item.quantity > 0)
    )
  }

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
