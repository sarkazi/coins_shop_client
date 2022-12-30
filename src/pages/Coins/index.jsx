import Layout from "../../components/Layout"
import SearchBlock from "../../components/SearchBlock"
import CoinItem from "../../components/CoinItem"

import { useEffect, useState } from "react"

import styles from './coins.module.scss'


import { parseLocalStorage } from '../../utils/parseLocalStorage'

import { useParams } from 'react-router-dom'
import { fetchApiData } from "../../api/fetchApiData"
import { getCoinsByCat } from "../../api/apiUris"

import { AppContext } from "../../app"
import { useContext } from "react"

import { searchIncludes } from "../../utils/searchIncludes"

import ReactPaginate from "react-paginate";

const countOnPage = [
   5, 10, 15, 20, 'Все'
]


const CoinsPage = () => {

   const [coins, setCoins] = useState([])

   const [currentPage, setCurrentPage] = useState(1)
   const [currentOnPage, setCurrentOnPage] = useState(countOnPage[0])


   const { inputData, setInputData } = useContext(AppContext)

   const { id } = useParams()

   const currentUser = parseLocalStorage()

   const onGetCoinsByCat = async () => {
      const { data } = await getCoinsByCat(id, currentOnPage, (currentPage - 1) * +currentOnPage)
      setCoins(data && data)
   }


   useEffect(() => {
      fetchApiData(onGetCoinsByCat)
   }, [currentPage, currentOnPage])


   const onChangeInput = (e) => {
      setInputData(e)
   }


   const onPageChange = (value) => {
      setCurrentPage(value)
      fetchApiData(onGetCoinsByCat)
   }

   const onChangeNumber = (value) => {
      setCurrentOnPage(value)
   }




   const [showFilter, setShowFilter] = useState(false)

   return (
      <main className={styles.main}>
         <Layout>
            <div className={styles.homePageWrapper}>

               <SearchBlock onChange={onChangeInput} path='/' currentPath='Lists of the coins' previousPath='Homepage' showFilter={showFilter} toggleOnClick={(e) => { e.preventDefault(); setShowFilter(!showFilter) }} nav navStyle={{ marginBottom: '40px' }} titleStyle={{ marginBottom: 0 }} title='List of the coins' inputData={inputData} />
               {!showFilter && coins.length && <select onChange={(e) => onChangeNumber(e.target.value)} value={currentOnPage} className={styles.select}>
                  {countOnPage.map(item => (
                     <option key={item} defaultValue={item[0]}>{item}</option>
                  ))}
               </select>}
               {!showFilter && <section className={styles.items}>
                  {coins[0] && coins[0].filter(el => searchIncludes(el, inputData)).map(coin => (
                     <CoinItem {...coin} key={coin.name} />
                  ))}
               </section>}
               {!showFilter && <ReactPaginate activeLinkClassName={styles.pagActiveLink} onPageChange={(e) => onPageChange(e.selected + 1)} previousLabel="<" nextLabel=">" breakLabel="..." pageCount={Math.ceil(coins[1] / +currentOnPage)} className={styles.paginate} />}
            </div>
         </Layout>
      </main>
   )
}

export default CoinsPage