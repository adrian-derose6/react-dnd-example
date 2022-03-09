import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import initialData from './initial-data';
import Column from './Column';

const Container = styled.div`
	display: flex;
`;

function App() {
	const [taskData, setTaskData] = useState(initialData);
	const [homeIndex, setHomeIndex] = useState(null);

	const onDragStart = (start) => {
		const homeIndex = taskData.columnOrder.indexOf(start.source.droppableId);

		setHomeIndex(homeIndex);
	};

	const onDragEnd = (result) => {
		setHomeIndex(null);

		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
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
		<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
			<Container>
				{taskData.columnOrder.map((columnId, index) => {
					const column = taskData.columns[columnId];
					const tasks = column.taskIds.map((taskId) => taskData.tasks[taskId]);

					const isDropDisabled = index < homeIndex;

					return (
						<Column
							key={column.id}
							column={column}
							tasks={tasks}
							isDropDisabled={isDropDisabled}
						/>
					);
				})}
			</Container>
		</DragDropContext>
	);
}

export default App;
