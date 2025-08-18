class HashMap {
  constructor() {
    this.loadFactor = 0.8;
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
}
