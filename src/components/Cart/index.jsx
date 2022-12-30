import styles from './cart.module.scss'

import Title from '../Title';
import CoinCart from './CoinCart';

import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../app';

import Button from '../Button';

import { fetchApiData } from '../../api/fetchApiData';
import { getCoinsByCart, getOneUser } from '../../api/apiUris';
import { parseLocalStorage } from '../../utils/parseLocalStorage';

const Cart = () => {
   const [user, setUser] = useState(null)

   const { setIsCloseCart } = useContext(AppContext);
   const [coins, setCoins] = useState([])
   const [totalPrice, setTotalPrice] = useState([])

   const currentUser = parseLocalStorage()


   const onGetCoinsByCart = async () => {
      const { data } = await getCoinsByCart(currentUser?.cart[0]?.id)
      setCoins(data)
   }

   const onGetCurrentUser = async () => {
      const { data } = await getOneUser(currentUser?.id)
      setUser(data)
   }



   useEffect(() => {
      fetchApiData(onGetCurrentUser)
      fetchApiData(onGetCoinsByCart)
   }, [])


   useEffect(() => {
      setTotalPrice(coins?.reduce((acc, obj) => { return acc + obj.price }, 0))
   }, [coins])



   return (
      <section className={styles.cart}>
         <div className={styles.cartWrapper}>
            <div className={styles.titleBlock}>
               <Title text='Корзина' />
               <button onClick={() => setIsCloseCart(false)} className={styles.btnClose}>
                  Выйти
               </button>
            </div>
            <ul className={styles.list}>
               {coins?.map(coin => (
                  <CoinCart setCoins={setCoins} coins={coins} {...coin} key={coin.id} />
               ))}
            </ul>
            <div className={styles.downBlock}>
               <div className={styles.priceBlock}>
                  <h3>Общая цена покупки:</h3>
                  <span>{totalPrice} $</span>
               </div>
               <Button style={{ width: '100%' }} text='Оформить заказ' />
            </div>
         </div>
      </section>
   )
}

export default Cart