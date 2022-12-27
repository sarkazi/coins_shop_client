import styles from './editCategory.module.scss'

import { useEffect, useState } from 'react'

import { useParams, useNavigate } from 'react-router-dom'


import Button from '../../../../Button'
import Layout from '../../../../Layout'
import Title from '../../../../Title'
import Nav from '../../../../Nav'
import Select from '../../../../Select'

import { useForm } from 'react-hook-form'

import { fetchApiData } from '../../../../../api/fetchApiData'
import { getOneCategory, updateCategory } from '../../../../../api/apiUris'
import { checkValidUser } from '../../../../../utils/checkValidUser'

const typesCategory = ['Памятные', 'Инвестиционные', 'Эксклюзивные']

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

      console.log(data, 787878)

      const formData = new FormData
      watch('name') && formData.append('name', data.name)
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
                  <Select register={{ ...register('name', { required: true }) }} arr={typesCategory} value={currentCategory} />
                  <textarea {...register('description')} placeholder='Введите описание' className={styles.textArea} name="" id="" cols="30" rows="10"></textarea>
                  <input {...register('imageUrl')} className={styles.inputFile} type="file" />
                  <div className={styles.btnBlock}>
                     <Button type='submit' text='Добавить' />
                     <Button onClick={() => navigate(-1)} text='Назад' />
                  </div>
               </form>
            </section>
         </Layout>
      </main>


   )
}

export default EditCategory