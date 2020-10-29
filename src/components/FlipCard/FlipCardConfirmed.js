import { React, Component } from 'react'
import "./FlipCard.css"

class FlipCardConfirmed extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        const {
            confirmedCases,
            country,
        } = this.props;
        return (
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <h1 style={{"font-size": "40px"}}>Confirmed Cases</h1>
                    </div>
                    <div className="flip-card-back">
                        <h1>Confirmed Cases</h1>
                        <h2>{confirmedCases}</h2>
                    </div>
                </div>
            </div>
        )
    }


}

export default FlipCardConfirmed