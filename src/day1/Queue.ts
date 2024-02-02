type Item<T> = {
    value: T;
    next?: Item<T>
}
export default class Queue<T> {
    public length: number;
    public head?: Item<T>;
    public tail?: Item<T>;

    constructor() {
        this.head = this.tail = undefined
        this.length = 0
    }

    enqueue(item: T): void {
        const node = { value: item }
        this.length++;
        if (!this.tail) {
            this.head = this.tail = node
            return
        }

        this.tail.next = node
    }
    deque(): T | undefined {
        if (!this.head) {
            return undefined
        }

        this.length--
        let h = this.head
        this.head = h.next;
        h.next = undefined
        return h.value
    }
    peek(): T | undefined {
        return this.head?.value
    }
}
