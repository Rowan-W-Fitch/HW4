import { React, Component } from 'react'
import { Button, Menu, MenuDivider, MenuItem, Popover, Position } from "@blueprintjs/core"
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
          <Popover content={exampleMenu} position={Position.RIGHT_BOTTOM}>
              <Button icon="share" text="Kike please style this better" />
          </Popover>
        );
  }

}

export default Home
