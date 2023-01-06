let audioDir = "sounds/";
let audioExt = ".mp3";
let speakBtn;
let tickingBtn;
let stopBtn;
let shotBtn;
let stopShotBtn;
let wordsToSay = [];
let timeTeller = new Audio();
let timeTick = new Audio();
let timeShot = new Audio();
let shotCount = 0;
let lastHour = new Date().getHours();



window.onload = function(){
    clockTicking();
    tickingBtn = document.getElementById("tickingBtn");
    tickingBtn.addEventListener("click", playTick);
    stopBtn = document.getElementById("stopBtn");
    stopBtn.addEventListener("click", stopTick);
    speakBtn = document.getElementById("speakBtn");
    speakBtn.addEventListener("click", tellTime);
    timeShot.src = "kellapomm.mp3";
    shotBtn = document.getElementById("shotBtn");
    shotBtn.addEventListener("click", clockShot);
    stopShotBtn = document.getElementById("stopShotBtn");
    stopShotBtn.addEventListener("click", stopClockShot);
    stopShotBtn.addEventListener("dblclick", clockShot);
    
    
    
    //setInterval(fnc,500);
    // let timerObject = setInterval(fnc,500);
    //clearInterval(timerObject);
}

//tiksumine
function playTick(){
    timeTick.src = "tiksub.mp3";
    timeTick.loop = true;
    timeTick.load();
    timeTick.play();  
    document.getElementById("tickingBtn").style.background="#98FF98";
    document.getElementById("stopBtn").style.background="#FFE4C4";
    }

function stopTick(){
    timeTick.pause();
    document.getElementById("stopBtn").style.background="#98FF98";   
    document.getElementById("tickingBtn").style.background="#FFE4C4"; 
}


//seierite ringikäimine

function clockTicking(){
    let timeNow = new Date();
    let secNow = timeNow.getSeconds();
    let minNow = timeNow.getMinutes();
    let hourNow = timeNow.getHours();
    //seierite keeramine
    document.getElementById("secondhand").style.transform = "rotate(" + (secNow * 6) + "deg)";
    document.getElementById("minutehand").style.transform = "rotate(" + (minNow * 6 + secNow * .1) + "deg)";
    document.getElementById("hourhand").style.transform = "rotate(" + (hourNow * 30 + minNow * .5 + secNow * (3 / 360)) + "deg)";
    //setTimeout(fnc,500);
    // täistund
    if(secNow == 0 && minNow == 0 && shotBtn.disabled == false){
        if(hourNow != lastHour){
            lastHour = hourNow;
            
            shotCount = hourNow;
            if(shotCount > 12) {
                shotCount -= 12;
            }
            if(shotCount == 0){
                shotCount = 12;
            }
            timeShot.addEventListener("ended", clockShot);
            
            clockShot();
    }    
    
    
    }
// veerandtunnid
    if(secNow == 0 && (minNow == 15 || minNow == 30 || minNow == 45) && shotBtn.disabled == false){
        shotCount = 1;
        timeShot.addEventListener("ended", clockShot);
        clockShot(); 
    }

    
    requestAnimationFrame(clockTicking); //60 korda sekundis
}

// aja ütlemine

function tellTime(){
    let timeNow = new Date();
    wordsToSay.push("kellon");
    numToWords(timeNow.getHours());
    wordsToSay.push("ja");
    numToWords(timeNow.getMinutes());
    if(timeNow.getMinutes() == 1){
        wordsToSay.push("minut");

    } else {
        wordsToSay.push("minutit");
    }
    console.log(wordsToSay);
    timeTeller.addEventListener("ended", sayTime);
    sayTime();

}

function sayTime(){
    document.getElementById("speakBtn").style.background="#98FF98";
    if(wordsToSay.length > 0){
        timeTeller.src = audioDir + wordsToSay[0] + audioExt;
        timeTeller.play();
        wordsToSay.shift();
    } else {
        timeTeller.removeEventListener("ended", sayTime);
        document.getElementById("speakBtn").style.background="#FFE4C4"; 
    }
}

function numToWords(value){
    if(value <= 10){
        wordsToSay.push(value);
    } else {
        let tens = Math.floor(value/10);
        let ones = value % 10;
        if(tens == 1){
            wordsToSay.push(ones);
            wordsToSay.push("teist");
        } else {
            wordsToSay.push(tens);
            wordsToSay.push("kymmend");
            if(ones >0){
                wordsToSay.push(ones);
            }
            
        }
    }
}

// kella löömise arvestus
function clockShot(){
    document.getElementById("shotBtn").style.background="#98FF98"; 
    document.getElementById("stopShotBtn").style.background="#FFE4C4";
    shotBtn.disabled = false;   
    if(shotCount > 0){
        timeShot.play();
        shotCount --;
    } else {
        timeShot.removeEventListener("ended", clockShot);
    }
}
// kella löömise lõpetamise nupu tegevus

function stopClockShot(){
    
    document.getElementById("stopShotBtn").style.background="#98FF98";
    document.getElementById("shotBtn").style.background="#FFE4C4";
    shotBtn.disabled = true;
    timeShot.pause();
    shotBtn.removeEventListener("click", clockShot);
    
}
