import React, { useEffect, useState } from 'react'
import fetchWorkers from '../services/fetchWorkers'


const Workers = () => {
    const [workers, setWorkers] = useState([])

    useEffect(() => {
        fetchWorkers()
            .then(res => {
                setWorkers(res.workers)
            })
    }, [])

    return (
        Object.entries(workers).map((workers, idx) => {
            if (workers[1].state === `off`){
                return null
            }
            return (
                <div key={idx} className='worker-container'>
                    <h1>{workers[0]}</h1>
                    <p>Worker status: {workers[1].state}</p>
                    <p>Hash Scoring: {(workers[1].hash_rate_scoring / 1000).toFixed(2)}th/s</p>
                    <p>5min Hash: {(workers[1].hash_rate_5m / 1000).toFixed(2)}th/s</p>
                    <p>60min Hash: {(workers[1].hash_rate_60m / 1000).toFixed(2)}th/s</p>
                    <p>24h Hash: {(workers[1].hash_rate_24h / 1000).toFixed(2)}th/s</p>
                </div>
            )
        })
    )
}

export default Workers
