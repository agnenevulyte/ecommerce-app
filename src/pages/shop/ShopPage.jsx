import React, {Component} from 'react';
import SHOP_DATA from './shop.data';
import CollectionPreview from '../../components/collection-preview/CollectionPreview';

export default class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: SHOP_DATA,
    };
    console.log(this.state.collections);
  }
  render() {
    const {collections} = this.state;
    return (
      <div className="shop-page">
        {collections.map(({collection}) => (
          <CollectionPreview
            title={collection.title}
            items={collection.items}
          />
        ))}
      </div>
    );
  }
}
