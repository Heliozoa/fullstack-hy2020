import React from 'react'

const Error = ({ msg }) => {
    const errorStyle = {
        color: 'red',
        background: 'pink',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
    }

    if (msg === null) {
        return null
    } else {
        return <div style={errorStyle}>{msg}</div>
    }
}

export default Error
