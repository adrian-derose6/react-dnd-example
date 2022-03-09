import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import initialData from './initial-data';
import Column from './Column';

const Container = styled.div`
	display: flex;
`;

function App() {
	const [taskData, setTaskData] = useState(initialData);

	const onDragEnd = (result) => {
		const { destination, source, draggableId, type } = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		if (type === 'column') {
			const newColumnOrder = Array.from(taskData.columnOrder);
			newColumnOrder.splice(source.index, 1);
			newColumnOrder.splice(destination.index, 0, draggableId);

			const newState = {
				...taskData,
				columnOrder: newColumnOrder,
			};

			setTaskData(newState);
			return;
		}

		const startColumn = taskData.columns[source.droppableId];
		const finishColumn = taskData.columns[destination.droppableId];

		if (startColumn === finishColumn) {
			let newTaskIds = Array.from(startColumn.taskIds);

			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...startColumn,
				taskIds: newTaskIds,
			};

			const newState = {
				...taskData,
				columns: {
					...taskData.columns,
					[newColumn.id]: newColumn,
				},
			};

			setTaskData(newState);
		}

		// Moving from one list to another
		if (startColumn !== finishColumn) {
			let startTaskIds = Array.from(startColumn.taskIds);
			let finishTaskIds = Array.from(finishColumn.taskIds);

			startTaskIds.splice(source.index, 1);
			finishTaskIds.splice(destination.index, 0, draggableId);

			const newStartCol = {
				...startColumn,
				taskIds: startTaskIds,
			};

			const newFinishCol = {
				...finishColumn,
				taskIds: finishTaskIds,
			};

			const newState = {
				...taskData,
				columns: {
					...taskData.columns,
					[newStartCol.id]: newStartCol,
					[newFinishCol.id]: newFinishCol,
				},
			};

			setTaskData(newState);
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId='all-columns' direction='horizontal' type='column'>
				{(provided) => (
					<Container {...provided.droppableProps} ref={provided.innerRef}>
						{taskData.columnOrder.map((columnId, index) => {
							const column = taskData.columns[columnId];
							const tasks = column.taskIds.map(
								(taskId) => taskData.tasks[taskId]
							);

							return (
								<Column
									key={column.id}
									index={index}
									column={column}
									tasks={tasks}
								/>
							);
						})}
					</Container>
				)}
			</Droppable>
		</DragDropContext>
	);
}

export default App;
