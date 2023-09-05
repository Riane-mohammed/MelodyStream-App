import React from 'react'
import LikeSongsCard from '../../../components/Cards/LikeSongsCard/LikeSongsCard'
import './Likes.css'
import LikePlaylistsCard from '../../../components/Cards/LikePlaylistsCard/LikePlaylistsCard'

const Likes = () => {
    return (
        <>
            <div className='likes-page'>
                <h1 className='m-4 fw-bold' style={{ 'color': 'var(--blue)' }}>Likes</h1>
                <div className='d-flex'>
                    <LikeSongsCard />
                    <LikePlaylistsCard />
                </div>
            </div>
        </>
    )
}

export default Likes