export const checkValidUser = () => {
   const isValid = localStorage.getItem('coins_user')
   if (!isValid) return false

   return true
}