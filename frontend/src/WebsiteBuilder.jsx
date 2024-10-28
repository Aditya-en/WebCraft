import React, { useState, useRef } from "react";
import { GripVertical, Layout, Image, Type, Box, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const componentTemplates = {
  section: {
    defaultStyles: {
      padding: "20px",
      margin: "10px 0",
      backgroundColor: "#ffffff",
      border: "1px solid #eee",
      width: "200px",
      height: "100px",
    },
  },
  text: {
    defaultStyles: {
      fontSize: "16px",
      color: "#000000",
      width: "auto",
      minWidth: "100px",
    },
  },
  image: {
    defaultStyles: {
      maxWidth: "100%",
      height: "auto",
      width: "200px",
    },
  },
  button: {
    defaultStyles: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#ffffff",
      border: "none",
      borderRadius: "4px",
      width: "auto",
      minWidth: "100px",
    },
  },
};

const WebsiteBuilder = () => {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef(null);

  const generateId = () =>
    `component-${Math.random().toString(36).substr(2, 9)}`;

  const getRelativeCoordinates = (e) => {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - canvasRect.left,
      y: e.clientY - canvasRect.top,
    };
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData("componentType");
    const { x, y } = getRelativeCoordinates(e);

    const newComponent = {
      id: generateId(),
      type: componentType,
      content:
        componentType === "text"
          ? "Edit this text"
          : componentType === "button"
          ? "Click me"
          : "",
      styles: {
        ...componentTemplates[componentType].defaultStyles,
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)", // Center at drop point
      },
      children: [],
    };

    setComponents([...components, newComponent]);
    setSelectedComponent(newComponent);
  };

  const handleDragStart = (e, component) => {
    e.stopPropagation();
    setIsDragging(true);
    // Store the initial mouse offset within the component
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        componentId: component.id,
        offsetX,
        offsetY,
      })
    );
  };

  const handleComponentDrop = (e) => {
    e.preventDefault();
    const { x, y } = getRelativeCoordinates(e);

    try {
      const { componentId, offsetX, offsetY } = JSON.parse(
        e.dataTransfer.getData("text/plain")
      );

      setComponents(
        components.map((comp) => {
          if (comp.id === componentId) {
            return {
              ...comp,
              styles: {
                ...comp.styles,
                left: `${x - offsetX}px`,
                top: `${y - offsetY}px`,
              },
            };
          }
          return comp;
        })
      );
    } catch (err) {
      // Handle new component drop
      handleDrop(e);
    }

    setIsDragging(false);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const ComponentPreview = ({ component }) => {
    const style = {
      ...component.styles,
      cursor: isDragging ? "grabbing" : "grab",
      outline:
        selectedComponent?.id === component.id ? "2px solid #007bff" : "none",
      userSelect: "none",
    };

    const handleClick = (e) => {
      e.stopPropagation();
      setSelectedComponent(component);
    };

    const handleDoubleClick = (e) => {
      e.stopPropagation();
      setEditingId(component.id);
    };

    const isEditing = editingId === component.id;

    const commonProps = {
      style,
      onClick: handleClick,
      draggable: !isEditing,
      onDragStart: (e) => handleDragStart(e, component),
      onDragEnd: handleDragEnd,
      className: "relative group",
    };

    switch (component.type) {
      case "section":
        return (
          <div {...commonProps}>
            <div className="absolute -top-3 left-2 bg-blue-100 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
              Section
            </div>
            {component.children.map((child) => (
              <ComponentPreview key={child.id} component={child} />
            ))}
          </div>
        );

      case "text":
        return isEditing ? (
          <input
            {...commonProps}
            type="text"
            value={component.content}
            onChange={(e) => handleContentEdit(component, e.target.value)}
            onBlur={() => setEditingId(null)}
            autoFocus
            className="p-2 border rounded"
            draggable={false}
          />
        ) : (
          <p {...commonProps} onDoubleClick={handleDoubleClick}>
            {component.content}
          </p>
        );

      case "image":
        return (
          <div {...commonProps}>
            <img
              src="/api/placeholder/400/300"
              alt="placeholder"
              className="w-full"
              draggable={false}
            />
          </div>
        );

      case "button":
        return isEditing ? (
          <input
            {...commonProps}
            type="text"
            value={component.content}
            onChange={(e) => handleContentEdit(component, e.target.value)}
            onBlur={() => setEditingId(null)}
            autoFocus
            className="p-2 border rounded"
            draggable={false}
          />
        ) : (
          <button {...commonProps} onDoubleClick={handleDoubleClick}>
            {component.content}
          </button>
        );

      default:
        return null;
    }
  };

  const handleContentEdit = (component, newContent) => {
    const newComponents = components.map((c) =>
      c.id === component.id ? { ...c, content: newContent } : c
    );
    setComponents(newComponents);
    setSelectedComponent(newComponents.find((c) => c.id === component.id));
  };

  const PropertyEditor = ({ component, onUpdate }) => {
    const [activeField, setActiveField] = useState(null);
    const inputRefs = useRef({});

    if (!component)
      return (
        <div className="p-4 text-gray-500 text-sm">
          Select an element to edit its properties
        </div>
      );

    const updateStyle = (property, value) => {
      const updatedComponent = {
        ...component,
        styles: {
          ...component.styles,
          [property]: value,
        },
      };
      onUpdate(updatedComponent);
      if (activeField) {
        setTimeout(() => {
          inputRefs.current[activeField]?.focus();
        }, 0);
      }
    };

    const updateContent = (value) => {
      const updatedComponent = {
        ...component,
        content: value,
      };
      onUpdate(updatedComponent);
      if (activeField) {
        setTimeout(() => {
          inputRefs.current[activeField]?.focus();
        }, 0);
      }
    };

    return (
      <div className="p-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-semibold mb-4 text-sm">Edit {component.type}</h3>

        {(component.type === "text" || component.type === "button") && (
          <div className="mb-4">
            <label className="block text-sm mb-1">Content</label>
            <input
              ref={(el) => (inputRefs.current["content"] = el)}
              type="text"
              value={component.content}
              onChange={(e) => updateContent(e.target.value)}
              onFocus={() => setActiveField("content")}
              onBlur={() => setActiveField(null)}
              className="w-full p-2 border rounded"
            />
          </div>
        )}

        <h4 className="font-medium text-sm mb-2">Styles</h4>
        {Object.entries(component.styles).map(([property, value]) => (
          <div key={property} className="mb-3">
            <label className="block text-sm mb-1">
              {property.charAt(0).toUpperCase() + property.slice(1)}
            </label>
            <input
              ref={(el) => (inputRefs.current[property] = el)}
              type="text"
              value={value}
              onChange={(e) => updateStyle(property, e.target.value)}
              onFocus={() => setActiveField(property)}
              onBlur={() => setActiveField(null)}
              className="w-full p-2 border rounded text-sm"
            />
          </div>
        ))}
      </div>
    );
  };

  const handleCanvasClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedComponent(null);
      setEditingId(null);
    }
  };

  return (
    <div className="h-screen flex">
      <div className="w-64 bg-gray-100 border-r">
        <div className="p-4">
          <h2 className="font-semibold mb-4">Components</h2>
          <div className="space-y-3">
            {Object.keys(componentTemplates).map((type) => (
              <Card
                key={type}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("componentType", type);
                }}
                className="cursor-move hover:border-blue-500"
              >
                <CardContent className="p-3 flex items-center space-x-2">
                  <GripVertical className="h-4 w-4" />
                  <span className="capitalize">{type}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-12 border-b flex items-center justify-between px-4">
          <div className="flex space-x-4">
            <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md">
              Publish
            </button>
            <button className="px-3 py-1 text-sm border rounded-md flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        <div
          ref={canvasRef}
          className="flex-1 bg-gray-50 p-8 overflow-y-auto relative"
          onDrop={handleComponentDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={handleCanvasClick}
        >
          <div className="max-w-4xl mx-auto min-h-full bg-white shadow-sm border rounded-lg p-8 relative">
            {components.length === 0 ? (
              <div className="border-2 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <p>Drag components here to start building</p>
                  <p className="text-sm">or choose a template to begin</p>
                </div>
              </div>
            ) : (
              components.map((component) => (
                <ComponentPreview key={component.id} component={component} />
              ))
            )}
          </div>
        </div>
      </div>

      <div className="w-64 bg-gray-100 border-l">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Properties</h2>
        </div>
        <PropertyEditor
          component={selectedComponent}
          onUpdate={(updated) => {
            const newComponents = components.map((c) =>
              c.id === updated.id ? updated : c
            );
            setComponents(newComponents);
          }}
        />
      </div>
    </div>
  );
};

export default WebsiteBuilder;
