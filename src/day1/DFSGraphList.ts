
function dfsR(node: number, needle: number, visited: boolean[], graph: WeightedAdjacencyList, path: number[]) {

    if (visited[node]) {
        return false
    }

    path.push(node)

    if (node === needle) {
        return true
    }

    visited[node] = true


    for (let i = 0; i < graph[node].length; i++) {
        let child = graph[node][i]

        if (dfsR(child.to, needle, visited, graph, path)) {
            return true
        }
    }

    path.pop()

    return false
}

export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] | null {
    const visited = new Array(graph.length).fill(false);
    const path: number[] = [];

    dfsR(source, needle, visited, graph, path)

    return path.length > 0 ? path : null
}
