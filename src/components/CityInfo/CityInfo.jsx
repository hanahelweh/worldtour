import { useEffect } from 'react';
import { UseCities } from '../../context/CitiesContext'
import styles from './CityInfo.module.css'
import { useNavigate, useParams } from 'react-router-dom';
function CityInfo() {
    const {GetCityInfo, currentCity} = UseCities();
    const id=useParams().id;
    const date=new Date(currentCity.date);
    const navigate = useNavigate();
    useEffect(function(){
        GetCityInfo(id);
    },[id]);
    return (
        <div className={styles.city_info}>
            <div className={styles.info}>
                <div className={styles.sub_title}>city name</div>
                <div className='grid'>
                    <div style={{marginRight:'10px'}}>{currentCity.emoji}</div>
                    <div>{currentCity.cityName}</div>
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.sub_title}>Travel Date</div>
                <div>{date.toDateString()}</div>
            </div>
            {currentCity.notes && 
            <div className={styles.info}>
                <div className={styles.sub_title}>Your Notes</div>
                <div>{currentCity.notes}</div>
            </div>
            }
            <div className='btn' onClick={()=>navigate(-1)}>back</div>
        </div>
    )
}

export default CityInfo
