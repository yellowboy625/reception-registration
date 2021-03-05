import React from 'react';
import logo from './bg-small.png';
import heartLogo from './heart.svg';
import './hero.css';
import './results.css';
import './heart.css';
import Clock from '../Clock';

class Hero extends React.Component{
  constructor() {
    super();
    
    this.state = {
      api: "https://reception-registration-backend.herokuapp.com",
      search: "",
      rsvp: [],
      searchList: []
    };
  }

  async componentDidMount() {
    this.setState({
      rsvp: await fetch(this.state.api).then(o => o.json())
    })
    
    setInterval(() => {
        this.setState({ 
          search: document.getElementById("search").value,
          searchList: this.findGuest()
        })
    });
  }
  
  findGuest = () => {
    const results = this.state.rsvp.filter(g => g.name.toLowerCase().includes(this.state.search.toLowerCase()));
    if(this.state.search){
      return results;
    } else{
      this.slideClose();
      return [];
    }
  }

  slideOpen = () => {
    document.getElementById("mySidenav").style.width = "400px";
    document.getElementById("App").style.marginLeft  = "-400px";
  }

  slideClose = () => {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("App").style.marginLeft  = "0px";
  }

  slide = e => {
    this.setState({
      search: e.target.value
    });
    this.slideOpen();
  }

  checkin = async g => {
    await fetch(`${this.state.api}/checkin`, {
      method: "POST",
      headers:{
        "content-type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(g)
    });
    
    const index = this.state.rsvp.indexOf(g);
    if (index > -1) {
      this.state.rsvp.splice(index, 1);
      this.setState({
        rsvp: this.state.rsvp
      });
    }
  }

  render() {
    const guestlist = this.state.searchList.map(g => <span onClick={() => this.checkin(g)}>{g.name} - {g.table}</span>);
    return (
      <div>
        <div id="modal">
          <img src={heartLogo} alt="heart" />
        </div>
        <div id="mySidenav" class="sidenav">
          <span class="closebtn" onClick={this.slideClose}>&times;</span>
          {guestlist}
        </div>
        <div id="App" className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <Clock />
          <input id="search" onKeyPress={e => this.slide(e)} />
        </div>
      </div>
    );
  }
}

export default Hero;
