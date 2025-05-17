import React from 'react'
import { useParams } from 'react-router-dom'

const ComingSoon = () => {
    const { status } = useParams()
    return (
        <div className="w-full p-4">
            <h1 className="text-2xl font-bold">Phim sắp chiếu</h1>
        </div>
    )
}

export default ComingSoon
