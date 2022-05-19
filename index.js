let players = [];
let turn = 0;
let gameover = false;
let totalcells = document.getElementById("totalcells");
let dimen = parseInt(totalcells.value);
let board = new Array(dimen).fill("").map(() => new Array(dimen).fill(""));

const changeCells = () => {
  dimen = parseInt(event.target.value);
  board = new Array(dimen).fill("").map(() => new Array(dimen).fill(""));
};

totalcells.addEventListener("change", changeCells);

const startgame = () => {
  let input1 = document.getElementById("p1");
  let input2 = document.getElementById("p2");
  let player1 = input1.value;
  let player2 = input2.value;

  if (isEmpty(player1) || isEmpty(player2)) {
    swal({
      icon: "error",
      text: "Please fill the required fields.",
      button: "Ok!"
    });
    return;
  }
  let el = document.getElementById("game_container");
  el.classList.remove("hide");

  input1.setAttribute("disabled", true);
  input2.setAttribute("disabled", true);
  totalcells.setAttribute("disabled", true);

  players.push(player1);
  players.push(player2);
  document.getElementById("turn").innerHTML = `${players[0]} go ahead!!`;

  //creating cells
  for (let x = 0; x < dimen; x++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let y = 0; y < dimen; y++) {
      let column = document.createElement("div");
      column.classList.add("column");
      column.addEventListener("click", () => handleclick(column, x, y));
      column.setAttribute("id", x.toString() + y.toString());
      row.appendChild(column);
    }
    game_container.appendChild(row);
  }
};

const isEmpty = (value) => !value || !value.trim();

const calculatewinner = () => {
  let len = board.length;
  if (turn < len) {
    return false;
  }

  //check for column
  for (let i = 0; i < len; i++) {
    if (board[i].every((el) => el === board[i][0] && el !== "")) {
      return true;
    }

    let start_col_val = board[0][i];
    let count = 1;
    for (let j = 1; j < len; j++) {
      if (start_col_val === board[j][i] && start_col_val !== "") {
        count++;
      }
    }

    if (count === len) {
      return true;
    }
  }

  //check for diagonal
  let i = board[0][0];
  let j = 0;
  while (j < len) {
    if (board[0][0] === "") {
      break;
    }
    if (board[j][j] !== i) {
      break;
    } else {
      j++;
    }
  }

  if (j === len) {
    return true;
  }

  //checking opposite diagonal
  let opp_i = 0;
  let opp_j = len - 1;
  let opp_val = board[opp_i][opp_j];
  while (opp_i < len) {
    if (board[opp_i][opp_j] === "") {
      break;
    }
    if (opp_val !== board[opp_i][opp_j]) {
      break;
    } else {
      opp_i++;
      opp_j--;
    }
  }

  if (opp_i === len) {
    return true;
  }

  return false;
};

const handleclick = (column, i, j) => {
  const el = column;
  if (el.innerHTML != "" || gameover) {
    return;
  }

  board[i][j] = turn % 2 === 0 ? "X" : "O";
  el.innerHTML = board[i][j];
  console.log(turn);
  turn++;

  if (calculatewinner()) {
    swal({
      title: "Bravo!!",
      text: players[turn % 2] + " won"
    }).then(function () {
      window.location.href = "index.html";
      console.log("The Ok Button was clicked.");
    });
    gameover = true;
    return;
  }

  document.getElementById("turn").innerHTML = players[turn % 2] + " go ahead!!";
  if (turn === dimen * dimen) {
    swal({
      title: "It's a Draw!!",
      icon: "warning"
    }).then(function () {
      window.location.href = "index.html";
      console.log("ok was clicked.");
    });
    gameover = true;
    return;
  }
};
