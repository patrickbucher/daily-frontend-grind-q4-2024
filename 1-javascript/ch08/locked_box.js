const box = new class {
  locked = true;
  #content = [];

  unlock() {
    this.locked = false;
  }

  lock() {
    this.locked = true;
  }

  get content() {
    if (this.locked) {
      throw new Error("Locked!");
    } else {
      return this.#content;
    }
  }
}();

function withBoxUnlocked(func) {
  let lockedBefore = box.locked;
  try {
    if (lockedBefore) {
      box.unlock();
    }
    func();
  } catch (e) {
    console.log(`error: ${e}`);
  } finally {
    if (lockedBefore) {
      box.lock();
    }
  }
}

console.log(`locked? ${box.locked}`);
withBoxUnlocked(() => console.log("dindu nuffin"));
console.log(`locked? ${box.locked}`);

console.log(`locked? ${box.locked}`);
withBoxUnlocked(() => 3 / 0);
console.log(`locked? ${box.locked}`);

box.unlock();
console.log(`locked? ${box.locked}`);
withBoxUnlocked(() => console.log("dindu nuffin"));
console.log(`locked? ${box.locked}`);

console.log(`locked? ${box.locked}`);
withBoxUnlocked(() => 3 / 0);
console.log(`locked? ${box.locked}`);
