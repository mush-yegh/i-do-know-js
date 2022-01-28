/*
function nameDecorator() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const draw = descriptor.value;
    descriptor.value = function () {
      console.log(draw.apply(this));
    };
  };
}
*/

abstract class Shape {
  protected abstract id: string;
  private name: string;
  private sidesCount: number;

  constructor(name: string, sidesCount: number) {
    this.name = name;
    this.sidesCount = sidesCount;
  }

  public abstract computePerimeter(): number;
  public abstract clone(): Shape;

  public getSidesCount(): number {
    return this.sidesCount;
  }

  // @nameDecorator()
  public draw(): string {
    return this.name;
  }

  public equals(obj: Shape): boolean {
    return obj.id === this.id;
  }
}

class Square extends Shape {
  private static NAME: string = "Square";
  private static SIDES_COUNT: number = 4;
  private static index = 0;
  protected id: string;
  private side: number;

  constructor(side: number);
  constructor(instance: Square); // copy constructor
  constructor(...args: [number] | [Square]) {
    super(Square.NAME, Square.SIDES_COUNT);
    if (typeof args[0] === "number") {
      this.id = `${Square.NAME}_${Square.index++}`;
      this.side = args[0];
    } else {
      this.id = args[0].id;
      this.side = args[0].side;
    }
  }

  public computePerimeter(): number {
    return Square.SIDES_COUNT * this.side;
  }

  public clone(): Shape {
    const square = this as Square;
    const clone = new Square(square);
    return clone;
  }
}

class Triangle extends Shape {
  private static NAME: string = "Triangle";
  private static SIDES_COUNT: number = 3;
  private static index = 0;
  protected id: string;
  private sideA: number;
  private sideB: number;
  private sideC: number;

  constructor(sideA: number, sideB: number, sideC: number);
  constructor(instance: Triangle); // copy constructor
  constructor(...args: [number, number, number] | [Triangle]) {
    super(Triangle.NAME, Triangle.SIDES_COUNT);
    if (args.length === 3) {
      this.id = `${Triangle.NAME}_${Triangle.index++}`;
      this.sideA = args[0];
      this.sideB = args[1];
      this.sideC = args[2];
    } else {
      this.id = args[0].id;
      this.sideA = args[0].sideA;
      this.sideB = args[0].sideB;
      this.sideC = args[0].sideC;
    }
  }

  public computePerimeter(): number {
    return this.sideA + this.sideB + this.sideC;
  }

  public clone(): Shape {
    const triangle = this as Triangle;
    const clone = new Triangle(triangle);
    return clone;
  }
}

type Predicate = (i: Shape) => boolean;

class List<T extends Shape> {
  private values: Shape[];

  constructor(initValues?: T[]) {
    this.values = initValues ? new Array(...initValues) : new Array();
  }

  add(item: Shape): Shape[] {
    this.values.push(item.clone());
    return this.values;
  }

  remove(item: T): boolean {
    const filteredValues = this.values.filter((elem) => elem.equals(item));
    if (filteredValues.length === this.values.length) {
      return false;
    }
    this.values = filteredValues;
    return true;
  }

  static from(items: Shape[]): List<Shape> {
    const shapelist = new List<Shape>();
    items.forEach((shape) => {
      shapelist.add(shape.clone());
    });
    return shapelist;
  }

  getValues(): Shape[] {
    const copy = new Array(this.values.length);
    for (let i = 0; i < copy.length; i++) {
      copy[i] = this.values[i].clone();
    }
    return copy;
  }

  filter(predicate: Predicate): Shape[] {
    return this.values.filter(predicate);
  }
}

//   Example
const shapes = new List<Shape>();

shapes.add(new Square(4));
shapes.add(new Square(5));
shapes.add(new Triangle(3, 4, 5));
shapes.add(new Triangle(7, 4, 8));

shapes.getValues().forEach((shape) => {
  console.log(
    "Shape:",
    shape.draw(),
    "sides:",
    shape.getSidesCount(),
    "perimeter:",
    shape.computePerimeter()
  );
});

const squares = shapes.filter((item: Shape) => item.getSidesCount() === 4);
console.log("\nFiltered list: ", squares);

const newShapes = List.from([new Square(6), new Triangle(3, 4, 5)]);
console.log("\nList created with static method 'from': \n", newShapes);
