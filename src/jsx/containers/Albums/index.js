import React from 'react';
import PaginatedDataTable from 'jsx/components/PaginatedDataTable';

const Albums = () => (
  <div className="posts">
    <PaginatedDataTable
      reducer="albums"
      prop="all"
      model={{
        id: 'ID',
        title: 'Title',
      }}
    />
  </div>
);

export default Albums;