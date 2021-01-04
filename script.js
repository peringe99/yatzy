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

        // for (let dice_counter = 0; dice_counter < no_of_dice; dice_counter++) {
        //     this.dice_objects.push(new Die());
        // }

        // this.throw();
    }

    one_of_akind() {
        let sum = 0;
        let length = 0;
        for (let i = 1; i < this.dice_values.length; i++) {
            const current_dice = this.dice_values[i];
            if (current_dice != 0 && current_dice == 2) {
                length += current_dice
                sum = current_dice * i;
            }
        }
        if (length == 2) {
            // console.log('One of kind', sum);
            return sum;
        } else {
            // console.log('One of kind', 0);
            return 0;
        }
    }
    two_of_akind() {
        let sum = 0;
        let length = 0;
        for (let i = 1; i < this.dice_values.length; i++) {
            const current_dice = this.dice_values[i];
            if (current_dice != 0 && current_dice == 2) {
                length += current_dice
                sum = current_dice * i;
            }
        }
        if (length == 4) {
            // console.log('Two of kind', sum);
            return sum;
        } else {
            // console.log('Two of kind', 0);
            return 0;
        }
    }
    three_of_akind() {
        let sum = 0;
        let length = 0;
        for (let i = 1; i < this.dice_values.length; i++) {
            const current_dice = this.dice_values[i];
            if (current_dice != 0 && current_dice == 3) {
                length += current_dice
                sum = current_dice * i;
            }
        }
        if (length == 3) {
            // console.log('Three of kind', sum);
            return sum;
        } else {
            // console.log('Three of kind', 0);
            return 0;
        }
    }
    four_of_akind() {
        let sum = 0;
        let length = 0;
        for (let i = 1; i < this.dice_values.length; i++) {
            const current_dice = this.dice_values[i];
            if (current_dice != 0 && current_dice == 4) {
                length += current_dice
                sum = current_dice * i;
            }
        }
        if (length == 4) {
            // console.log('Four of kind', sum);
            return sum;
        } else {
            // console.log('Four of kind', 0);
            return 0;
        }
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
    FullHouse() {
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
    yatzy() {
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
        this.turns = 3;
        this.player_fields();
    }
    addPlayer(playername) {
        let newPlayer = new Player(playername, false);
        this.players.push(newPlayer);
        this.players[0].myTurn = true;
    };
    change_player_turn() {

            let p_length = this.players.length;
            let p_index_true = this.players.findIndex(p => p.myTurn == true);
            if (p_index_true + 1 == p_length) {
                this.players[0].myTurn = true;
                this.players[p_index_true].myTurn = false;
            } else {
                this.players[p_index_true].myTurn = false;
                this.players[p_index_true + 1].myTurn = true;
            }
            this.player_is_active();
        }
        // work ? check remove class active 
    player_is_active() {
            let player_field = Array.from(document.querySelectorAll('.player'));
            player_field.forEach(field => {
                field.classList.remove('active');
            })
            this.players.forEach((x, index) => {
                let pf = document.querySelectorAll(`.player${index + 1}`);
                if (x.myTurn == true) {
                    pf[0].classList.add('active')
                    pf[1].classList.add('active')

                }
            });
        }
        // sort fields by Player
    player_fields(fields) { // Fields element in parameter
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
    startGame() {
        swal("Select Game Mode:", {
                buttons: {
                    catch: {
                        text: "Two Players",
                        value: "two",
                    },
                    defeat: {
                        text: "Four Players",
                        value: "four",
                    },
                    cancel: "Cancel",
                },
            })
            .then((value) => {
                switch (value) {
                    case "two":
                        this.start_twoPlayers();
                        break;
                    case "four":
                        this.start_fourPlayers();
                        break;
                    default:
                        swal("Godbey ", {
                            buttons: false,
                            timer: 1000,
                        });
                }
            });
    }
    start_twoPlayers() {
        // let player1 = 'Player 1'; // Test Data
        // let player2 = 'Player 2'; // Test Data
        // let player1 = prompt("Name of player one?");
        // let player2 = prompt("Name of player two?");
        swal("Name of player one?", {
                content: "input",
            })
            .then((player1) => {
                let p1 = player1 == '' ? 'Player 1' : player1
                this.addPlayer(p1);
                let player_one = document.querySelectorAll(".player_name1");
                player_one[0].innerHTML = p1;
                player_one[1].innerHTML = p1;
            }).then(() => {
                swal("Name of player two?", {
                    content: "input",
                }).then((player2) => {
                    let p2 = player2 == '' ? 'Player 2' : player2
                    this.addPlayer(p2);
                    let player_two = document.querySelectorAll(".player_name2");
                    player_two[0].innerHTML = p2;
                    player_two[1].innerHTML = p2;
                }).then(() => {
                    this.player_is_active();

                })
            });
    }
    start_fourPlayers() {
        swal("Name of player one?", {
                content: "input",
            })
            .then((player1) => {
                let p1 = player1 == '' ? 'Player 1' : player1
                this.addPlayer(p1);
                let player_one = document.querySelectorAll(".player_name1");
                player_one[0].innerHTML = p1;
                player_one[1].innerHTML = p1;
            }).then(() => {
                swal("Name of player two?", {
                    content: "input",
                }).then((player2) => {
                    let p2 = player2 == '' ? 'Player 2' : player2
                    this.addPlayer(p2);
                    let player_two = document.querySelectorAll(".player_name2");
                    player_two[0].innerHTML = p2;
                    player_two[1].innerHTML = p2;
                }).then(() => {
                    swal("Name of player three?", {
                            content: "input",
                        })
                        .then((player3) => {
                            let p3 = player3 == '' ? 'Player 3' : player3
                            this.addPlayer(p3);
                            let player_three = document.querySelectorAll(".player_name3");
                            player_three[0].innerHTML = p3;
                            player_three[1].innerHTML = p3;
                        }).then(() => {
                            swal("Name of player four?", {
                                content: "input",
                            }).then((player4) => {
                                let p4 = player4 == '' ? 'Player 4' : player4
                                this.addPlayer(p4);
                                let player_four = document.querySelectorAll(".player_name4");
                                player_four[0].innerHTML = p4;
                                player_four[1].innerHTML = p4;
                            }).then(() => {
                                this.player_is_active();

                            })
                        });
                })
            });
    }
}
/* End Class Game*/
// let turns = 3;
let dice_array = [1, 2, 2, 5, 6];

let dices = new Dice();
let game = new Game();
// game.addPlayer('Kalle');
// game.addPlayer('Olle');


// dices.set_test_obj(dice_array) // To set test dice array
// dices.one_of_akind();
// dices.two_of_akind();
// dices.three_of_akind();
// dices.four_of_akind();

// console.log(dice1.small_straight());
// console.log(dice1.large_straight());
// console.log(dice1.has_yatzy());
// console.log(dice1.FullHouse());
// console.log(dice1.get_die_of_akind());



document.addEventListener("DOMContentLoaded", function(e) {

    // Start Game
    game.startGame();

    let allDices = document.querySelectorAll(".dice_area .dice_list .dice_span");
    let upper_section = Array.from(document.querySelectorAll('.upper_section td'));
    let lower_section = Array.from(document.querySelectorAll('.lower_section td'));

    let startbtn = document.getElementById('startbtn');
    let throw_span = document.getElementById('throw_span');

    let fields = Array.from(document.querySelectorAll('.upper_section td')); // 
    let sum_bonus_section = Array.from(document.querySelectorAll('.sum_bonus_section td')); // 

    startbtn.addEventListener('click', dice_checkbox);

    function dice_elements() {
        if (game.turns == 1) {
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
        game.turns--
            throw_span.textContent = game.turns;
    }

    function dice_checkbox() {
        let checkboxes = Array.from(document.querySelectorAll(".dice input"));
        // if (game.turns == 1) {
        //     this.setAttribute('disabled', 'disabled');
        //     game.change_player_turn();
        // }
        game.turns--;
        let checked_boxes = checkboxes.filter(current_checkbox => {
            return current_checkbox;
        }, []);
        let dice = game.dices.dice_objects;
        checked_boxes.forEach((el, index) => {
            if (!el.checked) {
                game.dices.chang_one_dice(index)
            }
            if (game.turns == 0) {
                el.previousElementSibling.innerHTML = `<img src="./images/dices/Alea_0.png">`;
                el.checked = false;
            } else {
                el.previousElementSibling.innerHTML = `<img src="./images/dices/Alea_${dice[index].value}.png">`;
            }

        });
        upper_section_table();
        upper_section_sum();
        lower_section_table();
        if (game.turns == 0) {
            game.change_player_turn();
            game.turns = 3;
        }
        throw_span.textContent = game.turns;
    }

    function upper_section_table() {
        let fields = game.player_fields(upper_section)
        let dice = game.dices.dice_values;
        for (let p = 0; p < fields.length; p++) {
            const field = fields[p];
            let player = game.players[p];
            let td = field[player.name];
            if (player.myTurn) {
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
    }

    function upper_section_sum() {

        let fields = game.player_fields(upper_section);
        let sum_fields = game.player_fields(sum_bonus_section);
        let sum = [];
        for (let p = 0; p < fields.length; p++) {
            const field = fields[p];
            let player = game.players[p];
            let td = field[player.name];

            let sum_f = sum_fields[p];
            let td_sum = sum_f[player.name]
            for (let i = 0; i < td_sum.length; i++) {
                const element = td_sum[i];
                let sum = td.reduce(
                    (accumulator, currentValue) => accumulator + Number(currentValue.innerHTML), 0);
                if (element.dataset.td == 'sum' && sum > 0) {
                    element.innerHTML = sum;
                } else if (element.dataset.td == 'bonus' && sum >= 63) {
                    element.innerHTML = 25;
                }
            }
        }
    }

    function lower_section_table() {
        let fields = game.player_fields(lower_section);

        for (let p = 0; p < fields.length; p++) {
            const field = fields[p];
            let player = game.players[p];
            let td = field[player.name];
            if (player.myTurn) {
                for (let i = 0; i < td.length; i++) {
                    const element = td[i];
                    if (element.dataset.td == 'one_of_akind') {
                        let result = game.dices.one_of_akind();
                        if (result == 0) {
                            element.innerHTML = '';
                        } else {
                            element.innerHTML = result;
                        }
                    } else if (element.dataset.td == 'two_of_akind') {
                        let result = game.dices.two_of_akind();
                        if (result == 0) {
                            element.innerHTML = '';
                        } else {
                            element.innerHTML = result;
                        }
                    } else if (element.dataset.td == 'three_of_akind') {
                        let result = game.dices.three_of_akind();
                        if (result == 0) {
                            element.innerHTML = '';
                        } else {
                            element.innerHTML = result;
                        }
                    } else if (element.dataset.td == 'four_of_akind') {
                        let result = game.dices.four_of_akind();
                        if (result == 0) {
                            element.innerHTML = '';
                        } else {
                            element.innerHTML = result;
                        }
                    } else if (element.dataset.td == 'small_straight') {
                        let result = game.dices.small_straight();
                        if (result == 0) {
                            element.innerHTML = '';
                        } else {
                            element.innerHTML = result;
                        }
                    } else if (element.dataset.td == 'large_straight') {
                        let result = game.dices.large_straight();
                        if (result == 0) {
                            element.innerHTML = '';
                        } else {
                            element.innerHTML = result;
                        }
                    } else if (element.dataset.td == 'FullHouse') {
                        let result = game.dices.FullHouse();
                        if (result == 0) {
                            element.innerHTML = '';
                        } else {
                            element.innerHTML = result;
                        }
                    } else if (element.dataset.td == 'yatzy') {
                        let result = game.dices.yatzy();
                        if (result == 0) {
                            element.innerHTML = '';
                        } else {
                            element.innerHTML = result;
                        }
                    }
                }
            }
        }
    }
})