import React from 'react';
import styles from './SearchInput.module.css';

const SearchInput = ({id, data, item_id, item_property}) => {

  const mapData = data => {
    if(data && Array.isArray(data)) {
      return data.map(item => <option itemId={item[item_id]?item[item_id]:''} value={item[item_property]?item[item_property]:item} />);
    }
  }

  return (
    <div className={styles.container}>
      <input list={id} />
      <datalist id={id}>
        <option value=""/>
        {mapData(data)}
      </datalist>
    </div>
  )
}

export default SearchInput;