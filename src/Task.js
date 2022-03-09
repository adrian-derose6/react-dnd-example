import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
	border: 1px solid lightgray;
	border-radius: 50%;
	padding: 8px;
	margin-right: 8px;
	background-color: ${(props) =>
		props.isDragDisabled
			? 'lightgray'
			: props.isDragging
			? 'lightgreen'
			: 'white'};
	width: 40px;
	height: 40px;

	display: flex;
	justify-content: center;
	align-items: center;

	&:focus {
		outline: none;
		border-color: red;
	}
`;

export const Task = (props) => {
	const isDragDisabled = props.task.id === 'task-1';

	return (
		<Draggable draggableId={props.task.id} index={props.index}>
			{(provided, snapshot) => (
				<Container
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					isDragging={snapshot.isDragging}
					isDragDisabled={isDragDisabled}
				>
					{props.task.content[0]}
				</Container>
			)}
		</Draggable>
	);
};
