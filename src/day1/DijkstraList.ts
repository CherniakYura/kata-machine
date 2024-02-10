export default function dijkstra_list(source: number, sink: number, arr: WeightedAdjacencyList): number[] {
    const dist = new Array(arr.length).fill(Infinity)
    const prev = new Array(arr.length).fill(-1)
    const visited = new Array(arr.length).fill(false)

    dist[source] = 0

    while (visited.some((v) => v === false)) {
        let u = minDistance(dist, visited)
        visited[u] = true

        for (let j = 0; j < arr[u].length; j++) {
            let v = arr[u][j].to
            let weight = arr[u][j].weight

            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight
                prev[v] = u
            }
        }
    }

    let out = []
    let current = sink

    while (current !== -1) {
        out.push(current)
        current = prev[current]
    }

    return out.reverse()
}

function minDistance(dist: number[], visited: boolean[]): number {
    let min = Infinity
    let minIndex = -1

    for (let i = 0; i < dist.length; i++) {
        if (visited[i] === false && dist[i] <= min) {
            min = dist[i]
            minIndex = i
        }
    }

    return minIndex
}
