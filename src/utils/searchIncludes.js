export const searchIncludes = (el, inputData) => {
   if (el?.name?.toLowerCase().includes(inputData.toLowerCase())) { return true }
}