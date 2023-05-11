import { useContext, useEffect, useState } from "react"
import { AuthContext, AuthContextValueType } from "../context/AuthContext"
import { db } from "../service/firebase"
import { collection, getDocs } from "firebase/firestore"
import { Book } from "../types/Book"
import { BookItemRow } from "./BookItemRow"

export const BookList = (): JSX.Element => {
    const { authUser } = useContext(AuthContext) as AuthContextValueType

    const [bookList, setBookList] = useState<Book[]>([])

    useEffect(() => {
        if (authUser === null) return

        const bookDataRef = getDocs(collection(db, "books", authUser.uid, 'library'));

        bookDataRef.then((querySnapshot) => {
            const innerList: Book[] = querySnapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id } as Book
            })
            // "as Book" is called as casting

            setBookList(innerList)
        })
    }, [authUser])

    return <>
        <div className="p-3 d-flex justify-content-between align-items-center">
            <div>
                Your book list here
            </div>

            <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#newBookModal"
                className="btn btn-outline-primary"
            >New Book
            </a>
        </div>
        {bookList.map((book, index) => <BookItemRow key={index} book={book} />)}
    </>
}