import { useState } from "react"
import { StarEmpty } from "./icons/stars/Empty"
import { StarFilled } from "./icons/stars/Filled"

type RatingData = {
    total: number, // 10
    rating: number // 7
}

export const Rating = (props: RatingData): JSX.Element => {
    const [ratings,setRatings]=useState(props.rating)

    const giveRatings=(index:number,e:any)=>{
        setRatings(index+1)
        console.log(e.target.getBoundingClientRect()
        )
    }

    if (props.rating > props.total) {
        console.warn("Incorrect Rating !!")

    }

    return <>
        {[...Array(Math.min(ratings,props.total))].map((_, index) =>
            <StarFilled key={index} onClick={(e)=>giveRatings(index,e)} />
        )}

        {[...Array(Math.max(props.total - ratings, 0))].map((_, index) =>
            <StarEmpty key={index} onClick={(e)=>giveRatings(index+ratings,e)} />
        )}
    </>
}