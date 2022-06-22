import React,{useState} from 'react';
import {DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd';
import './App.css';
import {Carousel} from 'react-bootstrap';

const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
    thumb: '/images/gary.png'
  },
  {
    id: 'cato',
    name: 'Little Cato',
    thumb: '/images/cato.png'
  },
  {
    id: 'kvn',
    name: 'KVN',
    thumb: '/images/kvn.png'
  },
  {
    id: 'mooncake',
    name: 'Mooncake',
    thumb: '/images/mooncake.png'
  },
  {
    id: 'quinn',
    name: 'Quinn Ergon',
    thumb: '/images/quinn.png'
  }
]

function App() {
  const [characters,updateCharacters] = useState(finalSpaceCharacters);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  function handleOnDragEnd(result) {
    if(!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index,1);
    items.splice(result.destination.index,0,reorderedItem);

    updateCharacters(items);
  }
  const changeCarosel = (e,index) => {
    setIndex(index)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                  {characters.map(({id,name,thumb},index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <div className="characters-thumb">
                              <img src={thumb} alt={`${name} Thumb`} onClick={(e) => changeCarosel(e,index)} />
                            </div>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <div style={{height: '500px',width: '500px',background: '#000'}}>
            <Carousel activeIndex={index} onSelect={handleSelect} className='h-100'>
              {characters.map(character=> {
              return <Carousel.Item className='h-100' interval={500}>
                <img
                style={{height: '500px'}}
                  src={character.thumb}
                  alt={character.name}
                />
              </Carousel.Item>
              })}
            </Carousel>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
