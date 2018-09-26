import * as React from 'react';

import {
	ConnectDragSource,
	DragSource
} from 'react-dnd'

const boxSource = {
	beginDrag(props: IBoxProps) {
		return {
			name: props.name,
			type: props.type
		};
	}
};

export interface IBoxProps {
	name: string
	type: string
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
    const { name, isDropped, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    
    return (
      connectDragSource &&
			connectDragSource(
				<div style={{ opacity }}>
					{isDropped ? <s>{name}</s> : name}
				</div>,
			)
    );
  }
}

export default Box;