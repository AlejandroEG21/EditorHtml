import React from 'react';
import { Component } from '../types';

interface EditorProps {
  selectedComponent: Component | null;
  updateComponent: (component: Component) => void;
}

const Editor: React.FC<EditorProps> = ({ selectedComponent, updateComponent }) => {
  if (!selectedComponent) {
    return <div>Selecciona un componente para editar</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateComponent({
      ...selectedComponent,
      [name]: name === 'content' ? value : parseInt(value, 10),
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Editor</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Contenido:</label>
          {selectedComponent.type === 'text' ? (
            <textarea
              name="content"
              value={selectedComponent.content}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          ) : (
            <input
              type={selectedComponent.type === 'number' ? 'number' : 'text'}
              name="content"
              value={selectedComponent.content}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          )}
        </div>
        <div>
          <label className="block mb-1">Posición X:</label>
          <input
            type="number"
            name="x"
            value={selectedComponent.position.x}
            onChange={(e) => updateComponent({
              ...selectedComponent,
              position: { ...selectedComponent.position, x: parseInt(e.target.value, 10) },
            })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Posición Y:</label>
          <input
            type="number"
            name="y"
            value={selectedComponent.position.y}
            onChange={(e) => updateComponent({
              ...selectedComponent,
              position: { ...selectedComponent.position, y: parseInt(e.target.value, 10) },
            })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Ancho:</label>
          <input
            type="number"
            name="width"
            value={selectedComponent.size.width}
            onChange={(e) => updateComponent({
              ...selectedComponent,
              size: { ...selectedComponent.size, width: parseInt(e.target.value, 10) },
            })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Alto:</label>
          <input
            type="number"
            name="height"
            value={selectedComponent.size.height}
            onChange={(e) => updateComponent({
              ...selectedComponent,
              size: { ...selectedComponent.size, height: parseInt(e.target.value, 10) },
            })}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;