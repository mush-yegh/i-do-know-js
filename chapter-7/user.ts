interface IWithIdentity {
  id: number;
}

class User implements IWithIdentity {
  public id: number;
  public name: string;
  public todoList: MyList<Todo>;

  constructor(id: number, name: string, todoList: MyList<Todo>) {
    this.id = id;
    this.name = name;
    this.todoList = todoList;
  }
}

class Todo implements IWithIdentity {
  public id: number;
  public title: string;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }
}

class MyList<T extends IWithIdentity> {
  private values: Array<T>;

  constructor() {
    this.values = [];
  }

  private find(id: number): T | undefined {
    return this.values.find((elem: T) => elem.id === id);
  }

  public add(item: T): void {
    if (!this.find(item.id)) {
      this.values.push(item);
    }
  }

  public findById(id: number): T | null {
    const found = this.find(id);
    return found ? found : null;
  }

  public deleteById(id: number): boolean {
    const filteredValues = this.values.filter((elem) => elem.id !== id);
    if (filteredValues.length === this.values.length) {
      return false;
    }
    this.values = filteredValues;
    return true;
  }

  getValues(): T[] {
    return this.values;
  }
}

const usersList = new MyList<User>();

usersList.add({
  id: 1,
  name: "User 1",
  todoList: new MyList<Todo>(),
});

console.log("usersList: ", usersList);

const user1 = usersList.findById(1);
console.log("user1: ", user1);

if (user1) {
  user1.todoList.add({
    id: 1,
    title: "Title-1",
  });

  user1.todoList.add({
    id: 1,
    title: "Title-1",
  });
  user1.todoList.add({
    id: 2,
    title: "Title-2",
  });
  user1.todoList.add({
    id: 3,
    title: "Title-3",
  });
  user1.todoList.add({
    id: 4,
    title: "Title-4",
  });
  user1.todoList.add({
    id: 5,
    title: "Title-5",
  });

  console.log("user1 -> todoList: ", user1.todoList);
}

usersList.add({
  id: 2,
  name: "User2",
  todoList: new MyList(),
});

const user2 = usersList.findById(2);
if (user2) {
  user2.todoList.add({
    id: 1,
    title: "Go to school",
  });

  console.log("user2 -> todoList (1): ", user2.todoList);

  user2.todoList.add({
    id: 2,
    title: "Go to work",
  });
  console.log("user2 -> todoList (2): ", user2.todoList);

  user2.todoList.deleteById(2);
  console.log("user2 -> todoList (3): ", user2.todoList);
}
