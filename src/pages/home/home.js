import { React, Component, Fragment } from 'react'
import { Button, Menu, MenuDivider, MenuItem, Popover, Position, Navbar, Alignment } from "@blueprintjs/core"
import axios from 'axios'

class Home extends Component {

  constructor(props){
    super(props)

    this.state = {
      countries: null,
      selectedCountry: null
    }
  }

  async componentDidMount(){
    const res = await axios.get('https://api.covid19api.com/countries')
    let countries = res.data.map(r => { return {"country": r.Country, "slug": r.Slug} })
    countries.sort((a,b) => (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0))
    this.setState({ countries: countries })
  }

  render(){
    const exampleMenu = (
            <Menu>
                {this.state.countries && this.state.countries.map(
                  m => {
                    return <MenuItem text = {m.country} href = {`/result/${m.slug}`} />
                  }
                )}
            </Menu>
        );
        return (
          <Fragment>
            <Navbar className="bp3-dark">
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>Homework 4</Navbar.Heading>
                    <Navbar.Divider />
                    <Button className="bp3-minimal" icon="home" text="Home" />

                    <Popover content={exampleMenu} position={Position.RIGHT_BOTTOM}>
                    <Button icon="flag" text="Select Country" />
                    </Popover>
                </Navbar.Group>
            </Navbar>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '100px'}}>
              <h1 style={{"font-size": "75px"}}>Welcome, select a country</h1>
            </div>
          </Fragment>
        );
  }

}

export default Home
