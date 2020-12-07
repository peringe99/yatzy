document.addEventListener("DOMContentLoaded", function(e) {
    let btn = document.getElementById('btnSend');

    let sumtd = document.getElementById('sum');
    let bonus = document.getElementById('bonus');

    let ones = document.getElementById('ones');
    let twos = document.getElementById('twos');
    let threes = document.getElementById('threes');
    let fours = document.getElementById('fours');
    let fives = document.getElementById('fives');
    let sixes = document.getElementById('sixes');
    btn.addEventListener('click', function(e) {
        let sum = parseInt(ones.value) + parseInt(twos.value) + parseInt(threes.value) + parseInt(fours.value) + parseInt(fives.value) + parseInt(sixes.value);
        sumtd.innerHTML = sum

        let bonus = document.getElementById("bonus")

        if (sum >= 63) {
            bonus.innerHTML = ("50")
        }


    })

});