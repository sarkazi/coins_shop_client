import styles from './header.module.scss'

import Title from '../Title'
import Input from '../Input'
import Button from '../Button'
import Nav from '../Nav'

const SearchBlock = ({ titleStyle, navStyle, nav, toggleOnClick, showFilter, previousPath, currentPath, path, onChange }) => {

   return (
      <>
         <Title text={currentPath} titleStyle={titleStyle} />
         {nav && <Nav navStyle={navStyle} currentPath={currentPath} previousPath={previousPath} path={path} />}

         <section className={styles.inputSection}>
            <span className={styles.label}>Input field</span>
            <form className={styles.form}>
               <Input onChange={(e) => onChange(e.target.value)} icon placeholder='Поиск' />
               <Button />
            </form>
            <button onClick={toggleOnClick} className={styles.btnToggleFilter}>
               <span>Advanced filter</span>
               <svg style={showFilter ? { transform: 'rotate(-180deg)' } : null} width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L13 1" stroke="black" />
               </svg>
            </button>
         </section>
      </>
   )
}

export default SearchBlock