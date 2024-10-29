import { createContext, useContext, useEffect, useReducer } from "react";
import supabase from "../supabase";
const CitiesContext = createContext();
const initialState={
    cities:[],
    isLoading:false,
    currentCity:{}
};
function reducer(state,action){
    switch(action.type){
        case 'loading':
            return {...state,isLoading:true}
        case 'finally':
            return {...state,isLoading:false}
        case 'getCities_success':
            return {...state,isLoading:false,cities:action.payload};
        case 'currentCity_success':
            return {...state,isLoading:false,currentCity:action.payload}
        case 'city_created':
            return {...state,isLoading:false,cities:[...state.cities,action.payload]};
        case 'city_deleted':
            return {...state,isLoading:false,cities:state.cities.filter(city=>city.id!==action.payload)}
        default:
            throw new Error("Undefined action")
    }
}
function CitiesProvider({children}){
    const [{cities,isLoading,currentCity},dispatch]=useReducer(reducer,initialState);
    async function GetCities(){
        try{
            dispatch({type:'loading'});
            const {data,error} = await supabase.from('cities').select('*');
            if (error) {
                throw new Error('Something went wrong',error);
            }
            dispatch({type:'getCities_success',payload:data})
        }catch(error){
            console.log(error);
        }finally{
            dispatch({type:'finally'});
        }
    }
    async function GetCityInfo(id){
        if(Number(id)===currentCity.id) return;
        try{
            dispatch({type:'loading'});
            const {data,error} = await supabase.from('cities').select('*').eq('id', id).single();
            if (error) {
                throw new Error('Something went wrong',error);
            }
            dispatch({type:'currentCity_success',payload:data})
        }catch(error){
            console.log(error);
        }finally{
            dispatch({type:'finally'});
        }
    }
    async function AddCity(city){
        try{
            dispatch({type:'loading'});
            const {data,error} = await supabase.from('cities').insert([city]).select();
            if (error) {
                throw new Error('Something went wrong',error);
            }
            console.log(data)
            dispatch({type:'city_created',payload:data[0]})
            
        }catch(error){
            console.log(error);
        }finally{
            dispatch({type:'finally'});
        }
    }
    async function DeleteCity(id){
        try{
            dispatch({type:'loading'});
            const {data,error} = await supabase.from('cities').delete().eq("id",id);
            if (error) {
                throw new Error('Something went wrong',error);
            }
            console.log(data)
            dispatch({type:'city_deleted',payload:id})
        }catch(error){
            console.log(error);
        }finally{
            dispatch({type:'finally'});
        }
    }
    useEffect(function(){
        GetCities();
    },[])
    return (<CitiesContext.Provider value={{
        isLoading,
        cities,
        GetCityInfo,
        currentCity,
        AddCity,
        DeleteCity
    }}>{children}</CitiesContext.Provider>);
}

function UseCities(){
    const context = useContext(CitiesContext);
    if(context === undefined) throw new Error('CitiesContext was used outside of the Cities Provider');
    return context;
}

export {CitiesProvider,UseCities}