import { useEffect, useState } from "react"
import { StarEmpty } from "./icons/stars/Empty"
import { StarFilled } from "./icons/stars/Filled"

import { MouseEvent } from 'react'
import { StarHalfFilled } from "./icons/stars/Half"

type RatingData = {
    total: number, // 10
    rating: number // 7
}

export const Rating = (props: RatingData): JSX.Element => {
    const [ratings, setRatings] = useState(props.rating)

    useEffect(() => setRatings(6), [])

    const giveRatings = (index: number, e: MouseEvent) => {
        const localIndex = Math.floor(index)

        const start = (e.target as Element).getBoundingClientRect().left
        const end = (e.target as Element).getBoundingClientRect().right

        if (e.clientX <= start + (end - start) / 2) {
            // left half of star
            setRatings(localIndex + 0.5)
        } else {
            // right half of star
            setRatings(localIndex + 1)
        }
    }

    if (props.rating > props.total) {
        console.warn("Incorrect Rating !!")
    }


    const isHalfRate: boolean = ratings != Math.floor(ratings)

    const rating = Math.floor(ratings)

    const maximum = Math.ceil(props.total) - ((isHalfRate) ? 1 : 0)

    return <>
        {[...Array(Math.min(rating, maximum))].map((_, index) =>
            <StarFilled key={index} onClick={(e) => giveRatings(index, e)} className="text-warning" />
        )}

        {isHalfRate && <StarHalfFilled onClick={(e) => giveRatings(rating, e)} className="text-warning" />}

        {[...Array(Math.max(maximum - rating, 0))].map((_, index) =>
            <StarEmpty key={index} onClick={(e) => giveRatings(index + (Math.ceil(rating) + 1), e)} className="text-warning" />
        )}
    </>
    // max        10    15    20
    // rating    5.5    10   4.5

    // filled ?    5    10     4         floor(rating)
    // empty ?     4     5    15         max - ceil(rating)
    // half (idx)  6     -     5         floor(rating) + 1
}