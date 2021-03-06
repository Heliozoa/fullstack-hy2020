import axios from 'axios'

const rootUrl = '/api/persons'
const idUrl = id => `${rootUrl}/${id}`

const getAll = () => {
    return axios.get(rootUrl)
        .then(res => res.data)
}

const create = newPerson => {
    return axios.post(rootUrl, newPerson)
        .then(res => res.data)
}

const remove = id => {
    return axios.delete(idUrl(id))
}

const update = person => {
    return axios.put(idUrl(person.id), person)
}

export default { getAll, create, remove, update }
