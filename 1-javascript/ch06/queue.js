class Queue {
  #capacity;
  #elements;

  constructor(capacity) {
    this.#capacity = capacity;
    this.#elements = [];
  }

  enqueue(element) {
    if (this.#elements.length < this.#capacity) {
      this.#elements.unshift(element);
      return true;
    }
    return false;
  }

  remove() {
    if (this.#elements.length > 0) {
      return this.#elements.pop();
    }
    return undefined;
  }

  get front() {
    if (this.#elements.length > 0) {
      return this.#elements[this.#elements.length - 1];
    }
    return undefined;
  }

  get capacity() {
    return this.#capacity;
  }

  set capacity(newCapacity) {
    if (newCapacity > this.#capacity) {
      this.#capacity = newCapacity;
    }
  }

  static fromItems(array) {
    const queue = new Queue(array.length);
    for (const item of array) {
      queue.enqueue(item);
    }
    return queue;
  }
}

const queue = new Queue(3);
console.log(queue.enqueue("Alice"));
console.log(queue.enqueue("Bob"));
console.log(queue.enqueue("Charlene"));
console.log(queue.enqueue("Dan"));
console.log(queue.remove());
console.log(queue.remove());
console.log(queue.enqueue("Elvira"));
console.log(queue.enqueue("Frank"));
console.log(queue.front);
console.log(queue.capacity);
queue.capacity = 4;
console.log(queue.capacity);
console.log(queue.enqueue("Gina"));
console.log(queue.remove());
console.log(queue.remove());
console.log(queue.remove());
console.log(queue.remove());
console.log(queue.remove());

const stream = Queue.fromItems([1, 2, 3]);
console.log(stream.remove());
console.log(stream.remove());
console.log(stream.remove());
console.log(stream.remove());
