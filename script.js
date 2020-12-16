/*--Start Yatzy Class-- */
class Yatzy {
    constructor(ones, twos, threes, fours, fives, sixes, sum, bonus, pair, twopairs, threeOfKind, fourOfKaind, small_straight, large_straight, fullHouse, chance, yatzy, total) {
        this.ones = ones;
        this.twos = twos;
        this.threes = threes;
        this.fours = fours;
        this.fives = fives;
        this.sixes = sixes;
        this.sum = sum;
        this.bonus = bonus;
        this.pair = pair;
        this.twopairs = twopairs;
        this.threeOfKind = threeOfKind;
        this.fourOfKaind = fourOfKaind;
        this.small_straight = small_straight;
        this.large_straight = large_straight;
        this.fullHouse = fullHouse;
        this.chance = chance;
        this.yatzy = yatzy;
        this.total = total;
    }
}
/*--End Yatzy Class-- */
class Die {
    constructor() {
        this.value = null;
        this.throw();
    }

    throw () {
        this.value = Math.floor(Math.random() * 6) + 1;
    }
}

class Dice {
    constructor(no_of_dice = 5) {
        this.dice_objects = [];
        this.dice_values = Array(7);

        for (let dice_counter = 0; dice_counter < no_of_dice; dice_counter++) {
            this.dice_objects.push(new Die());
        }

        this.throw();
    }

    small_straight() {
        let result_length = this.how_many_straight();
        if (result_length >= 4) {
            return 30;
        } else {
            return 0
        }
    }
    large_straight() {
        let result_length = this.how_many_straight();
        if (result_length == 5) {
            return 40;
        } else {
            return 0
        }
    }
    how_many_straight() {
        let length = 0;
        for (let i = 1; i < this.dice_values.length; i++) {
            const element = this.dice_values[i];
            if (element == 1) {
                length++;
            }
        }
        return length;
    }
    has_yatzy() {
        let length = 0;
        for (let i = 1; i < this.dice_values.length; i++) {
            const element = this.dice_values[i];
            if (element != 0) {
                length++;
            }
        }
        if (length == 1) {
            return 50;
        } else {
            return 0
        }
    }
    has_FullHouse() {
        let length = 0;
        for (let i = 1; i < this.dice_values.length; i++) {
            const element = this.dice_values[i];
            if (element != 0) {
                length++;
            }
        }
        if (length == 2) {
            return 25;
        } else {
            return 0
        }
    }
    get_die_of_akind() {
        let length = 0;
        let sum = 0;
        for (let i = 1; i < this.dice_values.length; i++) {
            const current_dice = this.dice_values[i];
            if (current_dice != 0 && current_dice > 2) {
                length++;
                sum = current_dice * i
            }
        }
        // if (length <= 3) {
        //     return 
        // }
        return sum;
    }

    values() {
        this.dice_values.fill(0);
        for (let current_dice of this.dice_objects) {
            this.dice_values[current_dice.value]++;
        }
    }

    throw () {
        for (let current_dice of this.dice_objects) {
            current_dice.throw();
        }
        this.values();
    }
    set_test_obj(die) {
        for (let i = 0; i < die.length; i++) {
            let add_test = new Die()
            add_test.value = die[i]
            this.dice_objects.push(add_test);
        }
        this.values();
    }
    chang_one_dice(index) {
        this.dice_objects[index] = new Die();
        this.values();
    }
}
/*----End Dice Class---- */
/* Start Class Player */
class Player {
    constructor(name, myTurn) {
        this.name = name;
        this.myTurn = myTurn;
    };
}
/* End Class Player */
/* Start Game Class */
class Game {
    constructor() {

    }
}
/* End Game Class */
let turns = 3;
let dice_obj = [6, 2, 2, 2, 6];

let dices = new Dice();
// dices.set_test_obj(dice_obj) // To set test dice object

// console.log(dice1.small_straight());
// console.log(dice1.large_straight());
// console.log(dice1.has_yatzy());
// console.log(dice1.has_FullHouse());
// console.log(dice1.get_die_of_akind());

let allDices = document.querySelectorAll(".dice_area .dice_list .dice_span");
let player_one = document.querySelectorAll('.player_1');
let startbtn = document.getElementById('startbtn');
let throw_span = document.getElementById('throw_span');

startbtn.addEventListener('click', dice_elements);

function dice_elements() {
    if (turns == 1) {
        this.setAttribute('disabled', 'disabled');
    }
    allDices.forEach((die, index) => {
        let dice = dices.dice_objects;
        let checkbox = document.getElementById(`chk_${index + 1}`).checked;
        if (!checkbox) {
            dices.chang_one_dice(index)
        }
        die.innerHTML = `<img src="./images/dices/Alea_${dice[index].value}.png">`;
    });
    game_table()
    turns--
    throw_span.textContent = turns;
}


function game_table() {
    let sum = 0;
    player_one.forEach((die, index) => {
        let dice = dices.dice_values;

        if (dice[index + 1] != 0 && index < 6) {
            die.innerHTML = dice[index + 1] * (index + 1);
            sum += dice[index + 1] * (index + 1);
        } else if (dice[index + 1] != 0 && index == 6) {
            die.innerHTML = sum;
        } else if (dice[index + 1] != 0 && index == 7) {
            if (sum >= 63) {
                die.innerHTML = 50;
            }
        }
    })
}

let fields = Array.from(document.querySelectorAll('.partsum1 input[type=number]'));

let players = ['Kalle', 'Olle'];

let scores = players.map((player, player_index) => fields.filter((obj, index) => (index + player_index) % players.length == 0))

let player_no = 1;
for (let player of scores) {
    console.log(`Player no ${ player_no }, ${ players[player_no-1]}`);
    player_no++;

    for (let field of player) {
        console.log(field.value)
    }
}