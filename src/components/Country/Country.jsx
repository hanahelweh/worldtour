import styles from './Country.module.css';
function Country({country}) {
    return (
        <div className={styles.country_container}>
            <div className={styles.country}>
                <div>{country.emoji}</div>
                <div>{country.country}</div>
            </div>
        </div>
    )
}

export default Country
