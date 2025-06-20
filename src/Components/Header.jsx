import './Header.css'
import { useEffect, useState } from "react";


export default function Header(){

    const city='seoul';
    const appid= '284677a959ac4eda889df5de52544f3e';
    const [weather,setWeather]= useState(null);
    const [error,setError] = useState(null);
    
    useEffect(()=>{
        const fetchWeather = async()=>{
            try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${appid}&lang=kr`;
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("날씨 정보 로딩 실패!")
            }
            const data = await response.json();
            setWeather(data);
            }catch(error){
                setError(error)
            }

        }
        fetchWeather();
    }, []);

    if(error){
        return <div>오류발생!!:{error}</div>;
    }
    if(!weather){
        return <div>---날씨정보 로딩중---</div>
    }

    
    return(
        <header className="header" >
         <div className="weather">
        {/* 날씨 정보 */}
        {weather.weather && weather.weather[0] &&
           <>
                <span>
                    {weather.weather[0].description} / {weather.main.temp}°C
                </span>

                <img
               src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
               alt={weather.weather[0].description}
           />
            </>
            
        }
        </div>

       
        <h1>뉴슥-</h1>
   
         
    </header>
    )
}