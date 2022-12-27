import { Link } from 'react-router-dom'
import styles from './categoryItem.module.scss'

import { pathToImage } from '../../constants/pathToImage'


const CategoryItem = ({ name, id, coins }) => {





   return (
      <div className={styles.item}>
         <h2 className={styles.title}>{name}</h2>
         <Link to={`/coins/${id}`} className={styles.btnShowAll}>
            <span>Show all</span>
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M1 1L7 7L13 1" stroke="black" />
            </svg>
         </Link>
         <div className={styles.imgBlock}>
            <img src={`${pathToImage}/coins/${coins[0]?.frontImage}`} alt="" />
         </div>

      </div>
   )
}

export default CategoryItem