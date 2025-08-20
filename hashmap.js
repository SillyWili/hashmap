import { LinkedList } from "./linkedlist.js";

class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.stored = 0;
    this.data = Array(this.capacity).fill(undefined);
    this.growFactor = () => {
      return this.capacity * this.loadFactor;
    };
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.capacity; // so the number does not overflow
    }

    return hashCode;
  }

  set(key, value) {
    const hashCode = this.hash(key);

    const factor = Math.round(this.growFactor());

    if (this.data[hashCode] === undefined) {
      const slot = new LinkedList();
      slot.append(key, value);
      this.data[hashCode] = slot;
      this.stored++;
      this.grow(factor);
    } else {
      if (this.data[hashCode].contains(key)) {
        this.data[hashCode].overwrite(key, value);
      } else {
        this.data[hashCode].append(key, value);
        this.stored++;
        this.grow(factor);
      }
    }
  }

  grow(factor) {
    if (this.stored >= factor) {
      this.stored = 0;
      this.capacity *= 2;
      let newArr = Array(this.capacity).fill(undefined);
      this.data.forEach((list) => {
        let head = list.Head();
        while (head !== null) {
          const hashCode = this.hash(head.key);
          if (newArr[hashCode] === undefined) {
            const slot = new LinkedList();
            slot.append(head.key, head.value);
            newArr[hashCode] = slot;
            this.stored++;
          } else {
            if (newArr[hashCode].contains(head.key)) {
              newArr[hashCode].overwrite(head.key, head.value);
            } else {
              newArr[hashCode].append(head.key, head.value);
              this.stored++;
            }
          }
          head = head.nextNode;
        }
      });
      this.data = newArr;
    }
  }
}
