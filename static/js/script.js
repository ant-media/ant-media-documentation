   // Set the date we're counting down to
   var countDownDate = new Date("Dec 01, 2023 00:00:00 GMT+0300").getTime();

   var x = setInterval(function () {
       var now = new Date().getTime();
       var distance = countDownDate - now;

       var days = Math.floor(distance / (1000 * 60 * 60 * 24));
       var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
       var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
       var seconds = Math.floor((distance % (1000 * 60)) / 1000);

       document.getElementById("h_num1").innerHTML = days;
       document.getElementById("h_num2").innerHTML = hours;
       document.getElementById("h_num3").innerHTML = minutes;
       document.getElementById("h_num4").innerHTML = seconds;

       if (distance < 0) {
           clearInterval(x);
           document.getElementById("h_hum1").innerHTML = 0;
           document.getElementById("h_num2").innerHTML = 0;
           document.getElementById("h_num3").innerHTML = 0;
           document.getElementById("h_num4").innerHTML = 0;
       }
   }, 1000);