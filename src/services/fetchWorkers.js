import axios from "axios"

const fetchWorkers = async () => {
    const res = await axios.get('http://localhost:9000/workers')
    return res.data.btc
}


export default fetchWorkers
