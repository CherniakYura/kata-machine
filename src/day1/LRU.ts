type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
}

export default class LRU<K, V> {
    private length: number;

    private head?: Node<V>;
    private tail?: Node<V>;
    private lookup: Map<K, Node<V>> = new Map<K, Node<V>>();
    private reverseLookup: Map<Node<V>, K> = new Map<Node<V>, K>();

    constructor(private capacity: number = 10) {
        this.length = 0;
    }
    private createNode(value: V): Node<V> {
        return { value };
    }

    update(key: K, value: V): void {
        const node = this.lookup.get(key);

        if (!node) {
            const newNode = this.createNode(value);
            this.lookup.set(key, newNode);
            this.reverseLookup.set(newNode, key);
            this.add(newNode);
            this.trim();
        } else {
            node.value = value;
            this.remove(node);
            this.add(node);
        }

    }
    private trim(): void {
        if (this.length <= this.capacity) {
            return
        }

        const node = this.tail;
        if (node) {
            this.remove(node);
            const key = this.reverseLookup.get(node);
            if (key) {
                this.lookup.delete(key);
                this.reverseLookup.delete(node);
            }
        }
    }

    get(key: K): V | undefined {
        const node = this.lookup.get(key);
        if (!node) {
            return undefined;
        }

        this.remove(node);
        this.add(node);
        return node.value;
    }

    private remove(node: Node<V>): void {
        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (node === this.head) {
            this.head = node.next;
        }

        if (node === this.tail) {
            this.tail = node.prev;
        }

        this.length--;
    }

    private add(node: Node<V>): void {
        if (this.head) {
            this.head.prev = node;
        }

        node.next = this.head;
        this.head = node;

        if (!this.tail) {
            this.tail = node;
        }

        this.length++;
    }
}
