(function () {
    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;
          
    let lunch = "2021-08-23T16:30:00.000+00:00",
        countDown = new Date(lunch).getTime(),
        x = setInterval(function() {    
  
          let now = new Date().getTime(),
              distance = countDown - now;
  
          document.getElementById("days").innerText = Math.floor(distance / (day)),
            document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
            document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
            document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);
  
          //do something later when date is reached
          if (distance < 0) {
            let countdown = document.getElementById("countdown"),
                meta = document.getElementById("meta");
  
            countdown.style.display = "none";
            meta.style.display = "block";
  
            clearInterval(x);
          }
          //seconds
        }, 0)
    }());