import axios from "axios"

const fetchDailyRewards = async () => {
    const res = await axios.get('http://localhost:9000/rewards')
    return res.data.btc.daily_rewards

}


export default fetchDailyRewards
