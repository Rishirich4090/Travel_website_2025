import React from 'react';

/**
 * DynamicTable - A reusable table component.
 * @param {Array} columns - [{ key, label, render?: (row) => ReactNode }]
 * @param {Array} data - Array of row objects
 * @param {string} [className] - Optional table className
 * @param {string} [theadClassName] - Optional thead className
 * @param {string} [tbodyClassName] - Optional tbody className
 * @param {string} [rowKey] - Key in data to use as row key (default: 'id')
 * @param {ReactNode} [emptyState] - What to show if no data
 */
const DynamicTable = ({
  columns = [],
  data = [],
  className = 'min-w-full divide-y divide-gray-200',
  theadClassName = 'bg-gray-50',
  tbodyClassName = 'bg-white divide-y divide-gray-200',
  rowKey = 'id',
  emptyState = null,
  ...tableProps
}) => {
  return (
    <table className={className}>
      <thead className={theadClassName}>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className={col.thClassName || 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'}
              onClick={col.onClick}
              style={col.thStyle}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={tbodyClassName}>
        {data.length === 0 && emptyState ? (
          <tr>
            <td colSpan={columns.length} className="text-center py-8">
              {emptyState}
            </td>
          </tr>
        ) : (
          data.map((row, idx) => (
            <tr key={row[rowKey] ?? idx} className={row.trClassName || ''}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={col.tdClassName || 'px-6 py-4 whitespace-nowrap'}
                  style={col.tdStyle}
                >
                  {col.render ? col.render(row, idx, tableProps) : row[col.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default DynamicTable;
