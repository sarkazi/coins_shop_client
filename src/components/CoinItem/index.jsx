import styles from './coinItem.module.scss'
import { Link } from 'react-router-dom'
import { pathToImage } from '../../constants/pathToImage'
import Button from '../Button'
import { checkValidUser } from '../../utils/checkValidUser'

import { useNavigate } from 'react-router-dom'




const CoinItem = ({ name, description, frontImage, id }) => {


   const navigate = useNavigate()
   const isValidUser = checkValidUser()



   return (
      <div className={styles.item}>
         <Link to={`/coin/${id}`} className={styles.imgBlock}>
            <img src={`${pathToImage}/coins/${frontImage}`} alt="" />
         </Link>
         <div className={styles.textBlock}>
            <Link to={`/coin/${id}`}>{name}</Link>
            <p>{description}</p>
            {isValidUser && <Button onClick={() => navigate(`/coin/${id}`)} onlyIcon text='More detailed' />}

         </div>
      </div>
   )
}

export default CoinItem