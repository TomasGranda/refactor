import * as React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import './FreeHTML.css';
// import { findDOMNode } from 'react-dom'
// import { XYCoord } from 'dnd-core'
import {
  DragSource,
  DropTarget,
  ConnectDropTarget,
  ConnectDragSource,
  // DropTargetMonitor,
  DragSourceMonitor
} from 'react-dnd'
import ItemTypes from '../../ItemTypes/ItemTypes';

const componentTarget = {
  /*hover(props: IFreeHTMLProps, monitor: DropTargetMonitor, component: FreeHTML) {
    if (!component) {
      return;
    }
    const dragIndex = monitor.getItem().id;
    const hoverIndex = props.id;

    // Don't replace if the item isn't in the stack
    if (dragIndex === null || dragIndex === undefined) {
      return;
    }

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = (findDOMNode(
      component,
    ) as Element).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().id = hoverIndex
  }*/
};

const componentSource = {
  beginDrag(props: IFreeHTMLProps) {
    return {
      id: props.id
    };
  },

  endDrag(props: IFreeHTMLProps, monitor: DragSourceMonitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()

    if (!dropResult) {
      if (confirm("Are you sure?")) {
        props.deleteComponent(item.id);
      }
    }
  }
};

export interface IFreeHTMLProps {
  key: number
  id: number
  type: string
  properties: any
  connectDragSource?: ConnectDragSource
  connectDropTarget?: ConnectDropTarget
  isDragging?: boolean
  isDropped?: boolean
  moveCard: (dragIndex: number, hoverIndex: number) => void,
  handleChange: (properties: any, componentId: number) => void,
  deleteComponent: (componentId: number) => void
};

export interface IFreeHTMLState {
  show: any
}

@DropTarget([ItemTypes.FREEHTML], componentTarget, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(
  (props: IFreeHTMLProps) => props.type,
  componentSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })
)
class FreeHTML extends React.Component<IFreeHTMLProps, IFreeHTMLState> {
  constructor(props: any) {
    super(props);

    this.state = {
      show: false,
    };
  }

  public componentDidMount() {
    this.props.handleChange({ html: "<div>Este es un HTML Libre</div>" }, this.props.id);
  };

  public handleChange = (event: any) => {
    this.props.handleChange({ html: event.target.value }, this.props.id);
  };

  public handleCloseEditor = () => {
    this.setState({
      show: false
    });
  }

  public handleDoubleClick = () => {
    this.setState({ show: true });
  }

  public getHtml = (html: string) => {
    return { __html: html };
  }

  public render() {
    const { connectDragSource, connectDropTarget, id } = this.props;
    const html = this.getHtml(this.props.properties.html);
    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(
          <div className="freeHTML">
            <Row>
              <Col xs={12}>
                <div onDoubleClick={this.handleDoubleClick} dangerouslySetInnerHTML={html} />
                <Modal show={this.state.show} onHide={() => this.handleCloseEditor()}>
                  <Modal.Header closeButton={true}>
                    <Modal.Title>Modal title</Modal.Title>
                  </Modal.Header>

                  <Modal.Body><textarea id={`html-${id}`} onChange={this.handleChange} value={html.__html} /></Modal.Body>

                  <Modal.Footer>
                    <Button onClick={() => this.handleCloseEditor()}>Close</Button>
                  </Modal.Footer>
                </Modal>
              </Col>
            </Row>
          </div>
        )
      )
    );
  };
}

export default FreeHTML;