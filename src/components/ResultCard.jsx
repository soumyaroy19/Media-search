import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCollection, addedToast } from '../redux/features/collectionSlice'



const ResultCard = ({ item }) => {

    const dispatch = useDispatch()
    const [mediaFailed, setMediaFailed] = useState(false)

    useEffect(() => {
        setMediaFailed(false)
    }, [item.src])

    const addToCollection = (item) => {
        dispatch(addCollection(item))
        dispatch(addedToast())

    }
    return (
        <div className='w-[18vw] relative h-80 bg-white rounded-xl overflow-hidden'>

            <a target='_blank' className='h-full' href={item.url}>
                {mediaFailed ? (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-600">
                        Media not found
                    </div>
                ) :
                    item.type == 'photo' ? (<img className='h-full w-full object-cover object-center' src={item.src} alt="" />) :

                        item.type === 'video' ? (
                            <video
                                className="h-full w-full object-cover object-center"
                                loop
                                muted
                                playsInline
                                src={item.src}
                                onMouseEnter={(e) => e.currentTarget.play()}
                                onMouseLeave={(e) => {
                                    e.currentTarget.pause()
                                    e.currentTarget.currentTime = 0
                                }}
                            />
                        ) : null}
            </a>

            <div id='bottom' className='flex justify-between items-center w-full px-4 py-6  gap-3 absolute bottom-0 text-white'>

                <h2 className='text-lg font-semibold capitalize h-14 overflow-hidden'>{item.title}</h2>

                <button
                    onClick={() => {
                        addToCollection(item)
                    }} className='bg-indigo-600 text-white rounded px-3 py-2 cursor-pointer font-medium active:scale-95'>Save</button>
            </div>
        </div>

    )
}

export default ResultCard
