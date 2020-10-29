import { React, Component } from 'react'
import "./FlipCard.css"

class FlipCard extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        const {
            confirmedCases,
            recoveredCases,
            deaths,
            country,
        } = this.props;
        return (
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <h1 style={{"font-size": "50px"}}>{country}</h1>
                    </div>
                    <div className="flip-card-back">
                        <h1>Stats</h1>
                        <h2>Confirmed Cases: {confirmedCases}</h2>
                        <h2>Recovered Cases: {recoveredCases}</h2>
                        <h2>Deaths: {deaths}</h2>
                    </div>
                </div>
            </div>
        )
    }


}

export default FlipCard