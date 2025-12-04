import React, { useState, useCallback } from "react";

export default function TipTapMenu({ editor, buttons }) {
  const [, setUpdate] = useState(0);

  // Listen to editor updates to trigger re-renders
  React.useEffect(() => {
    if (!editor) return;

    const updateHandler = () => {
      setUpdate(prev => prev + 1);
    };

    editor.on("update", updateHandler);
    editor.on("selectionUpdate", updateHandler);

    return () => {
      editor.off("update", updateHandler);
      editor.off("selectionUpdate", updateHandler);
    };
  }, [editor]);

  if (!editor) return null;

  const MenuButton = ({ onClick, active, icon, title, disabled }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-lg hover:bg-white/10 transition-all duration-200 active:scale-95 flex items-center justify-center ${
        active ? "bg-brand-3 text-white" : "text-gray-300"
      } ${
        disabled ? "opacity-40 cursor-not-allowed hover:bg-transparent" : "hover:text-white"
      }`}
      title={title}
      aria-label={title}
    >
      <span className="w-5 h-5 flex items-center justify-center">
        {icon}
      </span>
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-gray-900/80  border border-gray-700 shadow-lg">
      {buttons.map((group, idx) => (
        <div 
          key={idx} 
          className="flex items-center gap-1 last:border-r-0 border-r border-gray-700 pr-3 last:pr-0"
        >
          {group.map((btn, i) => (
            <MenuButton
              key={i}
              onClick={() => btn.action(editor)}
              active={btn.active ? btn.active(editor) : false}
              icon={btn.icon}
              title={btn.title}
              disabled={btn.disabled ? btn.disabled(editor) : false}
            />
          ))}
        </div>
      ))}
    </div>
  );
}