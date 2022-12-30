import styles from './header.module.scss'

import Title from '../Title'
import Input from '../Input'
import Button from '../Button'
import Nav from '../Nav'
import MoreFilter from '../MoreFilter'

import { useContext } from 'react'
import { AppContext } from '../../app'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const SearchBlock = ({ titleStyle, navStyle, nav, toggleOnClick, showFilter, previousPath, currentPath, path, onChange }) => {

   const { watch, register, handleSubmit, setValue } = useForm()

   const navigate = useNavigate()

   const { inputData, setInputData } = useContext(AppContext)


   const onSubmit = handleSubmit((data) => {
      localStorage.setItem('coins-data-filter', JSON.stringify(data))
      setValue('country', '')
      setValue('quality', '')
      setValue('metal', '')
      setValue('mainInfo', '')
      setValue('priceTo', '')
      setValue('priceFrom', '')
      setValue('yearFrom', '')
      setValue('yerTo', '')
      navigate('/advanced-filter')
      setInputData('')
   })



   return (
      <>
         <Title text={currentPath} titleStyle={titleStyle} />
         {nav && <Nav navStyle={navStyle} currentPath={currentPath} previousPath={previousPath} path={path} />}

         <form onSubmit={onSubmit} className={styles.inputSection}>
            <div className={styles.form}>
               <Input register={{ ...register('mainInfo') }} onChange={(e) => onChange(e.target.value)} description='Input field' icon placeholder='Search' />
               <Button type='submit' disabled={!inputData && !watch('mainInfo') && !watch('country') && !watch('quality') && !watch('metal') && !watch('priceFrom') && !watch('priceTo') && !watch('yearFrom') && !watch('yearTo')} />
            </div>
            <button type='button' onClick={toggleOnClick} className={styles.btnToggleFilter}>
               <span>Advanced filter</span>
               <svg style={showFilter ? { transform: 'rotate(-180deg)' } : null} width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L13 1" stroke="black" />
               </svg>
            </button>
            {showFilter && <MoreFilter registerCountry={showFilter && { ...register('country') }} registerMetal={showFilter && { ...register('metal') }} registerQuality={showFilter && { ...register('quality') }} registerPriceFrom={showFilter && { ...register('priceFrom') }} registerPriceTo={showFilter && { ...register('priceTo') }} registerYearFrom={showFilter && { ...register('yearFrom') }} registerYearTo={showFilter && { ...register('yearTo') }} />}

         </form>
      </>
   )
}

export default SearchBlock