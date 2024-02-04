type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
}

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    prepend(item: T): void {
        const node: Node<T> = { value: item }

        this.length++;
        if (this.head === undefined) {
            this.head = this.tail = node;
            return
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx === 0) {
            this.prepend(item);
            return;
        }

        if (idx === this.length) {
            this.append(item);
            return;
        }

        const node: Node<T> = { value: item };
        let curr = this.getNode(idx)
        if (curr === undefined) {
            return;
        }

        if (curr.prev) {
            curr.prev.next = node;
        }
        node.prev = curr.prev;

        curr.prev = node;
        node.next = curr;

        this.length++;
    }
    
    append(item: T): void {
        const node: Node<T> = { value: item }

        this.length++;
        if (this.tail === undefined) {
            this.head = this.tail = node;
            return
        }

        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        let curr = this.head;
        while (curr) {
            if (curr.value === item) {
                if (curr === this.head) {
                    this.head = curr.next;
                }
                if (curr === this.tail) {
                    this.tail = curr.prev;
                }
                if (curr.prev) {
                    curr.prev.next = curr.next;
                }
                if (curr.next) {
                    curr.next.prev = curr.prev;
                }
                this.length--;
                return curr.value;
            }
            curr = curr.next;
        }
        return undefined;
    }

    get(idx: number): T | undefined {
        return this.getNode(idx)?.value;
    }

    private getNode(idx: number): Node<T> | undefined {
        let curr = this.head;
        for (let i = 0; i < idx && curr; i++) {
            curr = curr.next;
        }
        return curr;
    }

    removeAt(idx: number): T | undefined {
        let curr = this.getNode(idx);

        if (curr === undefined) {
            return undefined;
        }

        if (idx === 0) {
            this.head = curr.next;
        }

        if (idx === this.length - 1) {
            this.tail = curr.prev;
        }

        if (curr.prev) {
            curr.prev.next = curr.next;
        }

        if (curr.next) {
            curr.next.prev = curr.prev;
        }

        this.length--;

        return curr.value;
    }
}
