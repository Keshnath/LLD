interface IPoint {
  x: number;
  y: number;
  deepCopy(): IPoint;
}

class Point implements IPoint {
  constructor(public x: number, public y: number) {}

  deepCopy(): IPoint {
    return new Point(this.x, this.y);
  }
}

const p1: IPoint = new Point(1, 2);
const p2 = p1.deepCopy();

p2.x = 10;

console.log(p1.x); // 1 ✅
