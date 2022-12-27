import styles from './selectBlock.module.scss'

const SelectBlock = ({ selectTitle, optionsTitle, hide, from, to }) => {
   return (
      <div className={styles.itemSection}>
         <div className={styles.itemSelect}>
            <h3 className={styles.inputTitle}>{selectTitle}</h3>
            <select></select>
         </div>
         {!hide ? <div className={styles.changeBlock}>
            <h3 className={styles.inputTitle}>{optionsTitle}</h3>
            <div className={styles.changePriceBody}>
               <div className={styles.inputText}>
                  <span>from</span>
                  <input type="number" placeholder={from} />

               </div>
               <div className={styles.inputText}>
                  <span>to</span>
                  <input type="number" placeholder={to} />
               </div>
            </div>
         </div> : <div></div>}

      </div>
   )
}

export default SelectBlock