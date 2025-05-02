import React, {useState, useEffect} from 'react';
function ZonaHoraria(){
    const[time, setTime] =useState(new Date());
    useEffect(()=>{
        const intervalId = setInterval(()=> {
            setTime(new Date());
        }, 1000);
        return () => {
            clearInterval(intervalId);
        }
    }, []);
    function formatTime(){
        const day = time.getDate();
        const mes = time.getMonth()+1;
        let hours = time.getHours();
        const minutes = time.getMinutes();
        return `${padZero(day)}/${padZero(mes)}  ${padZero(hours)}:${padZero(minutes)}`
        
    }
    function padZero(number){
        return(number<10 ? "0" : "") + number;
    }
    return(
    <div className='clock-container'>
        <div className='clock'>
            <span>{formatTime()}

            </span>

        </div>


    </div>
    )
}
export default ZonaHoraria;