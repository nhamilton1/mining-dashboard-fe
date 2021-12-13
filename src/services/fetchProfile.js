import axios from "axios"

const fetchProfile = async () => {
    const res = await axios.get('http://localhost:9000/profile')
    return res.data.btc
}


export default fetchProfile
