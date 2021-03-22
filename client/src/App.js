import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/layouts/Header';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Wines from './components/layouts/Wines';
import Wine from './components/layouts/Wine';
import AddWine from './components/layouts/AddWine';
import EditWine from './components/layouts/EditWine';

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios
      .get('/wines')
      .then((res) => setPosts(res.data))
      .catch(error => console.log(error));
  }, [posts])

  return (
    <div className="App">
      <Header />
      <Navbar />
      <Route exact path='/' render={() => <Wines posts={posts} />} />
      <Route 
        path='/wine/:id' 
        render={(props) => <Wine {...props} posts={posts} />} 
      />
      <Route 
        path='/update/:id' 
        render={(props) => <EditWine {...props} posts={posts} />} 
      />
      <Route path='/add-wine' component={AddWine} />

      <Footer />
    </div>
  );
}

export default App;
