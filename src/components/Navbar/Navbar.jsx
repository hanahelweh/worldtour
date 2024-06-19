import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
function Navbar() {
    return (
        <div className={styles.nav_container}>
            <div className='flexi'>
                <div className={styles.navbar}>
                    {/* <NavLink to="/">
                        <div className={styles.logo}></div>
                    </NavLink> */}
                    {/* <div className='flex gap'>
                        <NavLink to="/pricing">
                            <div>Pricing</div>
                        </NavLink>
                        <NavLink to="/product">
                            <div>Product</div>
                        </NavLink>
                        <NavLink to="/login">
                            <div>Login</div>
                        </NavLink>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Navbar
