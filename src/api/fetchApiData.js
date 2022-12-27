

export const fetchApiData = async (func) => {
   try {
      func()
   } catch (err) {
      if (err.response.data.message) {
         alert(err.response.data.message)
      }
      console.log(err)
   }
}