
import styles from './header.module.scss'
import { Link, useLocation } from 'react-router-dom'
import { checkValidUser } from '../../utils/checkValidUser'

import { useEffect, useState } from 'react'

import { useContext } from 'react'
import { AppContext } from '../../app'
import { fetchApiData } from '../../api/fetchApiData'

import { createCart } from '../../api/apiUris'
import { parseLocalStorage } from '../../utils/parseLocalStorage'


const Header = () => {



   const { setIsCloseCart } = useContext(AppContext);

   const { pathname } = useLocation()

   const isValidUser = checkValidUser()

   const currentUser = parseLocalStorage()




   const onSignOut = (e) => {
      e.preventDefault()
      localStorage.removeItem('coins_user')
      window.location.reload()
   }

   const onCreateCart = async () => {
      await createCart({ user_id: currentUser?.id })
   }

   const openCart = () => {
      setIsCloseCart(true)
      fetchApiData(onCreateCart)
   }


   return (
      <header className={styles.header}>
         {isValidUser
            ?
            <div className={styles.btnBlock}>
               {pathname.includes('/admin-panel') ? <Link className={styles.button} to='/'>Home</Link> : <Link className={styles.button} to='/admin-panel'>Admin Panel</Link>}
               <button onClick={(e) => onSignOut(e)} className={styles.button}>Sign out</button>
               <button onClick={openCart} className={styles.btnCart}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>

               </button>
            </div>
            :
            <div className={styles.btnBlock}>
               {pathname.includes('/admin-panel') ? <Link className={styles.button} to='/'>Home</Link> : <Link className={styles.button} to='/admin-panel'>Admin Panel</Link>}
            </div>
         }
      </header>
   )
}

export default Header