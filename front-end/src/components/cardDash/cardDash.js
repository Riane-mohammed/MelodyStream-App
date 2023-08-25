import React from 'react'
import './cardDash.css'

function CardDash(props) {
    return (
        <div className="card">
            <div>
                <div className="numbers">{props.number}</div>
                <div className="cardName">{props.title}</div>
            </div>
            <div className="iconBx">
                <i className={`bx ${props.icon}`}></i>
            </div>
        </div>
    )
};

export default CardDash