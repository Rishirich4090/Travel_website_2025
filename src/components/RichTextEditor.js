
import React, { useRef, useEffect } from 'react';

const toolbarButtons = [
  { cmd: 'bold', label: 'B', title: 'Bold', style: { fontWeight: 'bold' } },
  { cmd: 'italic', label: 'I', title: 'Italic', style: { fontStyle: 'italic' } },
  { cmd: 'underline', label: 'U', title: 'Underline', style: { textDecoration: 'underline' } },
  { cmd: 'insertUnorderedList', label: '• List', title: 'Bullet List' },
  { cmd: 'insertOrderedList', label: '1. List', title: 'Numbered List' },
  { cmd: 'removeFormat', label: 'Clear', title: 'Remove Formatting' },
];

const RichTextEditor = ({ value, onChange, placeholder = 'Enter text...', className = '' }) => {
  const editorRef = useRef(null);

  const handleCommand = (cmd) => {
    editorRef.current.focus();
    document.execCommand(cmd, false, null);
    // After formatting, update value
    setTimeout(() => {
      if (onChange) onChange(editorRef.current.innerHTML);
    }, 0);
  };


  // Keep contentEditable div in sync with value prop
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== (value || '')) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = () => {
    if (onChange) onChange(editorRef.current.innerHTML);
  };

  return (
    <div className={`rich-text-editor ${className}`}>
      <div className="border-b border-gray-200 p-2 flex gap-2 flex-wrap items-center bg-gray-50 rounded-t">
        {toolbarButtons.map(btn => (
          <button
            key={btn.cmd}
            type="button"
            onClick={() => handleCommand(btn.cmd)}
            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
            title={btn.title}
            style={btn.style}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[120px] p-3 focus:outline-none bg-white border border-gray-200 rounded-b text-sm"
        style={{ fontFamily: 'inherit' }}
        onInput={handleInput}
        onBlur={handleInput}
        placeholder={placeholder}
        spellCheck={true}
        aria-label={placeholder}
        suppressContentEditableWarning={true}
      />
    </div>
  );
};

export default RichTextEditor;
