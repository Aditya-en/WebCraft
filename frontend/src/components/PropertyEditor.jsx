import { useState, useRef } from "react";
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
    <div
      className="p-4 h-5/6 overflow-y-scroll"
      onClick={(e) => e.stopPropagation()}
    >
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
export default PropertyEditor;
