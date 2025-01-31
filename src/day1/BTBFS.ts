import Queue from "./Queue";

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const queue = new Queue<BinaryNode<number>>()
    queue.enqueue(head)

    while (queue.length) {
        const node = queue.deque()

        if (node?.value === needle) {
            return true
        }

        if (node?.left) {
            queue.enqueue(node.left)
        }
        if (node?.right) {
            queue.enqueue(node.right)
        }
    }
    return false
}
