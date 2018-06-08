import * as React from 'react';
import ContactPage from './containers/ContactPage';
import './App.css';

class App extends React.Component {

  render() {
    return (
      <div className="app">
        {/* TODO React Router */}
        <ContactPage />
      </div>
    );
  }
}

export default App;
