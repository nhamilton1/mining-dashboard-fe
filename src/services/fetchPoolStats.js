import axios from "axios";

const fetchPoolStats = async () => {
    const res = await axios.get('http://localhost:9000/stats')
    return res.data.btc.blocks
}


export default fetchPoolStats
