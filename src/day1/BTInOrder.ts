export default function in_order_search(head: BinaryNode<number>): number[] {
    const result: number[] = []
    traverse(head, result)
    return result
}
function traverse(node: BinaryNode<number> | null, result: number[]) {
    if (node === null) {
        return
    }

    traverse(node.left, result)
    result.push(node.value)
    traverse(node.right, result)
}
