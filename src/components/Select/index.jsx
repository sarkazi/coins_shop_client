import styles from './select.module.scss'

const Select = ({ arr, register, value, description, onChange }) => {




   return (
      <div className={styles.selectBody}>
         <h3>{description}</h3>
         <select onChange={onChange} value={value} {...register} className={styles.select}>
            <option disabled selected value={''}>Select a value</option>
            {arr?.map(type => (
               <option key={typeof type === 'string' ? type : type?.id} value={typeof type === 'string' ? type : type?.id}>{typeof type === 'string' ? type : type?.name}</option>
            ))}
         </select>
      </div>

   )
}

export default Select
