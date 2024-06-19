import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Form.module.css'
import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import { UseCities } from '../../context/CitiesContext';
export function convertToEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }
function Form() {
    const [searchParams,setSearchParams] = useSearchParams();
    const lat=searchParams.get("lat");
    const lng=searchParams.get("lng");
    const [isLoading,setIsLoading] = useState(false);
    const [date,setDate] = useState(new Date());
    const [notes,setNotes] = useState('');
    const [cityName,setCityName] = useState('');
    const [country,setCountry] = useState('');
    const [emoji,setEmoji] = useState('');
    const [error,setError]=useState('');
    const {AddCity} = UseCities();
    useEffect(function(){
        async function fetchCityData(){
            try{
                setError('');
                setIsLoading(true);
                const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
                const data = await res.json();
                if(!data.countryCode) throw new Error("That doesn't seem to be a city.. click somewhere else!")
                setCityName(data.locality);
                setCountry(data.countryName);
                setEmoji(convertToEmoji(data.countryCode));
            }catch(err){
                setError(err.message);
            }finally{
                setIsLoading(false);
            }
        }
        fetchCityData();
    },[lat,lng]);

    async function handleSubmit(e){
        e.preventDefault();
        const newCity={
            cityName,
            country,
            emoji,
            date,
            notes,
            position:{lat,lng}
        }
        await AddCity(newCity);
        navigate("/dashboard")
    }

    const navigate=useNavigate();
    if(isLoading) return <div>Loading..</div>;
    if(error) return <div>{error}</div>;
    if(!lat && !lng) return;
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div>
                <label>
                    City Name
                    <input type="text" value={cityName} onChange={(e)=>setCityName(e.target.value)} className={styles.input}/>
                    <span>{emoji}</span>
                </label>
            </div>
            <div style={{marginTop:'20px'}}>
                <label>
                    Travel Date
                    <DatePicker onChange={(date)=>setDate(date)} selected={date} className={styles.input}/>
                </label>
            </div>
            <div style={{marginTop:'20px'}}>
                <label>
                    Notes about your trip
                    <textarea type="text" value={notes} onChange={(e)=>setNotes(e.target.value)} className={styles.input}></textarea>
                </label>
            </div>
            <div className={styles.btn_container}>
                <div className={styles.btn} style={{backgroundColor:'grey'}} onClick={()=>navigate(-1)}>back</div>
                <button className={styles.btn} style={{backgroundColor:'green'}}>Add</button>
            </div>
        </form>
    )
}

export default Form
