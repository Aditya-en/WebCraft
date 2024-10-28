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
export default ComponentPreview;
