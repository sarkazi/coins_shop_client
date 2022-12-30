import styles from './input.module.scss'

const Input = ({ placeholder, onChange, value, type = 'text', register, style, icon, description, bodyStyle }) => {

   return (

      <div style={bodyStyle} className={styles.inputBody}>
         <h3>{description}</h3>
         <div className={styles.inputBlock}>
            {icon && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>}

            <input style={style} {...register} value={value} onChange={onChange} className={styles.input} type={type} placeholder={placeholder} />
         </div>
      </div>

   )

}

export default Input