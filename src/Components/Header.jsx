import './Header.css'
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./common/UserContext";


export default function Header(){

    const city='seoul';
    const appid= '284677a959ac4eda889df5de52544f3e';
    const [weather,setWeather]= useState(null);
    const [error,setError] = useState(null);
    const { user, logout } = useContext(UserContext);
    
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
        return <div>오류발생!!:{error+""}</div>;
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

        <h1>뉴스-</h1>
        <div className='login'>
          {user ? (
            <div>
              <span>{user.nickname}님 환영합니다!</span>
              <button onClick={logout} className='logout'>로그아웃</button>
            </div>
          ) : (
            <Link to="/auth" >로그인</Link>
          )}
        </div>
   
         
    </header>
    )
}