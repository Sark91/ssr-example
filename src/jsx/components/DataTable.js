import React from 'react';
import PropTypes from 'prop-types';
import { Table as BootstrapTable } from 'reactstrap';
import lodashMap from 'lodash/map';

const getHeaderCell = (value) => {
  if (typeof value === 'string') {
    return value;
  }

  return value.title;
};

const getHeader = model => (
  <thead>
    <tr>
      {lodashMap(model, (value, index) => (
        <th key={index}>
          {getHeaderCell(value)}
        </th>
      ))}
    </tr>
  </thead>
);

/**
 * funkction check that in model developer type a renderer function, if yes the use it
 * @param model
 * @param row
 * @param item
 * @returns {*}
 */
const getCellValue = (model, row, item) => {
  let cellRenderer = model[item].cellRenderer;

  if (!cellRenderer) {
    cellRenderer = item => item;
  }

  return cellRenderer(row[item]);
};

const getBody = (model, data) => {
  const order = Object.keys(model);

  return (
    <tbody>
      {data.map(row => (
        <tr key={row.id}>
          {order.map(item => (
            <td key={item}>
              {getCellValue(model, row, item)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

const DataTable = ({ model, data }) => (
  <BootstrapTable striped>
    {getHeader(model)}
    {getBody(model, data)}
  </BootstrapTable>
);

DataTable.propTypes = {
  model: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      title: PropTypes.string,
    }),
  ])).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any.isRequired,
  })),
};

DataTable.defaultProps = {
  data: [],
};

export default DataTable;