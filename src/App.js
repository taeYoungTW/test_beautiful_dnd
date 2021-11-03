import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { LISTS_DATA } from './data';

function App() {
	const [lists, setLists] = useState(LISTS_DATA);
	const handleOnDragEnd = (res) => {
		if (!res.destination) {
			return;
		}
		const newLists = [...lists];
		const [movedItem] = newLists.splice(res.source.index, 1);
		newLists.splice(res.destination.index, 0, movedItem);
		setLists(newLists);
	};
	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<div className="App">
				<Droppable droppableId="lists" direction="horizontal">
					{(provided) => (
						<div
							className="lists"
							{...provided.droppableProps}
							ref={provided.innerRef}
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								width: '1000px',
								padding: 8,
								backgroundColor: 'gray',
							}}
						>
							{lists.map(({ id, name, age, color, height }, index) => (
								<Draggable key={id} draggableId={id} index={index}>
									{(provided) => (
										<div
											className={`list`}
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											style={{
												backgroundColor: color,
												color: 'blue',
												width: '100px',
												height: '85px',
												...provided.draggableProps.style,
											}}
										>
											name: {name}, age: {age}
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		</DragDropContext>
	);
}

export default App;
