type StackNode<T> = {
    value: T;
    next?: StackNode<T>;
}
export default class Stack<T> {
    public length: number;
    private sp?: StackNode<T>;

    constructor() {
        this.sp = undefined;
        this.length = 0;
    }

    push(item: T): void {
        this.length++;
        if (this.sp === undefined) {
            this.sp = { value: item };
            return;
        }

        this.sp = { value: item, next: this.sp };
    }

    pop(): T | undefined {
        if (this.sp === undefined) {
            return undefined;
        }

        this.length--;

        const value = this.sp.value;
        this.sp = this.sp.next;
        return value;
    }

    peek(): T | undefined {
        return this.sp?.value;
    }
}
