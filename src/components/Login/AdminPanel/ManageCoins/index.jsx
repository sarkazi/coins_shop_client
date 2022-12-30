import styles from './manageCoins.module.scss'
import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import Layout from '../../../Layout'
import Button from '../../../Button'

import { pathToImage } from '../../../../constants/pathToImage'
import Input from '../../../Input'
import Title from '../../../Title'
import Nav from '../../../Nav'

import { checkValidUser } from '../../../../utils/checkValidUser'

import { searchIncludes } from '../../../../utils/searchIncludes'

import { fetchApiData } from '../../../../api/fetchApiData'
import { getAllCoins, createCoin, deleteCoin } from '../../../../api/apiUris'


const selectOptions = [
   {
      value: 'Ascending (views)',
      query: 'ASC'
   },
   {
      value: 'Descending (views)',
      query: 'DESC'
   },
]


const ManageCoins = () => {

   const navigate = useNavigate()
   const [coins, setCoins] = useState([])

   const [inputData, setInputData] = useState('')
   const [selectData, setSelectData] = useState('ASC')

   const isValidUser = checkValidUser()



   const onAddCoin = async () => {
      const { data } = await createCoin()
      navigate(`/admin-panel/coin-manage/${data.id}`)
   }

   const onDeleteCoin = async (id) => {
      await deleteCoin(id)
      setCoins(coins.filter(coin => coin.id !== id))
   }

   const onGetCoins = async () => {
      const { data } = await getAllCoins(selectData, null)
      setCoins(data)
   }


   useEffect(() => {
      !isValidUser && navigate('/')
      fetchApiData(onGetCoins)
   }, [selectData])

   const onInputData = (data) => {
      setInputData(data)
   }


   return (
      <main className={styles.block}>
         <Layout>
            <section className={styles.section}>
               <Title text='AdminPanel' />
               <Nav currentPath='manage-coins' previousPath='Admin panel' navStyle={{ marginBottom: '40px' }} path='/admin-panel' />
               <Input bodyStyle={{ marginBottom: '50px', maxWidth: '500px', width: '100%' }} description='Search' onChange={(e) => onInputData(e.target.value)} icon placeholder='Search' />
               <select onChange={(e) => setSelectData(e.target.value)} className={styles.selectSort}>
                  {selectOptions.map(el => (
                     <option value={el.query} key={el.value}>{el.value}</option>

                  ))}

               </select>
               <ul className={styles.list}>
                  {coins?.filter(el => searchIncludes(el, inputData)).map(coin => (
                     <li className={styles.item} key={coin?.id}>
                        <div className={styles.itemMainBlock}>
                           <div className={styles.imgBlock}>
                              <img src={`${pathToImage}/coins/${coin?.frontImage}`} alt="coin" />
                           </div>
                           <h2>{coin.name}</h2>
                           <div className={styles.itemBtnBlock}>
                              <button onClick={() => navigate(`/coin/${coin?.id}`)}>
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                 </svg>
                              </button>
                              <button onClick={() => navigate(`/admin-panel/coin-manage/${coin.id}`)}>
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                 </svg>
                              </button>
                              <button onClick={() => fetchApiData(onDeleteCoin(coin.id))}>
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                 </svg>
                              </button>
                           </div>
                        </div>
                        <div className={styles.itemDownBlock}>
                           <p>{coin?.category?.name}</p>
                           <div className={styles.viewBlock}>

                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{coin.views}</span>
                           </div>

                        </div>
                     </li>
                  ))}
               </ul>
               <div className={styles.btnBlock}>
                  <Button onClick={() => fetchApiData(onAddCoin)} text='Add new coin' />
                  <Button onClick={() => navigate('/admin-panel')} text='Go back' />
               </div>
            </section>

         </Layout>
      </main>
   )
}

export default ManageCoins