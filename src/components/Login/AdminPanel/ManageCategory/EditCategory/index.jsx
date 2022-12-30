import styles from './editCategory.module.scss'

import { useEffect, useState } from 'react'

import { useParams, useNavigate } from 'react-router-dom'


import Button from '../../../../Button'
import Layout from '../../../../Layout'
import Title from '../../../../Title'
import Nav from '../../../../Nav'
import Select from '../../../../Select'
import FileInput from '../../../../FileInput'

import { useForm } from 'react-hook-form'

import { fetchApiData } from '../../../../../api/fetchApiData'
import { getOneCategory, updateCategory } from '../../../../../api/apiUris'
import { checkValidUser } from '../../../../../utils/checkValidUser'

const typesCategory = ['Memorable Coins', 'Investment coins', 'Exclusive coins']

const EditCategory = () => {

   const [currentCategory, setCurrentCategory] = useState({})

   const { id } = useParams()
   const navigate = useNavigate()

   const isValidUser = checkValidUser()

   const { register, handleSubmit, watch } = useForm()


   const onGetCategory = async () => {
      const { data } = await getOneCategory(id)
      setCurrentCategory(data)
   }

   const onUpdateCategory = async (data) => {


      const formData = new FormData
      watch('name') !== 'true' && formData.append('name', data.name)
      watch('description') && formData.append('description', data.description)
      watch('imageUrl').length && formData.append('imageUrl', data.imageUrl[0])
      await updateCategory(id, formData)
      navigate('/admin-panel/category-manage/')
   }

   useEffect(() => {
      !isValidUser && navigate('/')
      fetchApiData(onGetCategory)
   }, [])


   const onSubmit = handleSubmit(async (data) => {
      fetchApiData(onUpdateCategory(data))
   })


   return (

      <main className={styles.main}>
         <Layout>
            <section className={styles.section}>
               <Title text='Admin panel' />
               <Nav currentPath='edit-category' previousPath='Manage category' navStyle={{ marginBottom: '40px' }} path='/admin-panel/category-manage' />
               <form onSubmit={onSubmit} className={styles.form}>
                  <Select description='Category' register={{ ...register('name', { required: true }) }} arr={typesCategory} />
                  <div className={styles.textAreaBlock}>
                     <h3>Description</h3>
                     <textarea {...register('description')} placeholder='Enter a description' className={styles.textArea}></textarea>
                  </div>

                  <FileInput description='Cover' register={{ ...register('imageUrl') }} />
                  <div className={styles.btnBlock}>
                     <Button type='submit' text='Add a category' />
                     <Button onClick={() => navigate(-1)} text='Go back' />
                  </div>
               </form>
            </section>
         </Layout>
      </main>


   )
}

export default EditCategory