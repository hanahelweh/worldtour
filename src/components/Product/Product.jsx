import styles from './Product.module.css';
import Navbar from '../Navbar/Navbar';

function Product() {
    return (
        <div className={styles.product}>
            <Navbar/>
            Product
        </div>
    )
}

export default Product
