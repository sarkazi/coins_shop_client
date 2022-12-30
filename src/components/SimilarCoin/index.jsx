
import { pathToImage } from '../../constants/pathToImage'
import styles from './similarCoin.module.scss'

import { Link } from 'react-router-dom'

const SimilarCoin = ({ frontImage, name, description, price, composition, id }) => {



   return (
      <li className={styles.similarItem}>
         <div className={styles.similarImgBlock}>
            <img src={`${pathToImage}/coins/${frontImage}`} alt="" />
         </div>
         <h3>{name}</h3>
         <p>{description}</p>
         <div className={styles.similarInfoBlock}>
            <div className={styles.similarInfoItem}>
               <h4>Composition:</h4>
               <span>{composition}</span>
            </div>
            <div className={styles.similarInfoItem}>
               <h4>Price</h4>
               <span>{price}</span>
            </div>
         </div>
         <Link to={`/coin/${id}`} className={styles.button}>More detailed</Link>
      </li>
   )
}

export default SimilarCoin