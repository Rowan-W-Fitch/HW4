import { React, Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Home extends Component {

  constructor(props){
    super(props)

    this.state = {
      countries: null
    }
  }

  async componentDidMount(){
    const res = await axios.get('https://api.covid19api.com/countries')
    console.log(res)
    const countries = res.data.map(r => { return {"country": r.Country, "slug": r.Slug} })
    this.setState({ countries: countries })
  }

  render(){
    return(
      <select>
        {this.state.countries && this.state.countries.map(
          c => { return <option>{c.country}</option> }
        )}
      </select>
    )
  }

}

export default Home
