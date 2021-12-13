import React, { useEffect, useState } from 'react'
import fetchWorkers from '../services/fetchGeneral'

function General() {

    const [general, setGeneral] = useState([])


    useEffect(() => {
        fetchWorkers()
            .then(res => {
                setGeneral(res)
            })
    }, [])

    let unixTime = general.round_started
    const date = new Date(unixTime*1000)
    
    return (
        <div className='round-started' key={date}>
            {/* <p> 
                {
                date.toLocaleDateString("en-US", 
                {
                    hour: 'numeric', 
                    minute: 'numeric', 
                    second: 'numeric', 
                })
                }
            </p> */}
        </div>
    )
}

export default General
