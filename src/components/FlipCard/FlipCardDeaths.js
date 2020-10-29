import { React, Component } from 'react'
import "./FlipCard.css"

class FlipCardDeaths extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        const {
            deaths,
            country,
        } = this.props;
        return (
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <h1 style={{"font-size": "40px"}}>Deaths</h1>
                    </div>
                    <div className="flip-card-back">
                        <h1>Deaths</h1>
                        <h2>{deaths}</h2>
                    </div>
                </div>
            </div>
        )
    }


}

export default FlipCardDeaths