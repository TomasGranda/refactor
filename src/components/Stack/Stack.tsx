import * as React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { DropTarget, ConnectDropTarget, DropTargetMonitor } from 'react-dnd'
import { getComponentByType } from '../../utils/getComponentByType';
// import FreeHTML from '../FreeHTML/FreeHTML'

const dustbinTarget = {
  drop(
    props: IDustbinProps,
    monitor: DropTargetMonitor,
    component: React.Component | null
  ) {
    if (!component) {
      return
    }

    // props.onDrop(monitor.getItem())
    const hasDroppedOnChild = monitor.didDrop()
    if (hasDroppedOnChild && !props.greedy) {
      return
    }

    component.setState( (prevState: IDustbinState) => ({
      hasDropped: true,
      hasDroppedOnChild,
      lastItemDropped: monitor.getItem(),
      children: prevState.children
    }));
  }
};

export interface IDustbinProps {
  greedy?: boolean
  accepts: any[]
  isOver?: boolean
  isOverCurrent?: boolean
  connectDropTarget?: ConnectDropTarget
};

export interface IDustbinState {
  children: string[]
  hasDropped: boolean
  hasDroppedOnChild: boolean
  lastItemDropped: any
};

@DropTarget(
  (props: IDustbinProps) => props.accepts,
  dustbinTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
  })
)
class Stack extends React.Component<IDustbinProps, IDustbinState> {
  constructor(props: IDustbinProps) {
    super(props)
    this.state = {
      children: [],
      hasDropped: false,
      hasDroppedOnChild: false,
      lastItemDropped: ""
    }
  };

  public render() {
    const {
      // greedy,
      // isOver,
      // isOverCurrent,
      connectDropTarget,
      // children
    } = this.props
    const { lastItemDropped, hasDropped, hasDroppedOnChild } = this.state
    // let backgroundColor = 'rgba(0, 0, 0, .5)'
    // if (isOverCurrent || (isOver && greedy)) {
    //  backgroundColor = 'darkgreen'
    // }

    return (
      connectDropTarget &&
      connectDropTarget(
        <span>
          <Grid fluid={true} style={{ padding: "10px", borderStyle: "dashed", borderWidth: "2px", minHeight: "50px" }}>
            <Row>
              <Col xs={12}>
                {hasDropped && (
                    <span>{getComponentByType(lastItemDropped.type)} { hasDroppedOnChild && "onChild" }</span>
                )}
              </Col>
            </Row>
          </Grid>
        </span>
      )
    );
  };
};

export default Stack;