export default function bs_list(haystack: number[], needle: number): boolean {
    let low = 0;
    let high = haystack.length - 1;

    while (low < high) {
        const center = Math.round((low + high) / 2);
        if (haystack[center] === needle) { return true }
        if (haystack[low] === needle) { return true }
        if (haystack[high] === needle) { return true }
        else if (haystack[center] < needle) {
            low = center + 1;
        }
        else if (haystack[center] > needle) {
            high = center - 1;
        }
    }

    return false
}

