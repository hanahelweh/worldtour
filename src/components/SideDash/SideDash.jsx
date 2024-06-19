import { useState } from 'react';
import styles from './SideDash.module.css';
import { NavLink, Outlet } from 'react-router-dom';
function SideDash() {
    const [isOpen,setIsOpen]=useState(false);
    return (
        <>
            <div className={`${styles.side} ${isOpen ? styles.opened : ''}`}>
                {isOpen && <div onClick={()=>setIsOpen((isOpen)=>!isOpen)} className={styles.close_btn}>
                    <div className={styles.close_span}>x</div>
                </div>}
                <div className={styles.logo}></div>
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
            <div className={styles.media_open_dash} onClick={()=>setIsOpen((isOpen)=>!isOpen)}>
                <i className="fa-solid fa-chevron-right"></i>
            </div>
        </>
    )
}

export default SideDash
