import { Routes, Route } from 'react-router-dom'
import HomePage from '../../pages/Home'
import CoinPage from '../../pages/Coin'
import CoinsPage from '../../pages/Coins'
import styles from '../../styles/main.module.scss'
import AdminPage from '../../pages/Admin'
import ManageCategory from '../Login/AdminPanel/ManageCategory'
import EditCategory from '../Login/AdminPanel/ManageCategory/EditCategory'
import ManageCoins from '../Login/AdminPanel/ManageCoins'
import EditCoins from '../Login/AdminPanel/ManageCoins/EditCoins'
import Cart from '../Cart'
import AdvancedFilter from '../../pages/AdvancedFilter'

import { useContext } from 'react';
import { AppContext } from '../../app';


const Main = () => {
   const { isCloseCart } = useContext(AppContext);

   return (
      <div className={styles.main}>
         <Routes>
            <Route exact path='/' element={<HomePage />}></Route>
            <Route exact path='/coin/:id' element={<CoinPage />}></Route>
            <Route exact path='/coins/:id' element={<CoinsPage />}></Route>
            <Route exact path='/admin-panel' element={<AdminPage />}></Route>
            <Route exact path='/admin-panel/category-manage' element={<ManageCategory />}></Route>
            <Route exact path='/admin-panel/category-manage/:id' element={<EditCategory />}></Route>
            <Route exact path='/admin-panel/coin-manage' element={<ManageCoins />}></Route>
            <Route exact path='/admin-panel/coin-manage/:id' element={<EditCoins />}></Route>
            <Route exact path='/advanced-filter' element={<AdvancedFilter />}></Route>
         </Routes>
         {isCloseCart && <Cart />}

      </div>
   )
}

export default Main