import * as React from 'react';
import './App.css';
import Content from './components/Content/Content';

// import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div style={{ marginTop: "15px" }}>
        <Content />
      </div>
    );
  }
}

export default App;
