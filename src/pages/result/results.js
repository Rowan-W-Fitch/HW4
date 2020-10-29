import { React, Component, Fragment } from 'react'
import { Card, Elevation } from '@blueprintjs/core'
import { Button, Menu, MenuDivider, MenuItem, Popover, Position, Navbar, Alignment } from "@blueprintjs/core"
import { Link } from "react-router-dom";
import FlipCard from "../../components/FlipCard/FlipCard"
import axios from 'axios'
import { Container, Row, Col } from 'reactstrap';


class Result extends Component {

  constructor(props){
    super(props)

    this.state = {
      confirmed: null,
      recovered: null,
      deaths: null,
      country: null
    }
  }

  async componentDidMount(){
    const arr = window.location.href.split('/')
    const slug = arr[arr.length-1].split('?')[0]
    const to = new Date()
    const dDay = to.setDate(to.getDate() -2)

    axios.get(`https://api.covid19api.com/total/country/${slug}/status/confirmed?from=2020-10-01T00:00:00Z&to=${to.toISOString()}Z`)
      .then( conf => {
        const numConf = conf && conf.data.filter(m => new Date(m.Date) >= new Date("2020-10-01T00:00:00Z")) || null
        const oct1st = numConf && numConf.filter(m => m.Date === "2020-10-01T00:00:00Z").map(m=> m.Cases).reduce((a,b) => a+b, 0) || null
        console.log(oct1st)
        const endOfMonth = numConf && numConf.filter(m => new Date(m.Date) >= new Date(dDay)).map(m => m.Cases).reduce((a,b) => a+b, 0) || null
        console.log(endOfMonth)
        let confirmed = endOfMonth - oct1st
        if(isNaN(confirmed) || confirmed === 0) confirmed = "No data available on confirmed cases."
        this.setState({ confirmed: confirmed })
        this.setState({ country: slug })
      })
      .catch( error => {
          console.log("confirmed gave error")
          this.setState({ confirmed: "No data available on confirmed cases." })
      })

    axios.get(`https://api.covid19api.com/total/country/${slug}/status/recovered?from=2020-10-01T00:00:00Z&to=${to}`)
      .then( rec => {
        const numRec = rec && rec.data.filter(m => new Date(m.Date) >= new Date("2020-10-01T00:00:00Z")) || null
        const oct1st = numRec && numRec.filter(m => m.Date === "2020-10-01T00:00:00Z").map(m=> m.Cases).reduce((a,b) => a+b, 0) || null
        console.log(oct1st)
        const endOfMonth = numRec && numRec.filter(m => new Date(m.Date) >= new Date(dDay)).map(m => m.Cases).reduce((a,b) => a+b, 0) || null
        console.log(endOfMonth)
        let recovered = endOfMonth - oct1st
        if(isNaN(recovered) || recovered === 0) recovered = "No data available on confirmed cases."
        this.setState({ recovered: recovered })
      })
      .catch( error => {
        console.log("recovered gave error")
        this.setState({ recovered: "No data available on recovered cases." })
      })

    axios.get(`https://api.covid19api.com/total/country/${slug}/status/deaths?from=2020-10-01T00:00:00Z&to=${to}`)
      .then( dead => {
        const numDead = dead && dead.data.filter(m => new Date(m.Date) >= new Date("2020-10-01T00:00:00Z")) || null
        const oct1st = numDead && numDead.filter(m => m.Date === "2020-10-01T00:00:00Z").map(m=> m.Cases).reduce((a,b) => a+b, 0) || null
        console.log(oct1st)
        const endOfMonth = numDead && numDead.filter(m => new Date(m.Date) >= new Date(dDay)).map(m => m.Cases).reduce((a,b) => a+b, 0) || null
        console.log(endOfMonth)
        let deaths = endOfMonth - oct1st
        if(isNaN(deaths) || deaths === 0) deaths = "No data available on confirmed cases."
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
        <Fragment>
          <Navbar className="bp3-dark">
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>Homework 4</Navbar.Heading>
                <Navbar.Divider />
                <Link to="/"><Button className="bp3-minimal" icon="home" text="Home" /></Link>
            </Navbar.Group>
          </Navbar>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '100px'}}>
            {
              !!this.state.confirmed && !!this.state.recovered && !!this.state.deaths ?
              (
                <FlipCard
                confirmedCases={this.state.confirmed}
                recoveredCases={this.state.recovered}
                deaths={this.state.deaths}
                country={this.state.country}
              />
              ) : (<h3>"Loading..."</h3>)
            }
          </div>
      </Fragment>
      </div>
    )
  }

}

export default Result
