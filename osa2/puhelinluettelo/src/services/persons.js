import axios from 'axios'

const root = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(root)
        .then(res => res.data)
}

const create = newPerson => {
    return axios.post(root, newPerson)
        .then(res => res.data)
}

export default { getAll, create }
