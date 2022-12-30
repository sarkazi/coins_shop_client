import React, { useState } from 'react'
import styles from './homePage.module.scss'
import Layout from '../../components/Layout'
import SearchBlock from '../../components/SearchBlock'
import CategoryItem from '../../components/CategoryItem'
import MoreFilter from '../../components/MoreFilter'
import { getAllCategories } from '../../api/apiUris'
import { fetchApiData } from '../../api/fetchApiData'
import { AppContext } from '../../app'
import { useContext } from 'react'



const HomePage = () => {

   const [showFilter, setShowFilter] = useState(false)
   const [categories, setCategories] = useState([])

   const { inputData, setInputData } = useContext(AppContext)

   const getCategories = async () => {
      const { data } = await getAllCategories()
      setCategories(data)
   }

   const onChangeInput = (e) => {
      setInputData(e)
   }

   React.useEffect(() => {
      fetchApiData(getCategories)
   }, [])


   return (
      <main className={styles.main}>
         <Layout>
            <div className={styles.homePageWrapper}>
               <SearchBlock onChange={onChangeInput} currentPath='Homepage' showFilter={showFilter} toggleOnClick={() => setShowFilter(!showFilter)} titleStyle={{ marginBottom: '40px' }} title='Homepage' inputData={inputData} setInputData={setInputData} />
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