import React, { useEffect } from 'react'
import { fetchPhotos, fetchVideos } from '../api/mediaApi'
import { setLoading, setError, setResults } from '../redux/features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import ResultCard from './ResultCard'

const ResultGrid = () => {

    const dispatch = useDispatch()

    const { query, activeTab, results, loading, error } = useSelector((store) => store.search)

    useEffect(function () {
        if (!query) return
        const getData = async () => {

            try {
                dispatch(setLoading())
                let data = []
                if (activeTab === 'Photos') {
                    let response = await fetchPhotos(query)

                    data = response.results.map((item) => ({
                        id: item.id,
                        type: 'photo',
                        title: item.alt_description,
                        thumbnail: item.urls.small,
                        src: item.urls.full,
                        url: item.links.html
                    }))
                }
                if (activeTab === 'Videos') {
                    let response = await fetchVideos(query)
                    data = response.videos.map((item) => ({
                        id: item.id,
                        type: 'video',
                        title: item.user.name || 'video',
                        thumbnail: item.image,
                        src: item.video_files[0].link,
                        url: item.url
                    }))
                }
                dispatch(setResults(data))
            } catch (err) {
                dispatch(setError(err.message))
            }
        }
        getData()
    }, [query, activeTab, dispatch])

    if (error) return <h1>Error</h1>
    if (loading) return <h1>Loading...</h1>

    return (
        <div className=' flex flex-wrap justify-between gap-2 overflow-auto px-10'>
            {results.length === 0 ? (
                <p className="w-full py-10 text-center text-gray-600">
                    No results found
                </p>
            ) : (
                    results.map((item, idx) => {
                        return <div key={idx}>
                            <ResultCard item={item} />
                        </div>
                    })
            )}
        </div>
    )
}

export default ResultGrid
