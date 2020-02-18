const errorHandler = (error, request, response, next) => {
    console.log("error!!", error.message)
    return response.status(400).send({ error: error.message })
}

module.exports = errorHandler
