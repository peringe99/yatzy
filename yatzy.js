document.addEventListener("DOMContentLoaded", function(e) {
    let btn = document.getElementById('btnSend');

    let sumtd = document.getElementById('sum');
    let bonus = document.getElementById('bonus');

    let ones1 = document.getElementById('ones1');
    let twos1 = document.getElementById('twos1');
    let threes1 = document.getElementById('threes1');
    let fours1 = document.getElementById('fours1');
    let fives1 = document.getElementById('fives1');
    let sixes1 = document.getElementById('sixes1');
    btn.addEventListener('click', function(e) {
        let sum = parseInt(ones1.value) + parseInt(twos1.value) + parseInt(threes1.value) + parseInt(fours1.value) + parseInt(fives1.value) + parseInt(sixes1.value);
        sumtd.innerHTML = sum

        if (sum >= 63) {
            bonus.innerHTML = parseInt(50)
        } else { 
            bonus.innerHTML = ("N/A")
        }
    })
});