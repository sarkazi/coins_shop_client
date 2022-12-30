import styles from './moreFilter.module.scss'

import { getAllCoins } from '../../api/apiUris'

import { useEffect, useState } from 'react'

import SelectBlock from '../SelectBlock'

import { useForm } from 'react-hook-form'

import { fetchApiData } from '../../api/fetchApiData'

function MoreFilter({ registerCountry, registerMetal, registerQuality, registerPriceFrom, registerPriceTo, registerYearFrom, registerYearTo }) {

   const [coins, setCoins] = useState([])

   const { watch, register, handleSubmit } = useForm()




   const onGetAllCoins = async () => {
      const { data } = await getAllCoins()
      setCoins(data)
   }



   useEffect(() => {
      fetchApiData(onGetAllCoins)
   }, [])


   const countryItems = [...new Set(coins?.map(x => x?.issuingCountry))]
   const metalItems = [...new Set(coins?.map(x => x?.composition))]
   const qualityItems = [...new Set(coins?.map(x => x?.quality))]


   return (
      <section className={styles.moreFilterSection}>
         <SelectBlock register={registerCountry} registerFrom={registerPriceFrom} registerTo={registerPriceTo} arr={countryItems} from='0' to='500' selectTitle='Issuing country' optionsTitle='Price' />
         <SelectBlock register={registerMetal} registerFrom={registerYearFrom} registerTo={registerYearTo} arr={metalItems} from='1700' to='2022' selectTitle='Metal' optionsTitle='Year of issue' />
         <SelectBlock register={registerQuality} arr={qualityItems} hide selectTitle='Quality of the coin' />
      </section>
   )
}

export default MoreFilter