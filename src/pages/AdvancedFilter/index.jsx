import styles from './advancedFilter.module.scss'
import Layout from '../../components/Layout'
import { useEffect, useState } from 'react'
import { getAllCoins } from '../../api/apiUris'
import { fetchApiData } from '../../api/fetchApiData'
import CoinItem from '../../components/CoinItem'
import Nav from '../../components/Nav'
import Title from '../../components/Title'
import Button from '../../components/Button'

import { useNavigate } from 'react-router-dom'




const AdvancedFilter = () => {

   const [coins, setCoins] = useState([])

   const navigate = useNavigate()


   const onGetCoinsToParametres = async () => {
      const { data } = await getAllCoins(null, JSON.parse(localStorage.getItem('coins-data-filter')))
      setCoins(data)
   }

   useEffect(() => {
      fetchApiData(onGetCoinsToParametres)
   }, [])




   return (
      <main className={styles.main}>
         <Layout>
            <div className={styles.wrapperAdvancedFilterPage}>
               <Nav path={'/'} currentPath={'advancedFilter'} previousPath='Homepage' navStyle={{ marginBottom: '50px' }} />
               {coins?.length ? <section className={styles.items}>
                  {coins?.map(coin => (
                     <CoinItem {...coin} key={coin?.name} />
                  ))}
               </section>

                  :

                  <div className={styles.nothingBlock}>
                     <Title titleStyle={{ textAlign: 'center', marginBottom: '20px', alignSelf: 'center' }} text='Ничего не найдено :(' />
                     <Button onClick={() => navigate(-1)} style={{ alignSelf: 'center' }} text='Вернуться назад' />
                  </div>}

            </div>
         </Layout>
      </main>
   )
}

export default AdvancedFilter
