import styles from './editCoins.module.scss'
import Input from '../../../../Input'
import Layout from '../../../../Layout'
import Select from '../../../../Select'
import Button from '../../../../Button'
import Title from '../../../../Title'
import Nav from '../../../../Nav'
import FileInput from '../../../../FileInput'

import { fetchApiData } from '../../../../../api/fetchApiData'

import { useParams, useNavigate } from 'react-router-dom'

import { useForm } from "react-hook-form";

import { useEffect, useState } from 'react'

import { getOneCoin, getAllCategories, updateCoin } from '../../../../../api/apiUris'
import { checkValidUser } from '../../../../../utils/checkValidUser'

const EditCoins = () => {


   const { register, handleSubmit, watch, formState: { errors } } = useForm();

   const { id } = useParams()
   const navigate = useNavigate()

   const isValidUser = checkValidUser()

   const [categories, setCategories] = useState([])
   const [currentCoin, setCurrentCoin] = useState({})

   const onGetCoin = async () => {
      const { data } = await getOneCoin(id)
      setCurrentCoin(data)
   }


   const onGetCategories = async () => {
      const { data } = await getAllCategories()
      setCategories(data)
   }

   const onUpdateCoin = async (data) => {


      const formData = new FormData()
      formData.append('category', data.category)
      watch('frontImage').length && formData.append('frontImage', data.frontImage[0])
      watch('backImage').length && formData.append('backImage', data.backImage[0])
      watch('name') && formData.append('name', data.name)
      watch('description') && formData.append('description', data.description)
      watch('issuingCountry') && formData.append('issuingCountry', data.issuingCountry)
      watch('composition') && formData.append('composition', data.composition)
      watch('quality') && formData.append('quality', data.quality)
      watch('denomination') && formData.append('denomination', data.denomination)
      watch('year') && formData.append('year', data.year)
      watch('weight') && formData.append('weight', data.weight)
      watch('price') && formData.append('price', data.price)
      await updateCoin(id, formData)
      navigate('/admin-panel/coin-manage')
   }




   useEffect(() => {
      !isValidUser && navigate('/')
      fetchApiData(onGetCategories)
   }, [])

   useEffect(() => {
      fetchApiData(onGetCoin)
   }, [])


   const onSubmit = handleSubmit((data) => {
      fetchApiData(onUpdateCoin(data))
   })

   console.log(errors)

   return (
      <main className={styles.main}>
         <Layout>
            <section className={styles.section}>
               <Title text='Admin panel' />
               <Nav currentPath='edit-coin' previousPath='Manage coins' navStyle={{ marginBottom: '40px' }} path='/admin-panel/coin-manage' />
               <form onSubmit={onSubmit} className={styles.form} encType='multipart/form-data'>
                  <Select description='Category' register={{ ...register('category', { valueAsNumber: true, required: { value: 12, message: 'fjjfhdjhfhjf' } }) }} arr={categories} />
                  <Input description='Name' onChange={(e) => setCurrentCoin(currentCoin?.name)} value={currentCoin?.name} register={{ ...register('name') }} placeholder='Name' />
                  <Input description='Description' onChange={(e) => setCurrentCoin(currentCoin?.description)} value={currentCoin?.description} register={{ ...register('description') }} placeholder='Description' />
                  <Input description='issuingCountry' onChange={(e) => setCurrentCoin(currentCoin?.issuingCountry)} value={currentCoin?.issuingCountry} register={{ ...register('issuingCountry') }} placeholder='Issuing country' />
                  <Input description='Composition' onChange={(e) => setCurrentCoin(currentCoin?.composition)} value={currentCoin?.composition} register={{ ...register('composition') }} placeholder='Composition' />
                  <Input description='Quality' onChange={(e) => setCurrentCoin(currentCoin?.quality)} value={currentCoin?.quality} register={{ ...register('quality') }} placeholder='Quality' />
                  <Input description='Denomination' onChange={(e) => setCurrentCoin(currentCoin?.denomination)} value={currentCoin?.denomination} register={{ ...register('denomination') }} placeholder='Denomination' />
                  <Input description='Year' onChange={(e) => setCurrentCoin(currentCoin?.year)} value={currentCoin?.year} register={{ ...register('year', { valueAsNumber: true }) }} placeholder='Year' type='number' />
                  <Input description='Weight' onChange={(e) => setCurrentCoin(currentCoin?.weight)} value={currentCoin?.weight} register={{ ...register('weight') }} placeholder='Weight' />
                  <Input description='Price' onChange={(e) => setCurrentCoin(currentCoin?.price)} value={currentCoin?.price} register={{ ...register('price', { valueAsNumber: true }) }} type='number' placeholder='Price' />
                  <FileInput description='Obverse (front side)' register={{ ...register('frontImage') }} />
                  <FileInput description='Reverse (back side)' register={{ ...register('backImage') }} />
                  {errors.category && <span className={styles.errorHandle}>Поле "Категория не может быть пустым!"</span>}
                  <div className={styles.btnBlock}>
                     <Button type='submit' text='Add a coin' />
                     <Button onClick={() => navigate(-1)} text='Go back' />
                  </div>
               </form>

            </section>

         </Layout>
      </main>
   )
}

export default EditCoins