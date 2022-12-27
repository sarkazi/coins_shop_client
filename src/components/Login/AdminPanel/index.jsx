import styles from './adminPanel.module.scss'

import { useNavigate } from 'react-router-dom'

import Button from '../../Button'







const AdminPanel = () => {

   const navigate = useNavigate()


   return (
      <section className={styles.main}>
         <div className={styles.btnBlock}>
            <Button onClick={() => navigate('/admin-panel/coin-manage')} text='Manage coins' />
            <Button onClick={() => navigate('/admin-panel/category-manage')} text='Manage category' />
         </div>

      </section>
   )
}

export default AdminPanel