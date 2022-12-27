import styles from './title.module.scss'

const Title = ({ text, titleStyle }) => {
   return (
      <h1 style={titleStyle} className={styles.title}>{text}</h1>
   )
}

export default Title