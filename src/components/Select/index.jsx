import styles from './select.module.scss'

const Select = ({ arr, register, value }) => {

   return (
      <select value={value} {...register} className={styles.select}>
         <option disabled selected value>Выберите значение</option>
         {arr?.map(type => (
            <option key={typeof type === 'string' ? type : type.id} value={typeof type === 'string' ? type : type.id}>{typeof type === 'string' ? type : type.name}</option>
         ))}
      </select>
   )
}

export default Select