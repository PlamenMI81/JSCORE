function attachEventsListeners() {
    let daysBtn=document.getElementById('daysBtn');
    let hoursBtn=document.getElementById('hoursBtn');
    let minutesBtn=document.getElementById('minutesBtn');
    let secondsBtn=document.getElementById('secondsBtn');
    let daysBox=document.getElementById('days');
    let hoursBox=document.getElementById('hours');
    let minutesBox=document.getElementById('minutes');
    let secondsBox=document.getElementById('seconds');
    daysBtn.addEventListener('click',()=>{
       hoursBox.value=daysBox.value*24;
       minutesBox.value=hoursBox.value*60;
       secondsBox.value=minutesBox.value*60;
    });
    hoursBtn.addEventListener('click',()=>{
        daysBox.value=hoursBox.value/24;
        minutesBox.value=hoursBox.value*60;
        secondsBox.value=minutesBox.value*60;
    });
    minutesBtn.addEventListener('click',()=>{
        hoursBox.value=minutesBox.value/60;
        daysBox.value=hoursBox.value/24;
        secondsBox.value=minutesBox.value*60;
    });
    secondsBtn.addEventListener('click',()=>{
        minutesBox.value=secondsBox.value/60;
        hoursBox.value=minutesBox.value/60;
        daysBox.value=hoursBox.value/24;
    });
}