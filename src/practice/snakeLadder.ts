/*
Before designing, answer these:

Board size? (assume 10x10 = 100 cells unless told otherwise)
Multiple players? (yes)
Dice: 1 or multiple? (start with 1)
Snakes & ladders predefined? (yes)
Winning condition: exact 100 or ≥100?

👉 We’ll assume:

2+ players
1 dice
Exact win (must land on 100)
Predefined snakes/ladders

*/

class Player {
  public name: string = "";
  public currentPosition: number = 0;
  constructor(name: string, currentPosition: number) {
    this.currentPosition = currentPosition;
    this.name = name;
  }
}

class Jump {
  constructor(
    public start: number,
    public end: number,
  ) {}
}
class Dice {
  roll(): number {
    return Math.floor(Math.random() * 6 + 1);
  }
}

class Board {
  size: number;
  jumps: Map<number, number>;
  constructor(size: number, jumps: Jump[]) {
    this.size = size;
    this.jumps = new Map();
    for (let j of jumps) {
      this.jumps.set(j.start, j.end);
    }
  }

  getNextPosition(pos: number): number {
    if (this.jumps.has(pos)) {
      return this.jumps.get(pos)!;
    }
    return pos;
  }
}

class Game {
  public players: Player[] = [];
  public board: Board;
  public dice: Dice;
  public currentTurn: number = 0;

  constructor(players: Player[], board: Board) {
    this.board = board;
    this.dice = new Dice();
    this.players = players;
  }

  playTurn(): Player | null {
    const player = this.players[this.currentTurn];
    console.log("🚀 ~ Game ~ playTurn ~ player:", player)
    const pos = this.dice.roll();
    console.log("🚀 ~ Game ~ playTurn ~ pos:", pos)

    let nextPos = player.currentPosition + pos;
    if (nextPos > this.board.size) {
      this.nextTurn();
      return null;
    }
    nextPos = this.board.getNextPosition(nextPos);
    player.currentPosition = nextPos;
    if (nextPos === this.board.size) {
      return player;
    }
    this.nextTurn();
    return null;
  }

  nextTurn(): void {
    this.currentTurn = (this.currentTurn + 1) % this.players.length;
  }
}



const players = [
    new Player("A" , 0),
    new Player("B" , 0)
];
const jumps = [
    new Jump(2, 38),   // ladder
    new Jump(16, 6),   // snake
    new Jump(8, 31),
    new Jump(49, 11)
];
const board = new Board(100, jumps);

const game = new Game(players, board);

let winner: Player | null = null;

while (!winner) {
  winner = game.playTurn();
}

console.log(`Winner is ${winner.name}`);