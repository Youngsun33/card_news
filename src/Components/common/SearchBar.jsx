import { useRef } from "react";
import './SearchBar.css'


export default function SearchBar({setQuery}){
    const inputElement = useRef(null); 
    const handleSubmit = (e)=>{
        e.preventDefault();
        setQuery(inputElement.current.value);
    };

    return(
        <form className="search-bar" onSubmit={handleSubmit}>
            <input type="text"  ref={inputElement}></input>
            <button type="submit">검색 🔍</button>
        </form>
    )
}