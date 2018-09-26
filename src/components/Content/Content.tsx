import { Grid, Row, Col } from 'react-bootstrap';

import * as React from 'react'
import Toolbar from '../Toolbar/Toolbar';
import Stack from '../Stack/Stack';

import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ItemTypes from '../../ItemTypes/ItemTypes';

class Content extends React.Component {
  public render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Grid fluid={true}>
          <Row>
            <Col xs={2}>
              <Toolbar />
            </Col>
            <Col xs={1} />
            <Col xs={6}>
              <Stack accepts={[ItemTypes.BOX, ItemTypes.FREEHTML]} />
            </Col>
            <Col xs={3} />
          </Row>
        </Grid>
      </DragDropContextProvider>
    );
  }
}

export default Content;