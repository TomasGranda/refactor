// React Imports
import * as React from 'react';

// Redux Imports
import { addComponent } from '../../actions/componentsActions';
import { connect } from "react-redux";

// Bootstrap Imports
import { Grid } from 'react-bootstrap';

// Drag and Drop Imports
import { DropTarget, ConnectDropTarget, DropTargetMonitor } from 'react-dnd'

const dustbinTarget = {
  drop(props: IDustbinProps, monitor: DropTargetMonitor, component: Stack | null) {
    if (!component) return;
    if(monitor.didDrop() && !props.greedy) return;

    const item = monitor.getItem();
    let newComponent: any = {
      type: item.componentType,
    };

    if(item.componentType === "col"){
      newComponent = {
        type: item.componentType,
        children: [
          {
            type: "stack",
            id: 545648924,
            children: []
          },
          {
            type: "stack",
            id: 545364894,
            children: []
          },
          {
            type: "stack",
            id: 545644894,
            children: []
          },
          {
            type: "stack",
            id: 545645894,
            children: []
          }
        ]
      }
    }

    if (props.principal) {
      props.addComponent(newComponent, 0);
    } else {
      const stackId = props.id || 0;
      props.addComponent(newComponent, stackId);
    }
  }
};

export interface IDustbinProps {
  id?: number
  type?: string
  properties?: any
  principal: boolean
  greedy?: boolean
  accepts: string[]
  connectDropTarget?: ConnectDropTarget
  // Redux Props
  addComponent: (component: any, stackId: number) => void
};

@DropTarget(
  (props: IDustbinProps) => props.accepts,
  dustbinTarget,
  (connector) => ({
    connectDropTarget: connector.dropTarget(),
  })
)
class Stack extends React.Component<IDustbinProps> {
  public render() {
    const {
      connectDropTarget,
      children
    } = this.props

    return (
      connectDropTarget &&
      connectDropTarget(
        <div>
          <Grid fluid={true} style={{ padding: "10px", borderStyle: "dashed", borderWidth: "2px", minHeight: "200px" }}>
            {children}
          </Grid>
        </div>
      )
    );
  };
};

export default connect(null, { addComponent })(Stack);