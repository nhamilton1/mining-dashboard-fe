import moment from 'moment'
import fetchDailyRewards from '../services/fetchDailyRewards'
import React, { useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'


const DailyRewards = () => {
    const [daily, setDaily] = useState([])

    useEffect(() => {
        fetchDailyRewards()
            .then(res => {
                setDaily(res)
            })
    }, [])

    const dailyRewards = []
    const dailyRewardsDate = []

    daily.map(block =>  dailyRewards.push(block.total_reward))
    daily.map(date => dailyRewardsDate.push(moment.unix(date.date).format('MMM Do')))

    //slice is making sure its only showing 30 days of rewards
    const formattedData = dailyRewards.slice(0, 30).map((price, idx) => {
        const date = dailyRewardsDate[idx]
        return { Sats: price, date }
    })


    return (
        <>
            <h1 className='daily-rewards'>Daily Rewards</h1>
            <ResponsiveContainer width="100%" height={250} >
                <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <Line name="Daily Reward" type="monotone" dataKey="Sats" stroke="#8884d8" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickCount={10} />
                    <Tooltip contentStyle={{ backgroundColor: "#8884d8", color: '#fff' }} itemStyle={{ color: '#fff' }} cursor={false} />
                    <CartesianGrid opacity={0.1} vertical={false} />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}

export default DailyRewards
