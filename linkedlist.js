export class LinkedList {
  constructor() {
    this.head = null;
  }

  append(key, value) {
    if (this.head === null) {
      this.head = new Node();
      this.head.value = value;
      this.head.key = key;
      return;
    }

    let tmp = this.head;
    while (tmp.nextNode !== null) {
      tmp = tmp.nextNode;
    }
    const last = new Node();
    tmp.nextNode = last;
    last.value = value;
    last.key = key;
  }

  prepend(key, value) {
    if (this.head === null) {
      this.head = new Node();
      this.head.value = value;
      this.head.key = key;
      return;
    }

    const tmp = new Node();
    tmp.value = value;
    tmp.key = key;
    tmp.nextNode = this.head;
    this.head = tmp;
  }

  size() {
    if (this.head === null) return 0;

    let count = 0;
    let tmp = this.head;
    while (tmp !== null) {
      count++;
      tmp = tmp.nextNode;
    }
    return count;
  }

  Head() {
    return this.head;
  }

  tail() {
    if (this.head === null) return this.head;

    let tail = this.head;
    while (tail.nextNode !== null) {
      tail = tail.nextNode;
    }
    return tail;
  }

  at(index) {
    let count = 0;
    if (this.head === null) return this.head;

    let tmp = this.head;
    while (tmp !== null) {
      if (index === count) return tmp;
      count++;
      tmp = tmp.nextNode;
    }
    return null;
  }

  pop() {
    if (this.head === null) return;

    if (this.head.nextNode === null) {
      this.head = null;
      return;
    }

    let last = this.head;
    let before = null;
    while (last.nextNode !== null) {
      before = last;
      last = last.nextNode;
    }
    before.nextNode = null;
  }

  contains(key) {
    if (this.head === null) return false;

    let tmp = this.head;
    while (tmp !== null) {
      if (key === tmp.key) return true;
      tmp = tmp.nextNode;
    }
    return false;
  }

  find(key) {
    if (this.head === null) return this.head;

    let tmp = this.head;
    let count = 0;
    while (tmp !== null) {
      if (key === tmp.key) return count;
      count++;
      tmp = tmp.nextNode;
    }
    return null;
  }

  toString() {
    if (this.head === null) return `null`;

    let string = "";
    let tmp = this.head;
    while (tmp !== null) {
      string += `(${tmp.value}) -> `;
      tmp = tmp.nextNode;
    }
    string += "null";
    return string;
  }

  removeAt(index) {
    if (this.head === null) return;
    if (index === 0) {
      let tmp = this.head.nextNode;
      this.head = tmp;
      return;
    }

    let before = this.head;
    let next = before.nextNode;
    let count = 1;
    while (next !== null) {
      if (index === count) {
        before.nextNode = next.nextNode;
        return;
      }
      before = next;
      next = next.nextNode;
      count++;
    }
  }

  overwrite(key, value) {
    if (this.head === null) return;

    let node = this.head;
    while (node !== null) {
      if (key === node.key) {
        node.value = value;
        return;
      }
      node = node.nextNode;
    }
  }
}

class Node {
  constructor() {
    this.key = null;
    this.value = null;
    this.nextNode = null;
  }
}
