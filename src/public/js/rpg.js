var app = {
  game: document.getElementById("game"),
  player: {
    x: 0,
    y: 0,
    direction: "right",
    moves: 0,
  },
  targetCell: {
    x: 5,
    y: 3,
  },
  gameOver: false,
  init: function () {
    console.log("init !");
    app.keyDown();
    app.drawBoard();
    // setInterval(() => {
    //   app.randomSuccess();
    //   app.reDrawBoard();
    // }, 5000);
  },
  randomSuccess: function () {
    app.targetCell.x = Math.floor(Math.random() * (5 - 0) + 0);
    app.targetCell.y = Math.floor(Math.random() * (3 - 0) + 0);
  },
  isGameOver: function () {
    if (
      app.player.x === app.targetCell.x &&
      app.player.y === app.targetCell.y
    ) {
      app.gameOver = true;
      setTimeout(() => {
        app.player.x = 0;
        app.player.y = 0;
        app.player.direction = "right";
        app.player.moves = 0;
        app.gameOver = false;
        app.targetCell.x = 5;
        app.targetCell.y = 3;
        this.reDrawBoard();
      }, 5000);
    }
  },
  keyDown: function () {
    document.addEventListener("keydown", function logKey(event) {
      switch (event.code) {
        case "ArrowUp":
          app.moveForward();
          break;
        case "ArrowDown":
          app.moveBackward();
          break;
        case "ArrowLeft":
          app.turnLeft();
          break;
        case "ArrowRight":
          app.turnRight();
          break;
      }
    });
  },
  drawBoard: function () {
    let x = -1;
    let y = 0;
    class Board {
      constructor(parentId, size, width, height) {
        this.parent = document.getElementById(parentId);
        this._element = document.createElement("div");
        this._element.setAttribute("id", "container");
        this._element.style.maxWidth = `${size * width + 2 * width}px`;
        this._element.style.height = `${size * height + 2 * height}px`;
        this.parent.append(this._element);
        this.ref = document.getElementById("container");
      }
    }
    class Moves {
      constructor() {
        this.parent = document.getElementById("game");
        this._element = document.createElement("div");
        this._element.setAttribute("id", "moves");
        this._element.innerHTML = `Vous avez fait ${app.player.moves} mouvements`;
        this.parent.append(this._element);
        this.ref = document.getElementById("moves");
      }
    }
    class Cell {
      constructor(parentId, i, x, y) {
        this.parent = parentId;
        this.x = x;
        this.y = y;
        this._element = document.createElement("div");
        this._element.setAttribute("id", `cell${i}`);
        this._element.setAttribute("class", "cell");
        this.parent.append(this._element);
        this.ref = document.getElementById(`cell${i}`);
      }
    }
    class Player {
      constructor(parentId) {
        this.parent = parentId;
        this._element = document.createElement("div");
        this._element.setAttribute("id", `player`);
        this._element.setAttribute("class", `player ${app.player.direction}`);
        this.parent.append(this._element);
        this.ref = document.getElementById(`player`);
      }
    }
    const gridDraw = new Board("game", 70, 6, 4);
    const movesDraw = new Moves();
    for (let i = 0; i < 24; i++) {
      x++;
      if (i === 6 || i === 12 || i === 18) x = 0;
      if (
        (x === 0 && i === 6) ||
        (x === 0 && i === 12) ||
        (x === 0 && i === 18)
      )
        y++;
      let cellDraw = new Cell(gridDraw.ref, i, x, y);
      if (cellDraw.x === app.targetCell.x && cellDraw.y === app.targetCell.y) {
        cellDraw._element.classList.add("targetCell");
      }
      if (cellDraw.x === app.player.x && cellDraw.y === app.player.y) {
        const player = new Player(cellDraw.ref);
      }
    }
    app.isGameOver();
  },
  clearBoard: function () {
    game.innerHTML = "";
  },
  reDrawBoard: function () {
    app.clearBoard();
    app.drawBoard();
  },

  turnLeft: function () {
    const playerClass = document.getElementById("player");
    if (app.gameOver !== true) {
      switch (app.player.direction) {
        case "right":
          app.player.direction = "up";
          playerClass.className = "player up";
          app.player.moves++;
          app.reDrawBoard();
          break;
        case "up":
          app.player.direction = "left";
          playerClass.className = "player left";
          app.player.moves++;
          app.reDrawBoard();
          break;
        case "left":
          app.player.direction = "down";
          playerClass.className = "player down";
          app.player.moves++;
          app.reDrawBoard();
          break;
        case "down":
          app.player.direction = "right";
          playerClass.className = "player right";
          app.player.moves++;
          app.reDrawBoard();
          break;
      }
    }
  },
  turnRight: function () {
    const playerClass = document.getElementById("player");
    if (app.gameOver === true) return;
    switch (app.player.direction) {
      case "right":
        app.player.direction = "down";
        playerClass.className = "player down";
        app.player.moves++;
        app.reDrawBoard();
        break;
      case "down":
        app.player.direction = "left";
        playerClass.className = "player left";
        app.player.moves++;
        app.reDrawBoard();
        break;
      case "left":
        app.player.direction = "up";
        playerClass.className = "player up";
        app.player.moves++;
        app.reDrawBoard();
        break;
      case "up":
        app.player.direction = "right";
        playerClass.className = "player right";
        app.player.moves++;
        app.reDrawBoard();
        break;
    }
  },
  moveForward: function () {
    if (app.gameOver === true) return;
    switch (app.player.direction) {
      case "right":
        if (app.player.x === 5) {
          app.player.x = 5;
          app.reDrawBoard();
        } else {
          app.player.x++;
          app.player.moves++;
          app.reDrawBoard();
        }
        break;
      case "left":
        if (app.player.x === 0) {
          app.player.x = 0;
          app.reDrawBoard();
        } else {
          app.player.x--;
          app.player.moves++;
          app.reDrawBoard();
        }
        break;
      case "down":
        if (app.player.y === 3) {
          app.player.y = 3;
          app.reDrawBoard();
        } else {
          app.player.y++;
          app.player.moves++;
          app.reDrawBoard();
        }
        break;
      case "up":
        if (app.player.y === 0) {
          app.player.y = 0;
          app.reDrawBoard();
        } else {
          app.player.y--;
          app.player.moves++;
          app.reDrawBoard();
          break;
        }
    }
  },
  moveBackward: function () {
    if (app.gameOver === true) return;
    switch (app.player.direction) {
      case "right":
        if (app.player.x === 0) {
          app.player.x = 0;
          app.reDrawBoard();
        } else {
          app.player.x--;
          app.player.moves++;
          app.reDrawBoard();
        }
        break;
      case "left":
        if (app.player.x === 5) {
          app.player.x = 5;
          app.reDrawBoard();
        } else {
          app.player.x++;
          app.player.moves++;
          app.reDrawBoard();
        }
        break;
      case "down":
        if (app.player.y === 0) {
          app.player.y = 0;
          app.reDrawBoard();
        } else {
          app.player.y--;
          app.player.moves++;
          app.reDrawBoard();
        }
        break;
      case "up":
        if (app.player.y === 3) {
          app.player.y = 3;
          app.reDrawBoard();
        } else {
          app.player.y++;
          app.player.moves++;
          app.reDrawBoard();
          break;
        }
    }
  },
};

document.addEventListener("DOMContentLoaded", app.init);
