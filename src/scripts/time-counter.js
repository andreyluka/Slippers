;(function () {
   const hoursSpan = document.querySelector('.time-counter__hours');  
   const minutesSpan = document.querySelector('.time-counter__minutes');  
   const secondsSpan = document.querySelector('.time-counter__seconds');
   const deadline = new Date(Date.parse(new Date()) + 5 * 60 * 60 * 1000);

   initializeClock(deadline);

   function getTimeRemaining(endtime){
      const total = Date.parse(endtime) - Date.parse(new Date());
      const seconds = Math.floor( (total/1000) % 60 );
      const minutes = Math.floor( (total/1000/60) % 60 );
      const hours = Math.floor( (total/(1000*60*60)) % 24 );

      return {
         total,
         hours,
         minutes,
         seconds
      };  
   }
   
   function initializeClock(endtime) {
      function updateClock(){
         const t = getTimeRemaining(endtime);
         hoursSpan.innerHTML = `${('0' + t.hours).slice(-2)}:`;
         minutesSpan.innerHTML = `${('0' + t.minutes).slice(-2)}:`;
         secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
         
         if (t.total<=0) clearInterval(timeinterval); 
      }

      updateClock();
      const timeinterval = setInterval(updateClock,1000);
   }
})()