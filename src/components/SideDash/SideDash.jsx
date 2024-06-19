import styles from './SideDash.module.css';
import { NavLink, Outlet } from 'react-router-dom';
function SideDash() {
    return (
        <div className={styles.side}>
            <div>Logo</div>
            <div className={`flex ${styles.switch}`}>
                <div>
                    <NavLink to="cities">Cities</NavLink>
                </div>
                <div>
                    <NavLink to="countries">Countries</NavLink>
                </div>
            </div>
            <Outlet/>
        </div>
    )
}

export default SideDash
