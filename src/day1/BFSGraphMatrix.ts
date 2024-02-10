import Queue from "./Queue";

export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
    const queue = new Queue<number>();
    const visited = new Array(graph.length).fill(false);
    const prev = new Array(graph.length).fill(-1);
    const path: number[] = [];

    queue.enqueue(source)
    visited[source] = true

    while (queue.length > 0) {
        const node = queue.deque() as number

        if (node === needle) {
            break
        }

        graph[node].forEach((w, i) => {
            if (visited[i]) {
                return
            }
            if (w > 0) {
                prev[i] = node
                visited[i] = true
                queue.enqueue(i)
            }
        })
    }

    if (prev[needle] === -1) {
        return null
    }

    let current = needle
    let out = []

    while (current !== -1) {
        out.push(current)
        current = prev[current]
    }

    return out.reverse()
}
