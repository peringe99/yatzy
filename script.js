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
        this.players = [];
        this.dices = new Dice();

    }
    addPlayer(playername) {
        let newPlayer = new Player(playername, false);
        this.players.push(newPlayer);
        this.players[0].myTurn = true;
        this.player_fields();
    };
    change_player_turn() {
        this.players.forEach(x => {
            x.myTurn = x.myTurn ? false : true;
        })
    }
    player_is_active() {
        // let player_active = document.querySelectorAll('.playerer_name'); // todo active player in table
        let player_active = document.querySelectorAll('.player_list .player');
        player_active.forEach((x, index) => {
            x.classList.remove('active');
            if (this.players[index].myTurn == true) {
                x.classList.add('active');
            }
        })
    }
    player_fields() { // kan ta in parameter
        let fields = Array.from(document.querySelectorAll('.upper_section td'));

        let player_field = this.players.map((player, player_index) =>
            fields.reduce((acc, obj, index, array) => {
                let key = array[player_index].className;
                let player_name = player.name;
                if (!acc[player_name]) {
                    acc[player_name] = [];
                }
                if (obj.className == key) {
                    acc[player_name].push(obj)
                }
                return acc;
            }, []))
        return player_field;
    }
}
/* End Game Class */
let turns = 3;
let dice_array = [6, 2, 2, 2, 6];

let dices = new Dice();
let game = new Game();
game.addPlayer('Kalle');
// game.addPlayer('Olle');


// dices.set_test_obj(dice_array) // To set test dice array

// console.log(dice1.small_straight());
// console.log(dice1.large_straight());
// console.log(dice1.has_yatzy());
// console.log(dice1.has_FullHouse());
// console.log(dice1.get_die_of_akind());



document.addEventListener("DOMContentLoaded", function(e) {

    // let players = ['Kalle', 'Olle']; // Test 

    let allDices = document.querySelectorAll(".dice_area .dice_list .dice_span");

    let startbtn = document.getElementById('startbtn');
    let throw_span = document.getElementById('throw_span');

    let fields = Array.from(document.querySelectorAll('.upper_section td')); // 

    startbtn.addEventListener('click', dice_checkbox);

    function dice_elements() {
        if (turns == 1) {
            this.setAttribute('disabled', 'disabled');
        }
        allDices.forEach((die, index) => {
            let dice = game.dices.dice_objects;
            let checkbox = document.getElementById(`chk_${index + 1}`).checked;
            if (!checkbox) {
                game.dices.chang_one_dice(index)
            }
            die.innerHTML = `<img src="./images/dices/Alea_${dice[index].value}.png">`;
        });
        upper_section_table();
        // player_sum()
        turns--
        throw_span.textContent = turns;
    }

    function dice_checkbox() {
        let checkboxes = Array.from(document.querySelectorAll(".dice input"));
        if (turns == 1) {
            this.setAttribute('disabled', 'disabled');
        }
        let checked_boxes = checkboxes.filter(current_checkbox => {
            return current_checkbox;
        }, []);
        let dice = game.dices.dice_objects;
        checked_boxes.forEach((el, index) => {
            if (!el.checked) {
                game.dices.chang_one_dice(index)
            }
            el.previousElementSibling.innerHTML = `<img src="./images/dices/Alea_${dice[index].value}.png">`;

        });
        upper_section_table();
        turns--
        throw_span.textContent = turns;
    }

    function upper_section_table() {
        let fields = game.player_fields()
        let dice = game.dices.dice_values;

        for (let p = 0; p < fields.length; p++) {
            const field = fields[p];
            let player = game.players[p].name;
            let td = field[player]
            for (let i = 0; i < td.length; i++) {
                const element = td[i];
                if (dice[i + 1] < 1) {
                    element.innerHTML = '';
                } else {
                    element.innerHTML = dice[i + 1] * (i + 1);
                }
            }
        }
    }

    function player_sum() {
        // let fields = Array.from(document.querySelectorAll('.upper_section td'));

        let scores = players.map((player, player_index) => fields.filter((obj, index) => (index + player_index) % players.length == 0))
        let player_score = '';
        let player_no = 1;
        for (let player of scores) {
            console.log(`Player no ${ player_no }, ${ players[player_no-1]}`);
            player_no++;
            player_score = player.map((p, i) => p.innerHTML).reduce(
                (accumulator, currentValue) => accumulator + Number(currentValue), 0)
        }
        //
        let fields_class = fields.reduce((allNames, name) => {
            if (name.className in allNames) {
                allNames[name.className]++
            } else {
                allNames[name.className] = 1
            }
            return allNames
        }, [])
        console.log(fields_class)
            //
        return player_score
    }
    // sort fields by Player OK
    function player_field() {
        let player_field = players.map((player, player_index) => fields.reduce((acc, obj, index, array) => {
            let key = array[player_index].className;
            let player_name = player;

            if (!acc[player_name]) {
                acc[player_name] = [];
            }
            if (obj.className == key) {
                acc[player_name].push(obj)
            }
            return acc;
        }, {}))
        return player_field;
    }
})