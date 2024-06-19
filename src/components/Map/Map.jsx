import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css';
import {MapContainer,TileLayer,Marker,Popup, useMap, useMapEvents} from 'react-leaflet';
import { useEffect, useState } from 'react';
import { UseCities } from '../../context/CitiesContext';
import {useGeolocation} from '../../hooks/UseGeolocation';
function Map() {
    const {cities} = UseCities();
    const [searchParams,setSearchParams] = useSearchParams();
    const lat=searchParams.get("lat");
    const lng=searchParams.get("lng");
    const {isLoading:isLoadingPosition,position:geoLocationPosition,getPosition}= useGeolocation();
    const [position,setPosition]=useState([40,0]);
    useEffect(function(){
        if(lat && lng) setPosition([lat,lng])
    },[lat,lng])
    useEffect(function(){
        if(geoLocationPosition) setPosition([geoLocationPosition.lat,geoLocationPosition.lng]);
    },[geoLocationPosition])
    return (
        <div className={styles.map_container}>
            {<button className={styles.getMyPosition_btn} onClick={getPosition}>{isLoadingPosition? 'loading..':'Get My Position'}</button>}
            <MapContainer className={styles.map} center={position} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}>
                        <Popup>
                        <span>{city.emoji}</span> <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter mapPosition={position} />
                <DetectClick/>
            </MapContainer>
        </div>
    )
}

function ChangeCenter({mapPosition}){
    const map=useMap();
    map.setView(mapPosition);
    return null;
}

function DetectClick(){
    const navigate = useNavigate();
    useMapEvents({
        click:e=>navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
}
export default Map
