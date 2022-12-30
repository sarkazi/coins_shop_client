import styles from './manageCategory.module.scss'

import { useEffect, useState } from 'react'

import Button from '../../../Button'

import { useNavigate } from 'react-router-dom'
import Layout from '../../../Layout'
import Title from '../../../Title'
import Nav from '../../../Nav'

import { fetchApiData } from '../../../../api/fetchApiData'
import { getAllCategories, createCategory, deleteCategory } from '../../../../api/apiUris'
import { checkValidUser } from '../../../../utils/checkValidUser'




const ManageCategory = () => {

   const [categories, setCategories] = useState([])
   const navigate = useNavigate()

   const isValidUser = checkValidUser()



   const onAddCategory = async () => {
      const { data } = await createCategory()
      navigate(`/admin-panel/category-manage/${data.id}`)
   }

   const onDeleteCategory = async (id) => {
      await deleteCategory(id)
      setCategories(categories.filter(cat => cat.id !== id))
   }

   const onGetCategories = async () => {
      const { data } = await getAllCategories()
      setCategories(data)
   }


   useEffect(() => {
      !isValidUser && navigate('/')
      fetchApiData(onGetCategories)
   }, [])




   return (
      <main className={styles.block}>
         <Layout>
            <Title text='Admin panel' />
            <Nav currentPath='manage-category' previousPath='Admin panel' navStyle={{ marginBottom: '40px' }} path='/admin-panel' />
            <ul className={styles.list}>
               {categories.map(cat => (
                  <li className={styles.item} key={cat.id} {...cat}>
                     <h2>{cat.name}</h2>
                     <button onClick={() => navigate(`/admin-panel/category-manage/${cat.id}`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                     </button>
                     <button onClick={() => fetchApiData(onDeleteCategory(cat.id))}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                     </button>
                  </li>
               ))}
            </ul>
            <div className={styles.btnBlock}>
               <Button onClick={() => fetchApiData(onAddCategory)} text='Add new category' />
               <Button onClick={() => navigate('/admin-panel')} text='Go back' />
            </div>
         </Layout>
      </main>
   )
}

export default ManageCategory