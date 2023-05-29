import { useContext, useEffect, useState } from "react"
import { Book } from "../types/Book"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../service/firebase"
import { AuthContext, AuthContextValueType } from "../context/AuthContext"

export const BookItemRow = ({ book }: BookItemRowProps): JSX.Element => {
    const [localBook, setLocalBook] = useState(book)
    const { authUser } = useContext(AuthContext) as AuthContextValueType

    useEffect(() => {
        if (!authUser || !localBook.id) return

        const docRef = doc(db, "books", authUser.uid, "library", localBook.id)
        updateDoc(docRef, localBook)
            .then(() => console.log("I am done"))
            .catch((e) => console.log(e.message))
    }, [authUser, localBook])

    const deleteABook = () => {
        if (!authUser || !localBook.id) return
        const docRef = doc(db, "books", authUser.uid, "library", localBook.id)
        deleteDoc(docRef)
            .then(() => { console.log("deleted") 
        location.reload()
        })
            .catch((e) => { console.error(e.message) })
    }
    return <>
        <div className="card m-1 mx-2">
            <div className="card-body">
                <h5 className="card-title">{localBook.title.toUpperCase()}</h5>
                <p className="card-text text-muted">Written by: {localBook.author}</p>
                <div>
                    <button onClick={deleteABook}>DELETE</button>
                </div>

                {/* Status */}
                <div className="btn-group" role="group">
                    {['read', 'reading', 'to-read'].map((status2, idx) => <div key={idx}>
                        <input type="radio" className="btn-check" name={`btn_${localBook.id}_${idx}`}
                            id={`btn_${localBook.id}_${idx}`} autoComplete="off"
                            checked={status2 === localBook.status}
                            onClick={() => setLocalBook(prev => { console.log(prev); return { ...prev, status: status2 } })}
                        />

                        <label className="btn btn-outline-primary" htmlFor={`btn_${localBook.id}_${idx}`}>
                            {status2.split('-').map(itt => itt.charAt(0).toUpperCase() + itt.slice(1)).join(' ')}
                        </label>
                    </div>)}
                </div>

                {/* Rating */}
                <div className="row mb-3">
                    <label htmlFor={`rating_${localBook.id}`} className="form-label">Rating</label>
                    <div className="d-flex justify-content-between px-4">

                        {[...Array(6)].map((_, i) => <div key={i} className={i === localBook.rating ? "text-primary" : ''}>
                            {i}
                        </div>)}
                    </div>
                    <input type="range" className="form-range px-3" min="0" max="5" step="1" id={`rating_${localBook.id}`}
                        onChange={(event) => {
                            setLocalBook((prev) => {
                                return { ...prev, rating: parseInt(event.target.value) }
                            })
                        }}
                        defaultValue={localBook.rating}
                    />
                </div>

                {/* Pages */}
                <div className="row mb-3">
                    <label htmlFor={`pages_${localBook.id}`} className="form-label">Pages</label>
                    <div className="d-flex justify-content-between px-4">
                        <div>1</div>
                        {/* <div>{localBook.pages.read}</div> */}
                        <div>{localBook.pages.total}</div>
                    </div>
                    <input
                        min="1"
                        step="1"
                        id={`pages_${localBook.id}`}
                        type="range"
                        max={localBook.pages.total}
                        className="form-range px-3"
                        defaultValue={localBook.pages.read}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setLocalBook(curr => {
                                return { ...curr, pages: { ...curr.pages, read: parseInt(event.target.value) } }
                            })
                        }}
                    />
                    <div className="px-4">
                        <div style={{ marginLeft: -8 + 420 * localBook.pages.read / localBook.pages.total }}>
                            {localBook.pages.read}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* 
        {   
            ...{
                title: "..",
                author: "",
                status: "",
                pages: {
                    read: 200,
                    total: 500,
                },
                rating: 1,
            },
            pages.read: new-value
        }

        20
        */}
    </>

}

type BookItemRowProps = {
    book: Book
}