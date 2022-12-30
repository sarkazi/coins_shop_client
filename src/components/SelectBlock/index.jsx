import styles from './selectBlock.module.scss'

import clsx from 'clsx'

import Select from '../Select'

const SelectBlock = ({ selectTitle, optionsTitle, hide, from, to, arr, register, registerFrom, registerTo }) => {
   return (
      <div className={styles.itemSection}>
         <Select register={register} arr={arr} description={selectTitle} />
         <div className={clsx(styles.changeBlock, hide && styles.hide)}>
            <h3 className={styles.inputTitle}>{optionsTitle}</h3>
            <div className={styles.changePriceBody}>
               <div className={styles.inputText}>
                  <span>from</span>
                  <input {...registerFrom} type="number" placeholder={from} />

               </div>
               <div className={styles.inputText}>
                  <span>to</span>
                  <input {...registerTo} type="number" placeholder={to} />
               </div>
            </div>
         </div>
      </div>
   )
}

export default SelectBlock