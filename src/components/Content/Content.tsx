// React Imports
import * as React from 'react'

// Redux Imports
import { connect } from "react-redux";
import { getComponentList } from '../../actions/pageActions';

// Components Imports
import Toolbar from '../Toolbar/Toolbar';
import Stack from '../Stack/Stack';

// Bootstrap imports
import { Grid, Row, Col } from 'react-bootstrap';

// Drag and Drop Imports
import ItemTypes from '../../ItemTypes/ItemTypes';

// Utils Imports
import { renderComponent } from '../../utils/renderComponent';
import compareArrays from '../../utils/compareArrays';

export interface IContentProps {
  style: any
  structureList: any[]
  // Redux Props
  getComponentList: () => void
};

class Content extends React.Component<IContentProps, { children: any }> {
  constructor(props: any){
    super(props);

    this.state = {
      children: [(<div />)]
    }
  }
  public getComponentList = () => {
    this.props.getComponentList();
  }

  public componentDidUpdate = async (prevProps: any, prevState: any) => {
    if(compareArrays(this.state.children, prevState.children)){
      this.setState({
        children: await renderComponent(this.props.structureList)
      });
    }
  };

  public render() {
    this.getComponentList();
    const { children } = this.state;
    return (
      <Grid fluid={true}>
        <Row>
          <Col xs={2}>
            <Toolbar />
          </Col>
          <Col xs={8}>
            <Stack principal={true} accepts={[ItemTypes.BOX]}>
              {children}
            </Stack>
          </Col>
          <Col xs={2} />
        </Row>
      </Grid>
    );
  };
};

const mapStateToProps = (state: any) => ({
  structureList: state.page.structure
});

export default connect(mapStateToProps, { getComponentList })(Content);