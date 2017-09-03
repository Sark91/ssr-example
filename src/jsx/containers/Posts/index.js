import React from 'react';
import PaginatedDataTable from 'jsx/components/PaginatedDataTable';

const Posts = () => (
  <div className="posts">
    <PaginatedDataTable
      reducer="posts"
      prop="all"
      model={{
        title: 'Title',
        body: 'Post',
        id: 'ID',
      }}
    />
  </div>
);

export default Posts;