import in_order_search from "./BTInOrder";

export default function compare(a: BinaryNode<number> | null, b: BinaryNode<number> | null): boolean {
    if (a && b) {
        const a_nums = in_order_search(a);
        const b_nums = in_order_search(b);

        for (let i = 0; i < a_nums.length; i++) {
            if (a_nums[i] !== b_nums[i]) {
                return false
            }
        }
        return true
    }

    return false
}
