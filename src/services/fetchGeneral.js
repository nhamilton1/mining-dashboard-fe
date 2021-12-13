import axios from "axios"

const fetchGeneral = async () => {
    const res = await axios.get('http://localhost:9000/stats')
    return res.data.btc
}


export default fetchGeneral
