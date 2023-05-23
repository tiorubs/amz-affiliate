class Hash {
  random(size: number) {
    let hash = "";
    while (hash.length < size) hash += Math.random().toString(16).slice(2);
    return hash.slice(0, size);
  }

  unique(size: number) {
    const time = (Date.now() / 1000).toFixed(0);
    const hashSize = size - time.length - 1;
    return `${time}f${this.random(hashSize)}`;
  }

  xACBBR() {
    return `${this.random(14)}@${this.unique(32)}@${this.random(16)}`;
  }
}

export const hash = new Hash();
