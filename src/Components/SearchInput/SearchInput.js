import React from 'react';
import styles from './SearchInput.module.css';

const SearchInput = ({id, data}) => {

  const mapData = data => {
    if(data && Array.isArray(data)) {
      return data.map(item => <option value={item} />);
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