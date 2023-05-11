import { addDoc, collection } from "firebase/firestore"
import { AuthContext, AuthContextValueType } from "../context/AuthContext"
import { db } from "../service/firebase"
import { Book } from "../types/Book"
import { useContext, useState } from 'react'
import { Modal } from "bootstrap"

export const NewBookModal = (): JSX.Element => {
    const { authUser } = useContext(AuthContext) as AuthContextValueType
    const [formSubmitted, setFormSubmit] = useState(false)

    const addNewBook = () => {
        if (!authUser) return; // guard clause

        setFormSubmit(true)

        // 1. const book = Book({ ... })
        const author = (document.getElementById("bookAuthor") as HTMLInputElement).value
        const pagesTotal = (document.getElementById("pagesTotal") as HTMLInputElement).value
        const pagesRead = (document.getElementById("pagesRead") as HTMLInputElement).value
        const rating = (document.getElementById("rating") as HTMLFormElement).value

        const book = {
            title: (document.getElementById("bookTitle") as HTMLInputElement).value,
            author: author,
            pages: {
                total: parseInt(pagesTotal),
                read: parseInt(pagesRead),
            },
            rating: parseInt(rating),
            status: "to-read"
        } as Book

        const colRef = collection(db, "books", authUser.uid, "library")
        addDoc(colRef, book)
            .then(() => {
                const modalRef: Modal | null = Modal
                    .getInstance(document.getElementById("newBookModal") as HTMLElement)

                if (modalRef) modalRef.hide()

                setFormSubmit(false)
            })
            .catch((e) => console.error(e.message))
    }

    return <>
        <div className="modal fade" id="newBookModal" aria-labelledby="newBookModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="newBookModalLabel">Add New Book</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form action="">
                            <div className="row mb-3">
                                <label htmlFor="bookTitle" className="col-sm-2 col-form-label">Book Title</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="bookTitle" defaultValue="" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="bookAuthor" className="col-sm-2 col-form-label">Author</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="bookAuthor" defaultValue="" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="pagesTotal" className="col-sm-2 col-form-label">Total Pages</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control" id="pagesTotal" defaultValue="" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="pagesRead" className="col-sm-2 col-form-label">Pages Read</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control" id="pagesRead" defaultValue="" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="rating" className="form-label">Rating</label>
                                <div className="d-flex justify-content-between px-4">
                                    {[...Array(6)].map((_, i) => <div key={i}>{i}</div>)}
                                </div>
                                <input type="range" className="form-range px-3" min="0" max="5" step="0.5" id="rating" defaultValue="3" />
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        {
                            !formSubmitted
                                ? <button onClick={addNewBook} type="button" className="btn btn-primary">Save changes</button>
                                : <button className="btn btn-primary" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Loading...
                                </button>
                        }
                    </div>
                </div>
            </div>
        </div>

    </>
}

