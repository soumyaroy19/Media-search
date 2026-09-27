import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTabs } from '../redux/features/searchSlice'


const Tabs = () => {
    const tabs = ['Photos', 'Videos']

    const dispatch = useDispatch()

    const activeTab = useSelector((state)=>state.search.activeTab)

    return (
        <div className='flex gap-10 p-10'>
            {tabs.map(function (elem, idx) {
                return <button className={`${activeTab==elem?'bg-blue-700':'bg-gray-500'} cursor-pointer 
                rounded transition active:scale-95 p-4 text-white`}
                key={idx}
                onClick={()=>{
                    dispatch(setActiveTabs(elem))
                }} >
                    {elem}</button>
            })}
        </div>
    )
}

export default Tabs
