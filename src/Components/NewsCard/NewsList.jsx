import { useState } from "react";
import News from "./News"
import './NewsList.css'

export default function NewsList({ articles, onTranslateToggle, isLoading, translated }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [likes, setLikes] = useState(Array(articles.length).fill(0));
    const [bookmarked, setBookmarked] = useState(Array(articles.length).fill(0));

    if (!articles || articles.length === 0) {
        return <div>뉴스가 없습니다.</div>;
    }

    const showLeft = currentIndex > 0;
    const showRight = currentIndex < articles.length - 1;
    const currentArticle = articles[currentIndex];
    const isTranslated = translated[currentIndex];

    // 버튼 텍스트
    let buttonText = '한글 번역';
    if (isLoading) buttonText = '번역중...';
    else if (isTranslated) buttonText = '원문 보기';

    // 버튼 비활성화 조건
    const isButtonDisabled = isLoading;

    // 표시할 기사 데이터
    const displayArticle = {
        ...currentArticle,
        title: isTranslated && currentArticle.title_ko ? currentArticle.title_ko : currentArticle.title,
        description: isTranslated && currentArticle.description_ko ? currentArticle.description_ko : currentArticle.description
    };

    //좋아요 기능
    const handleLike= (index)=>{
        setLikes(prevLike=>{
            const newLike = [...prevLike];
            if (typeof index === "number" && index >= 0) {
                newLike[index] = (newLike[index] || 0) + 1;
            }
            return newLike;
        });

    };

     const handleBookmark = (index)=>{
        setBookmarked(prevBookmark =>{
            const newBookmark = [...prevBookmark];
            if(typeof index === 'number' && index >= 0){
                newBookmark[index] = !newBookmark[index];
            }
            return newBookmark;
        });

     }

    return (
        <div>
            <button 
                className="translate-btn"
                onClick={() => onTranslateToggle(currentIndex)}
                disabled={isButtonDisabled}
            >
                {buttonText}
            </button>
            
            <div className="card-wrapper">
                <div className="card-left">
                    {showLeft && (
                        <div onClick={() => setCurrentIndex(currentIndex - 1)}>
                            <News 
                            article={articles[currentIndex - 1]}  
                            like={likes[currentIndex-1]} 
                            onLike={()=>{handleLike(currentIndex-1)}}
                            onBookmark={()=>{handleBookmark(currentIndex-1)}}
                            Bookmarked={bookmarked[currentIndex - 1]}/>
                        </div>
                    )}
                </div>

                <div className="card-center">
                    <News article={displayArticle} 
                    like={likes[currentIndex]} 
                    onLike={()=>{handleLike(currentIndex)}}
                    onBookmark={()=>{handleBookmark(currentIndex)}}
                    Bookmarked={bookmarked[currentIndex]}/>
                </div>

                <div className="card-right">
                    {showRight && (
                        <div onClick={() => setCurrentIndex(currentIndex + 1)}>
                            <News article={articles[currentIndex + 1]}  
                            like={likes[currentIndex+1]} 
                            onLike={()=> handleLike(currentIndex + 1)}
                            onBookmark={()=>{handleBookmark(currentIndex+1)}}
                            Bookmarked={bookmarked[currentIndex + 1]}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}