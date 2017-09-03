import React from 'react';
import PaginatedDataTable from 'jsx/components/PaginatedDataTable';

const Todos = () => (
  <div className="posts">
    <PaginatedDataTable
      reducer="todos"
      prop="all"
      model={{
        id: 'ID',
        title: 'Title',
        completed: {
          title: 'Is Ready',
          cellRenderer: item => item ? 'Yes' : 'No', // eslint-disable-line no-confusing-arrow
        },
      }}
    />
  </div>
);

export default Todos;