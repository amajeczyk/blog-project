import React  from 'react';
import './App.css';

import {
  Routes,
  Route,
} from "react-router-dom";
import  Login from './components/login/Login';
import LandingPage from './LandingPage';
import Registration from './components/login/Registration';
import { authenticationService } from './_services/authentication.service';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user : null,
      userIsFetched : false
    }
  }

  setCurrenUser = () => {
    console.log('setCurrenUser')
    authenticationService.authenticateRequest().then(result => {
      this.setState( {user : result, userIsFetched : true} );
    });
  }

  componentDidMount() {
    this.setCurrenUser();
  }


  render()
  {
    return (
      <div className='main-wrapper'>      
        <Routes>
          <Route path='/register' element={<Registration/>}/>
          <Route path='/login'  element={<Login setCurrenUser={this.setCurrenUser}/>}/>
          {this.state.userIsFetched  && <Route path='/' element={<LandingPage user={this.state.user} setCurrenUser={this.setCurrenUser}/>}/> } 
        </Routes>
      </div>)
  }
 
}

export default App;
