export const isFindCoinInCart = (user, id) => {
   if (user) {
      const isCoinInCart = user?.cart[0]?.coins?.find(coin => coin?.id === +id)
      if (isCoinInCart) {
         return true
      }
      return false
   }
}