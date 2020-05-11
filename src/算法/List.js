/**
 * 列表
 */

 function List() {
     this.listSize = 0;
     this.pos = 0;
     this.dataStore = [];
     this.clear = clear;
     this.find = find;
     this.toString = toString;
     this.insert = insert;
     this.append = append;
     this.remove = remove;
     this.front = front;
     this.end = end;
     this.prev = prev;
     this.next = next;
     this.hasNext;
     this.hasPrev;
     this.length = length;
     this.currPos = currPos;
     this.moveTo = moveTo;
     this.getElement = getElement;
     this.contains = contains;
 }

 function append(item) {
     this.dataStore[this.listSize++] = item;
 }

 function find(item) {
     for (let i = 0; i < this.dataStore.length; i++) {
        if (this.dataStore[i] === item) {
            return i;
        }
     }
     return -1;
 }

 function remove(item) {
     let fountAt = this.find(item);
     if (fountAt > -1) {
        this.dataStore.splice(fountAt, 1);
        --this.listSize;
        return true;
     }
     return false;
 }

 