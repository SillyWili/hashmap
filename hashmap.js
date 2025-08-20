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
    const factor = Math.round(this.growFactor());
    if (this.#insertIntoArray(this.data, key, value)) {
      this.#grow(factor);
    }
  }

  get(key) {
    const hashCode = this.hash(key);
    if (this.data[hashCode] !== undefined) {
      let head = this.data[hashCode].Head();
      while (head !== null) {
        if (head.key === key) {
          return head.value;
        }
        head = head.nextNode;
      }
    }
    return null;
  }

  has(key) {
    const hashCode = this.hash(key);
    if (this.data[hashCode] !== undefined) {
      let head = this.data[hashCode].Head();
      while (head !== null) {
        if (head.key === key) {
          return true;
        }
        head = head.nextNode;
      }
    }
    return false;
  }

  remove(key) {
    const hashCode = this.hash(key);
    if (this.data[hashCode] !== undefined) {
      const index = this.data[hashCode].find(key);
      if (index !== null) {
        this.data[hashCode].removeAt(index);
        this.stored--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.stored;
  }

  clear() {
    this.data.fill(undefined);
    this.stored = 0;
  }

  keys() {
    let keyArr = [];
    this.data.forEach((list) => {
      if (list !== undefined) {
        let head = list.Head();
        while (head !== null) {
          keyArr.push(head.key);
          head = head.nextNode;
        }
      }
    });
    return keyArr;
  }

  values() {
    let valuesArr = [];
    this.data.forEach((list) => {
      if (list !== undefined) {
        let head = list.Head();
        while (head !== null) {
          valuesArr.push(head.value);
          head = head.nextNode;
        }
      }
    });
    return valuesArr;
  }

  entries() {
    let pairArr = [];
    this.data.forEach((list) => {
      if (list !== undefined) {
        let head = list.Head();
        while (head !== null) {
          pairArr.push([head.key, head.value]);
          head = head.nextNode;
        }
      }
    });
    return pairArr;
  }

  #grow(factor) {
    if (this.stored >= factor) {
      this.stored = 0;
      this.capacity *= 2;
      let newArr = Array(this.capacity).fill(undefined);
      this.data.forEach((list) => {
        let head = list.Head();
        while (head !== null) {
          this.#insertIntoArray(newArr, head.key, head.value);
          head = head.nextNode;
        }
      });
      this.data = newArr;
    }
  }

  #insertIntoArray(array, key, value) {
    const hashCode = this.hash(key);
    if (array[hashCode] === undefined) {
      const slot = new LinkedList();
      slot.append(key, value);
      array[hashCode] = slot;
      this.stored++;
    } else {
      if (array[hashCode].contains(key)) {
        array[hashCode].overwrite(key, value);
        return false;
      } else {
        array[hashCode].append(key, value);
        this.stored++;
      }
    }
    return true;
  }
}
