import styles from './moreFilter.module.scss'

import SelectBlock from '../SelectBlock'

function MoreFilter() {
   return (
      <section className={styles.moreFilterSection}>
         <SelectBlock from='0' to='500' selectTitle='Issuing country' optionsTitle='Price' />
         <SelectBlock from='1700' to='2022' selectTitle='Metal' optionsTitle='Year of issue' />
         <SelectBlock hide selectTitle='Quality of the coin' />

      </section>
   )
}

export default MoreFilter