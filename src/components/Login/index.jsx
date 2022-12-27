import styles from './login.module.scss'

import Layout from '../Layout'
import Title from '../Title'
import Auth from './Auth'

import { checkValidUser } from '../../utils/checkValidUser'
import AdminPanel from './AdminPanel'



const Login = () => {

   const isValidUser = checkValidUser()

   return (

      <main className={styles.loginBody}>
         <Layout>
            <div className={styles.loginWrapper}>
               <Title titleStyle={{ marginBottom: '150px' }} text='Admin Panel' />
               {!isValidUser ? <Auth /> : <AdminPanel />}
            </div>

         </Layout>
      </main>
   )
}

export default Login