export default function post_order_search(head: BinaryNode<number>): number[] {
    const result: number[] = []
    traverse(head, result)
    return result
}

function traverse(node: BinaryNode<number> | null, result: number[]) {
    if (node === null) {
        return
    }

    traverse(node.left, result)
    traverse(node.right, result)
    result.push(node.value)
}
