import React from 'react';
import RichTextEditor from './RichTextEditor';

const RichTextField = ({ value, onChange, placeholder = 'Enter description...', className }) => {
  return (
    <div className={className}>
      <RichTextEditor value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
};

export default RichTextField;
