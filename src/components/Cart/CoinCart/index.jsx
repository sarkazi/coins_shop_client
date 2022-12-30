import styles from './coinCart.module.scss'

import { fetchApiData } from '../../../api/fetchApiData'
import { deleteCoinFromCart } from '../../../api/apiUris'

import { parseLocalStorage } from '../../../utils/parseLocalStorage'

import { pathToImage } from '../../../constants/pathToImage'





const CoinCart = ({ name, frontImage, id, price, setCoins, coins }) => {

   const currentUser = parseLocalStorage()


   const data = {
      user_id: currentUser.id,
      coin_id: id,
      cart_id: currentUser.cart[0].id
   }

   const onDeleteCoinFromCart = async () => {
      await deleteCoinFromCart(data)
      setCoins(coins.filter(coin => coin.id !== id))
   }


   return (
      <li className={styles.item}>
         <div className={styles.imgBlock}>
            <img src={`${pathToImage}/coins/${frontImage}`} alt="coin" />
         </div>
         <div className={styles.infoBlock}>
            <h3>{name}</h3>
            <span>{price} $</span>
         </div>
         <button onClick={() => fetchApiData(onDeleteCoinFromCart)} className={styles.btnRemove}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
         </button>

      </li>
   )
}

export default CoinCart