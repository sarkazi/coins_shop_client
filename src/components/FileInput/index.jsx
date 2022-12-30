import styles from './fileInput.module.scss'

const FileInput = ({ register, description }) => {
   return (
      <div className={styles.inputBody}>
         <h3>{description}</h3>
         <input className={styles.inputFile} {...register} type='file' />
      </div>
   )
}

export default FileInput