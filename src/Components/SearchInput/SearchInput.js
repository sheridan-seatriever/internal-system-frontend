import React from 'react';
import styles from './SearchInput.module.css';
import nextId from "react-id-generator";

const SearchInput = ({data, input, setInput, placeholder, setError}) => {

  const id = nextId();

  const mapData = data => {
    if(data && Array.isArray(data)) {
      return data.map(item => <option key={nextId()} value={item} />);
    }
  }

  return (
    <div className={styles.container}>
      <input placeholder={placeholder} list={id} value={input} onChange={e=>{setInput(e.target.value); setError('')}}/>
      <datalist id={id}>
        <option value=""/>
        {mapData(data)}
      </datalist>
    </div>
  )
}

export default SearchInput;