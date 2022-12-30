import styles from './auth.module.scss'
import { useState } from 'react'

import Button from '../../Button'
import Input from '../../Input'

import { useContext } from 'react'
import { AppContext } from '../../../app'


import API from '../../../api/axiosBase'

const Auth = () => {

   const { setIsAuthUser } = useContext(AppContext)


   const [isRegister, setIsRegister] = useState(false)
   const [inputData, setInputData] = useState({ login: '', password: '' })

   const onSwitch = (e, action) => {
      e.preventDefault()
      setIsRegister(action === 'register' ? true : false)
      setInputData({ login: '', password: '' })
   }


   const onAction = async (e, uri) => {


      try {
         e.preventDefault()
         const { data } = await API.post(`/auth/${uri}`, {
            login: inputData.login,
            password: inputData.password
         })
         if (uri === 'register') {
            setIsRegister(false)
         }
         if (uri === 'login') {
            localStorage.setItem('coins_user', JSON.stringify(data))
            setIsAuthUser(true)
         }
         setInputData({ login: '', password: '' })
      } catch (err) {
         alert(err.response.data.message)
         console.log(err)
      }
   }



   return (
      <form className={styles.loginForm}>
         <Input value={inputData.login} onChange={(e) => setInputData({ ...inputData, login: e.target.value })} placeholder='Login' description='Login' />
         <Input type='password' value={inputData.password} onChange={(e) => setInputData({ ...inputData, password: e.target.value })} placeholder='Password' description='Password' />
         <div className={styles.btnBlock}>
            <Button onClick={(e) => isRegister ? onAction(e, 'register') : onAction(e, 'login')} type='submit' text={isRegister ? 'Register' : 'Sign in'} />
            {isRegister ? <Button onClick={(e) => onSwitch(e, 'login')} text='Sign in' style={{ backgroundColor: 'unset', color: 'black' }} /> : <Button onClick={(e) => onSwitch(e, 'register')} style={{ backgroundColor: 'unset', color: 'black' }} text='Register' />}
         </div>

      </form>
   )
}

export default Auth