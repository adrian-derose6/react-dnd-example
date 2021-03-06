import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import { Task } from './Task.js';

const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgrey;
	border-radius: 2px;
	width: 220px;
	display: flex;
	flex-direction: column;
`;
const Title = styled.h3`
	padding: 8px;
`;

const TaskList = styled.div`
	background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'white')};
	transition: background-color 0.2s ease;
	padding: 8px;
	flex-grow: 1;
	min-height: 100px;
`;

const Column = (props) => {
	return (
		<Container>
			<Title>{props.column.title}</Title>
			<Droppable
				droppableId={props.column.id}
				isDropDisabled={props.isDropDisabled}
				//type={props.column.id === 'column-3' ? 'done' : 'active'}
			>
				{(provided, snapshot) => (
					<TaskList
						ref={provided.innerRef}
						{...provided.droppableProps}
						isDraggingOver={snapshot.isDraggingOver}
					>
						{props.tasks.map((task, index) => (
							<Task key={task.id} task={task} index={index} />
						))}
						{provided.placeholder}
					</TaskList>
				)}
			</Droppable>
		</Container>
	);
};

export default Column;
