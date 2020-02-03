import React from 'react'

const Success = ({ msg }) => {
    const successStyle = {
        color: 'green',
        background: 'lightgreen',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
    }

    if (msg === null) {
        return null
    } else {
        return <div style={successStyle}>{msg}</div>
    }
}

export default Success
