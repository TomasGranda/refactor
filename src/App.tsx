// React imports
import * as React from 'react';

// Style Imports
import './App.css';

// Components Imports
import Content from './components/Content/Content';

// Drag and Drop Imports
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

// Redux Imports
import { Provider } from "react-redux";
import store from "./store";

class App extends React.Component {
  public render() {
    return (
        <Provider store={store}>
          <DragDropContextProvider backend={HTML5Backend}>
            <Content style={{ marginTop: "15px" }}/>
          </DragDropContextProvider>
        </Provider>
    );
  }
}

export default App;
