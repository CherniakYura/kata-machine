export default class MinHeap {
    public length: number;
    private data: number[];


    constructor() {
        this.data = []
        this.length = 0
    }

    insert(value: number): void {
        this.data[this.length] = value
        this.heapifyUp(this.length)
        this.length++
    }

    delete(): number {
        if (this.length === 0) {
            return -1
        }
        this.length--
        let v = this.data[0]

        if (this.length === 0) {
            this.data = []
            return v
        }

        this.data[0] = this.data[this.length]
        this.heapifyDown(0)

        return v
    }

    private heapifyDown(idx: number): void {
        if (idx >= this.length) {
            return
        }
        if (this.leftChild(idx) >= this.length) {
            return
        }

        let leftV = this.data[this.leftChild(idx)]
        let rightV = this.data[this.rightChild(idx)]
        let v = this.data[idx];

        if (leftV > rightV && v > rightV) {
            this.data[this.rightChild(idx)] = v
            this.data[idx] = rightV
            this.heapifyDown(this.rightChild(idx))
        } else if (leftV < rightV && v > leftV) {
            this.data[this.leftChild(idx)] = v
            this.data[idx] = leftV
            this.heapifyDown(this.leftChild(idx))
        }
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return
        }

        let p = this.parent(idx)
        let parentV = this.data[p]
        let v = this.data[idx]

        if (parentV >= v) {
            this.data[idx] = parentV
            this.data[p] = v
            this.heapifyUp(p)
        }

    }

    private leftChild(idx: number): number {
        return (idx * 2) + 1
    }

    private rightChild(idx: number): number {
        return (idx * 2) + 2
    }
    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2)
    }
}
