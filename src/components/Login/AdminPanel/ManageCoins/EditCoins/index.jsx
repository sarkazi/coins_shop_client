import styles from './editCoins.module.scss'
import Input from '../../../../Input'
import Layout from '../../../../Layout'
import Select from '../../../../Select'
import Button from '../../../../Button'
import Title from '../../../../Title'
import Nav from '../../../../Nav'

import { fetchApiData } from '../../../../../api/fetchApiData'

import { useParams, useNavigate } from 'react-router-dom'

import { useForm } from "react-hook-form";

import { useEffect, useState } from 'react'

import { getOneCoin, getAllCategories, updateCoin } from '../../../../../api/apiUris'
import { checkValidUser } from '../../../../../utils/checkValidUser'

const EditCoins = () => {

   const { register, handleSubmit, watch } = useForm();

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


   const onSubmit = handleSubmit(async (data) => {
      fetchApiData(onUpdateCoin(data))
   })


   return (
      <main className={styles.main}>
         <Layout>
            <section className={styles.section}>
               <Title text='Admin panel' />
               <Nav currentPath='edit-coin' previousPath='Manage coins' navStyle={{ marginBottom: '40px' }} path='/admin-panel/coin-manage' />
               <form onSubmit={onSubmit} className={styles.form} encType='multipart/form-data'>
                  <Select value={currentCoin?.category} register={{ ...register('category', { valueAsNumber: true, required: true }) }} arr={categories} />
                  <Input value={currentCoin?.name} register={{ ...register('name') }} placeholder='Name' />
                  <Input value={currentCoin?.description} register={{ ...register('description') }} placeholder='Description' />
                  <Input value={currentCoin?.issuingCountry} register={{ ...register('issuingCountry') }} placeholder='Issuing country' />
                  <Input value={currentCoin?.composition} register={{ ...register('composition') }} placeholder='Composition' />
                  <Input value={currentCoin?.quality} register={{ ...register('quality') }} placeholder='Quality' />
                  <Input value={currentCoin?.denomination} register={{ ...register('denomination') }} placeholder='Denomination' />
                  <Input value={currentCoin?.year} register={{ ...register('year', { valueAsNumber: true }) }} placeholder='Year' type='number' />
                  <Input value={currentCoin?.weight} register={{ ...register('weight') }} placeholder='Weight' />
                  <Input value={currentCoin?.price} register={{ ...register('price', { valueAsNumber: true }) }} type='number' placeholder='Price' />
                  <div>
                     <input className={styles.inputFile} {...register('frontImage')} type='file' />
                  </div>
                  <div>
                     <input className={styles.inputFile} {...register('backImage')} type='file' />
                  </div>
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

export default EditCoins