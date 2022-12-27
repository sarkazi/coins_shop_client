import styles from './nav.module.scss'
import { Link } from 'react-router-dom'

const Nav = ({ navStyle, currentPath, previousPath, path }) => {
   return (
      <nav style={navStyle} className={styles.nav}>
         <Link to={path}>{previousPath}</Link>
         <span>- {currentPath}</span>
      </nav>
   )
}

export default Nav