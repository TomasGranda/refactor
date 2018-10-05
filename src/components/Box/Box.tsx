import * as React from 'react';

import { ConnectDragSource, DragSource } from 'react-dnd'

const boxSource = {
	beginDrag(props: IBoxProps) {
		return {
			name: props.name,
			type: props.type,
			componentType: props.componentType
		};
	}
};

export interface IBoxProps {
	name: string
	type: string
	icon: string
	componentType: string
	connectDragSource?: ConnectDragSource
	isDragging?: boolean
	isDropped?: boolean
};

@DragSource(
	(props: IBoxProps) => props.type,
	boxSource,
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	})
)
class Box extends React.Component<IBoxProps> {
  public render() {
    const { icon, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    
    return (
      connectDragSource &&
			connectDragSource(
				<div style={{ opacity, display: "inline-block", border: "solid 1px", margin: "5px" }}>
					<img src={`data:image/png;base64,${icon}`} />
				</div>
			)
    );
  };
};

export default Box;