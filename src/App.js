import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './Column';

function App() {
	const [taskData, setTaskData] = useState(initialData);

	const onDragEnd = (result) => {
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

		const column = taskData.columns[source.droppableId];
		const newTaskIds = Array.from(column.taskIds);

		newTaskIds.splice(source.index, 1);
		newTaskIds.splice(destination.index, 0, draggableId);

		const newColumn = {
			...column,
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
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			{taskData.columnOrder.map((columnId) => {
				const column = taskData.columns[columnId];
				const tasks = column.taskIds.map((taskId) => taskData.tasks[taskId]);

				return <Column key={column.id} column={column} tasks={tasks} />;
			})}
		</DragDropContext>
	);
}

export default App;
