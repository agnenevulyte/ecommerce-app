import React from 'react';
import './collection-preview.styles.scss';

// if items array gets too big, it's going to influence the performance and slow the website down
// the CollectionPreview component gets rendered, the filter/map function call gets called every time
export default function CollectionPreview({title, items}) {
  return (
    <div className="collection-preview">
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">
        {items
          .filter((item, idx) => idx < 4)
          .map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
      </div>
    </div>
  );
}
