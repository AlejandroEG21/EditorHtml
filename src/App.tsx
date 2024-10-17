import React, { useState } from 'react';
import ComponentList from './components/ComponentList';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { Component } from './types';

function App() {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);

  const addComponent = (type: string) => {
    const newComponent: Component = {
      id: Date.now(),
      type,
      content: type === 'text' ? 'Nuevo texto' : type === 'image' ? 'https://via.placeholder.com/150' : '0',
      position: { x: 0, y: 0 },
      size: { width: 100, height: 100 },
    };
    setComponents([...components, newComponent]);
  };

  const updateComponent = (updatedComponent: Component) => {
    setComponents(components.map(c => c.id === updatedComponent.id ? updatedComponent : c));
    setSelectedComponent(updatedComponent);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 bg-white p-4 overflow-y-auto">
        <ComponentList
          addComponent={addComponent}
          components={components}
          setSelectedComponent={setSelectedComponent}
        />
      </div>
      <div className="w-1/2 bg-gray-200 p-4">
        <Preview
          components={components}
          selectedComponent={selectedComponent}
          setSelectedComponent={setSelectedComponent}
          updateComponent={updateComponent}
        />
      </div>
      <div className="w-1/4 bg-white p-4">
        <Editor
          selectedComponent={selectedComponent}
          updateComponent={updateComponent}
        />
      </div>
    </div>
  );
}

export default App;