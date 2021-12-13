import React, { useEffect, useState } from 'react'
import fetchProfile from '../services/fetchProfile'
import fetchWorkers from '../services/fetchWorkers'

const Profile = () => {

  const [profile, setProfile] = useState([])
  const [workers, setWorkers] = useState([])


  useEffect(() => {
    fetchProfile()
      .then(res => {
        setProfile(res)
      })
    fetchWorkers()
      .then(res =>{
        setWorkers(res.workers)
      })
  }, [])


  // founds if the unit is offline and pushes it into the offline variable
  const offline = []

  Object.entries(workers).map((worker) => worker[1]).map(work => {
    if(work.state === 'off') {
      offline.push(work)
    }
    return offline
  })


  return (
    <div className='profile-container'>
      <h1>Profile Info</h1>
      <p>Workers Online: {profile.ok_workers}</p>
      <p>Hash Scoring: {(profile.hash_rate_scoring / 1000).toFixed(2)}th/s</p>
      <p>Unconfirmed Reward: {new Intl.NumberFormat('en-US').format((profile.unconfirmed_reward * 100000000))} sats</p>
      <p>Confirmed Reward: {new Intl.NumberFormat('en-US').format((profile.confirmed_reward * 100000000))} sats</p>
      <p>Yesterday's Hash: {(profile.hash_rate_yesterday / 1000).toFixed(2)}th/s</p>
      {
        (offline.length === 0) ? <span></span> : <p>Amount of offline units: {(offline.length)}</p>
      }
    </div>
  )

}

export default Profile
