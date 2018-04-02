import React from 'react'
import Header from "./components/header";
import Footer from "./components/footer";
import Body from "./components/body";

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){

    return <div className="container is-fullhd">
      <Header/>
      <Body/>
      <Footer/>

    </div>
  }

}

export default App;
