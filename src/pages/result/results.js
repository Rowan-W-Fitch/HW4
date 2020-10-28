import { React, Component } from 'react'
import { Card, Elevation, Button } from '@blueprintjs/core'
import axios from 'axios'

class Result extends Component {

  constructor(props){
    super(props)

    this.state = {
      confirmed: null,
      recovered: null,
      deaths: null
    }
  }

  async componentDidMount(){
    const arr = window.location.href.split('/')
    const slug = arr[arr.length-1].split('?')[0]
    const to = new Date().toISOString()

    axios.get(`https://api.covid19api.com/country/${slug}/status/confirmed?from=2020-10-01T00:00:00Z&to=${to}`)
      .then( conf => {
        console.log(conf)
        const numConf = conf && conf.data.map(m => m.Cases) || null
        let confirmed = numConf ? numConf.reduce((a,b) => a+b, 0) : "No data available on confirmed cases."
        if(isNaN(confirmed) || confirmed === 0) confirmed = "No data available on confirmed cases."
        this.setState({ confirmed: confirmed })
      })
      .catch( error => {
          console.log("confirmed gave error")
          this.setState({ confirmed: "No data available on confirmed cases." })
      })

    axios.get(`https://api.covid19api.com/country/${slug}/status/recovered?from=2020-10-01T00:00:00Z&to=${to}`)
      .then( rec => {
        const numRec = rec && rec.data.map(m => m.Cases) || null
        let recovered = numRec ? numRec.reduce((a,b) => a+b, 0) : "No data available on confirmed cases."
        if(isNaN(recovered) || recovered === 0) recovered = "No data available on recovered cases."
        this.setState({ recovered: recovered })
      })
      .catch( error => {
        console.log("recovered gave error")
        this.setState({ recovered: "No data available on recovered cases." })
      })

    axios.get(`https://api.covid19api.com/country/${slug}/status/deaths?from=2020-10-01T00:00:00Z&to=${to}`)
      .then( dead => {
        const numDead = dead && dead.data.map(m => m.Cases) || null
        let deaths = numDead ? numDead.reduce((a,b) => a+b, 0) : "No data available on confirmed cases."
        if(isNaN(deaths) || deaths === 0) deaths = "No data available on deaths."
        this.setState({ deaths: deaths })
      })
      .catch(error => {
        console.log("deaths gave error")
        this.setState({ deaths : "No data available on deaths." })
      })
  }

  render(){
    return(
      <div>
        <a href = "/">
          <Button icon = "arrow-left" text = "back to home" />
        </a>
        {
        !!this.state.confirmed && !!this.state.recovered && !!this.state.deaths ?
        (<div>
          <Card interactive={true} elevation={Elevation.TWO}>
            <h1>Confirmed Cases: {parseInt(this.state.confirmed) !== NaN ? `${this.state.confirmed}` : "loading..."}</h1>
          </Card>
          <Card interactive={true} elevation={Elevation.TWO}>
            <h1>Recovered Cases: {parseInt(this.state.recovered) !== NaN ? `${this.state.recovered}` : "loading..."}</h1>
          </Card>
          <Card interactive={true} elevation={Elevation.TWO}>
            <h1>Deaths: {parseInt(this.state.deaths) !== NaN ? `${this.state.deaths}` : "loading..."}</h1>
          </Card>
        </div>) : ("Loading...")
      }
      </div>
    )
  }

}

export default Result
