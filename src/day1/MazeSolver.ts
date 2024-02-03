const dirs: Point[] = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
]

function walk(maze: string[], wall: string, position: Point, end: Point, path: Point[], seen: boolean[][]): boolean {

    if (position.x < 0 || position.x >= maze[0].length || position.y < 0 || position.y >= maze.length) {
        return false
    }

    if (maze[position.y][position.x] === wall) {
        return false
    }

    if (position.x === end.x && position.y === end.y) {
        path.push(end)
        return true
    }

    if (seen[position.y][position.x]) {
        return false
    }

    seen[position.y][position.x] = true
    path.push(position)

    for (let i = 0; i < dirs.length; i++) {
        if (walk(maze, wall,
            { x: position.x + dirs[i].x, y: position.y + dirs[i].y },
            end, path, seen)) {
            return true;
        }
    }

    path.pop()

    return false
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const path: Point[] = []
    const seen: boolean[][] = []

    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false))
    }

    walk(maze, wall, start, end, path, seen)
    return path
}
