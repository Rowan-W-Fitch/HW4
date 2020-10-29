import { React, Component } from 'react'
import "./FlipCard.css"

class FlipCardRecovered extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        const {
            recoveredCases,
            country,
        } = this.props;
        return (
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <h1 style={{"font-size": "40px"}}>Recovered Cases</h1>
                    </div>
                    <div className="flip-card-back">
                        <h1>Recovered Cases</h1>
                        <h2>{recoveredCases}</h2>
                    </div>
                </div>
            </div>
        )
    }


}

export default FlipCardRecovered