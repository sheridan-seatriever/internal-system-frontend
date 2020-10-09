import React from 'react';
import styles from './SearchInput.module.css';
import nextId from "react-id-generator";

const SearchInput = ({data, value, setValue}) => {

  const id = nextId();

  const mapData = data => {
    if(data && Array.isArray(data)) {
      return data.map(item => <option key={nextId()} value={item} />);
    }
  }

  return (
    <div className={styles.container}>
      <input list={id} value={value} onChange={e=>{setValue(e.target.value)}}/>
      <datalist id={id}>
        <option value=""/>
        {mapData(data)}
      </datalist>
    </div>
  )
}

export default SearchInput;