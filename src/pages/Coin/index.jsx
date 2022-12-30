import styles from './coin.module.scss'

import Layout from '../../components/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'


import { pathToImage } from '../../constants/pathToImage'

import Button from '../../components/Button'
import SimilarCoin from '../../components/SimilarCoin'

import { fetchApiData } from '../../api/fetchApiData'

import { getOneCoin, changeViewsCoin, putCoinByCart, getSimilarCoins, getOneUser, deleteCoinFromCart } from '../../api/apiUris'
import { parseLocalStorage } from '../../utils/parseLocalStorage'
import { checkValidUser } from '../../utils/checkValidUser'

import { isFindCoinInCart } from '../../utils/isFindCoinInCart'



const features = [
   'Issuing Country', 'Composition', 'Quality', 'Denomination', 'Year', 'Weight', 'Price'
]



const CoinPage = () => {

   const [user, setUser] = useState(null)


   const [coin, setCoin] = useState({})
   const [similarCoins, setSimilarCoins] = useState([])


   const characteristics = [coin.issuingCountry, coin.composition, coin.quality, coin.denomination, coin.year, coin.weight, coin.price]

   const navigate = useNavigate()
   const { id } = useParams()

   const currentUser = parseLocalStorage()

   const isValidUser = checkValidUser()

   const onGetCoin = async () => {
      const { data } = await getOneCoin(id)
      await changeViewsCoin(id)
      setCoin(data)
   }

   const onGetSimilarCoins = async () => {
      const { data } = await getSimilarCoins(id)
      setSimilarCoins(data)
   }

   const onGetCurrentUser = async () => {
      const { data } = await getOneUser(currentUser?.id)
      setUser(data)
   }

   useEffect(() => {
      fetchApiData(onGetCoin)
      fetchApiData(onGetSimilarCoins)
   }, [id])

   useEffect(() => {
      fetchApiData(onGetCurrentUser)
   }, [id, user])


   const onPutCoinInCart = async () => {
      await putCoinByCart({ user_id: currentUser?.id, coin_id: id })
   }

   const onDeleteInCart = async () => {
      await deleteCoinFromCart({ user_id: currentUser?.id, coin_id: id, cart_id: currentUser?.cart[0].id })
   }





   return (
      <main className={styles.main}>
         <Layout>
            <div className={styles.coinPageWrapper}>
               <section className={styles.coinInfoBlock}>
                  <div className={styles.imgSection}>
                     <div className={styles.imgBlock}>
                        <img src={`${pathToImage}/coins/${coin?.frontImage}`} alt="" />
                     </div>
                     <div className={styles.imgBlock}>
                        <img src={`${pathToImage}/coins/${coin?.backImage}`} alt="" />
                     </div>
                  </div>
                  <div className={styles.contentSection}>
                     <div className={styles.upBlock}>
                        <div className={styles.textBlock}>
                           <h1>{coin.name}</h1>
                           <p>{coin.description}</p>
                        </div>
                        <div className={styles.viewBlock}>
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                           </svg>
                           <span>{coin.views}</span>
                        </div>
                     </div>

                     <table className={styles.table}>
                        <tbody>
                           <tr className={styles.tableCont}>
                              {features?.map((el, index) => (
                                 <th style={index % 2 === 0 ? { backgroundColor: '#fff' } : { backgroundColor: 'rgba(196, 196, 196, 0.5)' }} key={el}>{el}</th>
                              ))}
                           </tr>
                        </tbody>
                        <tbody>
                           <tr className={styles.tableCont}>
                              {characteristics?.map((el, index) => (
                                 <th style={index % 2 === 0 ? { backgroundColor: '#fff' } : { backgroundColor: 'rgba(196, 196, 196, 0.5)' }} key={el}>{el}</th>
                              ))}
                           </tr>
                        </tbody>
                     </table>
                     {isValidUser && <Button onClick={isFindCoinInCart(user, id) ? onDeleteInCart : onPutCoinInCart} style={{ alignSelf: 'flex-start', height: 'auto', marginBottom: '30px' }} text={isFindCoinInCart(user, id) ? 'Remove from the cart' : 'Add to cart'} isCartStyle={isFindCoinInCart(user, id)} />}

                     <div className={styles.helpBlock}></div>
                     <button onClick={() => navigate(`/coins/${coin?.category?.id}`)} className={styles.link}>Back to the list</button>
                  </div>
               </section>
               <section className={styles.similarBlock}>
                  <h2>Similar Coins:</h2>
                  <ul className={styles.similarList}>
                     {similarCoins?.map((coin) => (
                        <SimilarCoin {...coin} key={coin.id} />
                     ))}
                  </ul>
               </section>

            </div>
         </Layout>
      </main>
   )
}

export default CoinPage