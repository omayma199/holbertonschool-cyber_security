import * as React from 'react';
import Checkbox from '@mui/joy/Checkbox';
import Table from '@mui/joy/Table';

export function DataTable({
  columns,
  hoverRow,
  onDeselectAll,
  onDeselectOne,
  onSelectOne,
  onSelectAll,
  rows,
  selectable,
  selected,
  uniqueRowId,
  ...props
}) {
  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  return (
    <Table borderAxis="header" hoverRow={hoverRow} {...props}>
      <thead>
        <tr>
          {selectable ? (
            <th style={{ width: '40px', minWidth: '40px', maxWidth: '40px' }}>
              <Checkbox
                checked={selectedAll}
                indeterminate={selectedSome}
                onChange={(event) => {
                  if (selectedAll) {
                    onDeselectAll?.(event);
                  } else {
                    onSelectAll?.(event);
                  }
                }}
                sx={{ verticalAlign: 'sub' }}
              />
            </th>
          ) : null}
          {columns.map((column) => (
            <th
              key={column.name}
              style={{
                width: column.width,
                minWidth: column.width,
                maxWidth: column.width,
                ...(column.align && { textAlign: column.align }),
              }}
            >
              {column.hideName ? null : column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          const rowId = row.id ? row.id : uniqueRowId?.(row);
          const rowSelected = rowId ? selected?.has(rowId) ?? false : false;

          return (
            <tr key={rowId ?? index}>
              {selectable ? (
                <td>
                  <Checkbox
                    checked={rowId ? rowSelected : false}
                    onChange={(event) => {
                      if (rowSelected) {
                        onDeselectOne?.(event, row);
                      } else {
                        onSelectOne?.(event, row);
                      }
                    }}
                  />
                </td>
              ) : null}
              {columns.map((column) => (
                <td key={column.name} style={{ ...(column.align && { textAlign: column.align }) }}>
                  {column.formatter ? column.formatter(row, index) : column.field ? row[column.field] : null}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
