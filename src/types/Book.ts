export type Book = {
    id: string | null,
    title: string,
    author: string,
    pages: {
        total: number,
        read: number,
    },
    status: string,
    rating: number,
}