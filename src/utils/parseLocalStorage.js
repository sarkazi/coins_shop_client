export const parseLocalStorage = () => {
   if (localStorage.getItem('coins_user')) {
      const user = JSON.parse(localStorage.getItem('coins_user'))
      return user
   }
   return null
}