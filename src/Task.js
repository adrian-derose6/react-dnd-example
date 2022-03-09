import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
	border: 1px solid lightgray;
	border-radius: 2px;
	padding: 8px;
	margin-bottom: 8px;
	background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
	display: flex;
`;

export const Task = (props) => {
	return (
		<Draggable draggableId={props.task.id} index={props.index}>
			{(provided, snapshot) => (
				<Container
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					isDragging={snapshot.isDragging}
				>
					{props.task.content}
				</Container>
			)}
		</Draggable>
	);
};
