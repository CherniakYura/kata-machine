type Node = {
    value: string,
    children: Map<string, Node>,
    isWord: boolean
}

export default class Trie {
    private root: Node = {
        value: '',
        children: new Map<string, Node>(),
        isWord: false
    }

    constructor() {
    }

    insert(item: string): void {
        let node = this.root
        for (let i = 0; i < item.length; i++) {
            const char = item[i]
            if (!node.children.has(char)) {
                node.children.set(char, {
                    value: char,
                    children: new Map<string, Node>(),
                    isWord: false
                })
            }
            node = node.children.get(char) as Node
        }
        node.isWord = true
    }
    deleteIf(node: Node | undefined, word: string) {
        if (node === undefined) {
            return
        }

        const wordList = word.split("")
        const char = wordList.shift() || ""

        this.deleteIf(node.children.get(char), wordList.join(""))

        if (node.children.has(char) && node.children.get(char)?.children.size as number <= 0) {
            node.children.delete(char)
        }

        if (node.children.has(char) && wordList.length === 0) {
            (node.children.get(char) as Node).isWord = false
        }
    }

    delete(item: string): void {
        let node = this.root
        this.deleteIf(node, item)
    }

    find(partial: string): string[] {
        let node = this.root;

        const charsList = []
        const wordsList: string[] = []
        for (let i = 0; i < partial.length; i++) {
            const c = partial.charAt(i)
            if (!node.children.has(c)) {
                return []
            }
            charsList.push(c)
            node = node.children.get(c) as Node
        }

        this.findWords(node, charsList, wordsList)
        return wordsList
    }

    findWords(node: Node, charsList: string[], wordsList: string[]) {
        if (node.isWord) {
            wordsList.push(charsList.join(""))
        }

        node.children.forEach((value, key) => {
            charsList.push(key)
            this.findWords(value, charsList, wordsList)
            charsList.pop()
        })
    }
}
