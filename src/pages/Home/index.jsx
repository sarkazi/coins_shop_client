import React, { useState } from 'react'
import styles from './homePage.module.scss'
import Layout from '../../components/Layout'
import Header from '../../components/SearchBlock'
import CategoryItem from '../../components/CategoryItem'
import MoreFilter from '../../components/MoreFilter'
import { getAllCategories } from '../../api/apiUris'
import { fetchApiData } from '../../api/fetchApiData'



const HomePage = () => {

   const [showFilter, setShowFilter] = useState(false)
   const [categories, setCategories] = useState([])

   const getCategories = async () => {
      const { data } = await getAllCategories()
      setCategories(data)
   }

   React.useEffect(() => {
      fetchApiData(getCategories)
   }, [])


   return (
      <main className={styles.main}>
         <Layout>
            <div className={styles.homePageWrapper}>
               <Header currentPath='Homepage' showFilter={showFilter} toggleOnClick={() => setShowFilter(!showFilter)} titleStyle={{ marginBottom: '40px' }} title='Homepage' />
               {showFilter && <MoreFilter />}

               {
                  !showFilter && (
                     <section className={styles.itemsSection}>

                        {categories.map(cat => (
                           <CategoryItem {...cat} key={cat.name} />
                        ))}

                     </section>
                  )
               }
            </div>

         </Layout>
      </main>
   )
}

export default HomePage