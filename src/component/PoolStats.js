import React, { useEffect, useState } from 'react'
import moment from 'moment'
import fetchPoolStats from '../services/fetchPoolStats'
import { CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, ResponsiveContainer } from 'recharts'



const PoolStats = () => {
    const [pool, setPool] = useState([])

    useEffect(() => {
        fetchPoolStats()
            .then(res => {
                setPool(res)
            })
    }, [])


    const userRewards = []
    const dateFound = []

    Object.entries(pool).map(blocks => userRewards.push(blocks[1].user_reward))
    Object.entries(pool).map(blocks => dateFound.push(moment.unix(blocks[1].date_found).format('MMM Do , h:mm a')))

    const formattedData = userRewards.map((price, idx) => {
        const date = dateFound[idx]
        return { Sats: price, date }
    })


    return (
        <>
            <h1 className='sats-per-block'>Sats Per Block</h1>
            <ResponsiveContainer width='100%' height={250} >
                <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <Line name='Sats Per Block' type='monotone' dataKey='Sats' stroke='#8884d8' />
                    <XAxis axisLine={false} tickLine={false} dataKey='date' interval={1} tick={{ fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "#8884d8", color: '#fff' }} itemStyle={{ color: '#fff' }} cursor={false} />
                    <CartesianGrid opacity={0.1} vertical={false} />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}

export default PoolStats
