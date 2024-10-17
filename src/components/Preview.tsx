import React from 'react';
import { Component } from '../types';

interface PreviewProps {
  components: Component[];
  selectedComponent: Component | null;
  setSelectedComponent: (component: Component) => void;
  updateComponent: (component: Component) => void;
}

const Preview: React.FC<PreviewProps> = ({
  components,
  selectedComponent,
  setSelectedComponent,
  updateComponent,
}) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, component: Component) => {
    e.dataTransfer.setData('text/plain', component.id.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const componentId = parseInt(e.dataTransfer.getData('text'), 10);
    const component = components.find((c) => c.id === componentId);
    if (component) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      updateComponent({
        ...component,
        position: { x, y },
      });
    }
  };

  return (
    <div
      className="w-full h-full bg-white border-2 border-gray-300 relative overflow-hidden"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {components.map((component) => (
        <div
          key={component.id}
          style={{
            position: 'absolute',
            left: `${component.position.x}px`,
            top: `${component.position.y}px`,
            width: `${component.size.width}px`,
            height: `${component.size.height}px`,
            border: component === selectedComponent ? '2px solid blue' : '1px solid gray',
            padding: '4px',
            cursor: 'move',
            backgroundColor: 'white',
          }}
          onClick={() => setSelectedComponent(component)}
          draggable
          onDragStart={(e) => handleDragStart(e, component)}
        >
          {component.type === 'text' && <p>{component.content}</p>}
          {component.type === 'image' && (
            <img src={component.content} alt="Component" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
          {component.type === 'number' && <span>{component.content}</span>}
        </div>
      ))}
    </div>
  );
};

export default Preview;