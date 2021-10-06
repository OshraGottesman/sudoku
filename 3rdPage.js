let difficulty = window.location.search;
difficulty = difficulty.substring(1);
let timer_run = true;
let m = 0;
let s = 0;
let array_of_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const sudoku_template = [
    ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
    ["d", "e", "f", "g", "h", "i", "a", "b", "c"],
    ["g", "h", "i", "a", "b", "c", "d", "e", "f"],
    ["b", "c", "a", "e", "f", "d", "h", "i", "g"],
    ["e", "f", "d", "h", "i", "g", "b", "c", "a"],
    ["h", "i", "g", "b", "c", "a", "e", "f", "d"],
    ["c", "a", "b", "f", "d", "e", "i", "g", "h"],
    ["f", "d", "e", "i", "g", "h", "c", "a", "b"],
    ["i", "g", "h", "c", "a", "b", "f", "d", "e"]
];
let solved_board;
let unsolved_board = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
]
function startTime() {
    if (s == 59) {
        m++;
        s = 0;
    }
    else {
        s++;
    }
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('timer').innerHTML = m + ":" + s;
    if (timer_run) {
        setTimeout(startTime, 1000);
    }
}
function checkTime(i) {
    i = parseInt(i);
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}
function put_numbers_in_board(board, random_numbers) { //puts numbers in board
    let mapping = {
        a:random_numbers[0],
        b:random_numbers[1],
        c:random_numbers[2],
        d:random_numbers[3],
        e:random_numbers[4],
        f:random_numbers[5],
        g:random_numbers[6],
        h:random_numbers[7],
        i:random_numbers[8]
    };
    for(let i=0;i<81;i++){
        board[Math.floor(i / 9)][i % 9]=mapping[board[Math.floor(i / 9)][i % 9]];
    }
    return board;
}
function create_array_of_3_random_numbers(array_of_3) {
    let random_of_3 = [];
    while (array_of_3.length != 0) {
        temp = Math.floor(Math.random() * (array_of_3.length))
        random_of_3.push(array_of_3[temp]);
        array_of_3.splice(temp, 1);
    }
    return random_of_3;
}
function switch_3_colums(board, random_of_3, starting_point) { //takes 3 colums and switches them randomly
    let temp_board = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            temp_board[i][j] = board[i][j];
        }
    }
    for (let c = starting_point; c < starting_point + 3; c++) {
        for (let r = 0; r < board.length; r++) {
            board[r][c] = temp_board[r][random_of_3[c % 3]];
        }
    }
    return board;
}
function switch_3_rows(board, random_of_3, starting_point) { //takes 3 rows and switches them randomly
    let temp_board = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            temp_board[i][j] = board[i][j];
        }
    }

    for (let r = starting_point; r < starting_point + 3; r++) {
        for (let c = 0; c < board.length; c++) {
            board[r][c] = temp_board[random_of_3[r % 3]][c];
        }
    }
    return board;
}
function randomize_board(board, array_of_numbers) {
    let random_numbers = [];
    while (array_of_numbers.length != 0) { //randomizes an array of 1-9
        let temp = Math.floor(Math.random() * (array_of_numbers.length - 1));
        random_numbers.push(array_of_numbers[temp]);
        array_of_numbers.splice(temp, 1);
    }
    board = put_numbers_in_board(board, random_numbers); 
    board = switch_3_colums(board, create_array_of_3_random_numbers([0, 1, 2]), 0);
    board = switch_3_colums(board, create_array_of_3_random_numbers([3, 4, 5]), 3);
    board = switch_3_colums(board, create_array_of_3_random_numbers([6, 7, 8]), 6);
    board = switch_3_rows(board, create_array_of_3_random_numbers([0, 1, 2]), 0);
    board = switch_3_rows(board, create_array_of_3_random_numbers([3,4,5]),3);
    board = switch_3_rows(board, create_array_of_3_random_numbers([6,7,8]),6);
    return board;
}
function generate_board_in_specefied_difficulty(amount_of_numbers_to_take_out){ //takes out numbers according to difficulty
    solved_board = randomize_board(sudoku_template, array_of_numbers);
    for(let i=0; i<solved_board.length; i++){  //duplicates board
        for(let j=0; j<solved_board[i].length; j++){
            unsolved_board[i][j]=solved_board[i][j];
        }
    }
    counter = 0;
    while(counter<amount_of_numbers_to_take_out){ // puts zero in random places
        let colum =  Math.floor(Math.random()*9);
        let row = Math.floor(Math.random()*9);
        if(unsolved_board[row][colum] != 0){
            unsolved_board[row][colum]=0;
            counter++;
        }
    }
    console.log(solved_board);
        for (i=0; i<81; i++){ //puts the board into html
            if (unsolved_board[Math.floor(i/9)][i%9] != 0) {
                document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(i/9)+1}) > td:nth-child(${i%9+1})`).innerText = unsolved_board[Math.floor(i/9)][i%9];
            } else { //puts an input insted of the 0
                document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(i/9)+1}) > td:nth-child(${i%9+1})`).innerHTML = ' <input class="input" type="number">';
            }
        }

    return unsolved_board;
}
console.log(generate_board_in_specefied_difficulty(difficulty));

function row_good(board){ // Check if row is good
    for ( var i = 0; i < 9; i++)
    {
        var cur = [];
        for ( var j = 0; j < 9; j++)
        {
            if ( cur.includes(board[i][j]) || board[i][j]<1 || board[i][j]>9){
                return false
            }
            else if (board[i][j] !=null)
            {
                cur.push(board[i][j]);
            }
        }
    }
    return true
}
function col_good(board){ // Check if col is good
    for ( var i = 0; i < 9; i++)
    {
        var cur = [];
        for ( var j = 0; j < 9; j++)
        {
            if ( cur.includes(board[j][i]) || board[j][i]<1 || board[j][i]>9){
                return false
            }
            else if (board[j][i] !=null)
            {
                cur.push(board[j][i]);
            }
        }
    }
    return true
}
function box_good(board){ // Check if box is good
    // Create coordinates for each box in the 9x9 matrix
    const box_coordinates = [
        [0,0],[0,1],[0,2],
        [1,0],[1,1],[1,2],
        [2,0],[2,1],[2,2]
    ];
    // Move three boxes at a time, top to bottom
    for ( var y = 0; y < 9; y+=3)
    {
        for ( var x = 0; x < 9; x+=3)
        {
            var cur = [];
            // assign coordinates
            for ( var i = 0; i < 9; i++)
            {
                var coordinates = [...box_coordinates[i]];
                coordinates[0] +=y;
                coordinates[1] +=x;
                if ( cur.includes(board[coordinates[0]][coordinates[1]]) || board[coordinates[0]][coordinates[1]]<1 || board[coordinates[0]][coordinates[1]]>9){
                    return false
                }
                else if (board[coordinates[0]][coordinates[1]] != null)
                {
                    cur.push(board[coordinates[0]][coordinates[1]]);
                }
            }
           
        }
    }
    return true
}
function check_finish(){
    let user_solved_board = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ]
    for (i=0; i<81; i++){ //gets the html board
        if(document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(i/9)+1}) > td:nth-child(${i%9+1})`).innerText==""){
            user_solved_board[Math.floor(i/9)][i%9] = document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(i/9)+1}) > td:nth-child(${i%9+1}) > input`).value;
        }
        else{
            user_solved_board[Math.floor(i/9)][i%9] = document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(i/9)+1}) > td:nth-child(${i%9+1})`).innerText;
        }
    }
    let flag = true;
    flag = row_good(user_solved_board) && col_good(user_solved_board) && box_good(user_solved_board);
    if(flag){
        document.getElementById("congradulations_alert").style.visibility = "visible";
        document.getElementById("congradulations").innerHTML = `Congradulations!! You Did It in ${m} minutes and ${s} seconds!`;
        timer_run = false;
        return true;
    }
    else{
        document.getElementById("try_again_alert").style.visibility = "visible";
        timer_run = false;
        return false;
    }
}
function restart(){ //deletes all inputs & restarts time
   let a= document.querySelectorAll(".input");
   for (i=0; i<a.length; i++){
      a[i].value = "";
      a[i].style.backgroundColor = "#fff7f8";
   }
   s = 0;
   m = 0;
}
function hint(){ //fills in a random input according to the original solved_board
    flag = true;
    while(flag){
        let random_number_for_hint = Math.floor(Math.random()*81);
        if(unsolved_board[Math.floor(random_number_for_hint/9)][random_number_for_hint%9] == 0 && document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(random_number_for_hint/9)+1}) > td:nth-child(${random_number_for_hint%9+1}) > input`).value == ""){
            document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(random_number_for_hint/9)+1}) > td:nth-child(${random_number_for_hint%9+1}) > input`).value = solved_board[Math.floor(random_number_for_hint/9)][random_number_for_hint%9];
            document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(random_number_for_hint/9)+1}) > td:nth-child(${random_number_for_hint%9+1}) > input`).style.color = "#f3224f";
            document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(random_number_for_hint/9)+1}) > td:nth-child(${random_number_for_hint%9+1}) > input`).style.backgroundColor = "pink";
            flag=false;
        }
        else{
            let a= document.querySelectorAll(".input");
            let counter = 0;
            for (i=0; i<a.length; i++){
               if(a[i].value != ""){
                    counter++;
               }
            }
            if(counter==a.length){ // if board is complete alert complete and break
                alert("Board is complete! press Finish")
                break;
            }
        }
    }
}
function switch_page() {
    location.assign("2ndpage.html");
}



