import React,{} from 'react';
import styles from './AddList.module.css';
import nextId from 'react-id-generator';
import SearchInput from '../SearchInput';
import {cloneDeep} from 'lodash';

const AddList = ({data, placeholder, selectedData, setSelectedData, validate, setError, input, setInput}) => {


  const mapSelectedData = selectedData => {
    if(selectedData&&Array.isArray(selectedData)) {
      return selectedData.map(item => {
        return (
          <div key={nextId()} className={styles.row}>
            <div className={styles.selected_item}>{item}</div>
            <button type="button" className={`${'remove'} ${styles.button}`} onClick={()=>remove(item)}>-</button>
          </div>
        )
      })
    }
  }

  const addEnter = (e, input) => {
    if(e.key === 'Enter') {
      if(input) {
        e.preventDefault();
        add(input);
      }
    }
  }

  const add = input => {
    if(validate(input)) {
      setSelectedData([...selectedData, input]);
      setInput('');
    }
  }  
  
  const remove = item => {
    const newData = cloneDeep(selectedData);
    setError('');
    newData.splice(selectedData.indexOf(item),1);
    setSelectedData(newData);
  }

  const selectCallback = (e, input) => {
    if(e&&e.key&&e.key==='Enter') {
      addEnter(e, input);
    } else {
      add(input);
    }
  }

  return (
    <div className={`${'acf-field acf-input'} ${styles.inner}`}>
      <div className={styles.selected_data_container}>
        {mapSelectedData(selectedData)}
      </div>
      <div className={styles.input_group}>
        {data?
          <SearchInput data={data} input={input} setInput={setInput} placeholder={placeholder} selectCallback={selectCallback} setError={setError}/>:
          <>
            <input placeholder={placeholder} className={styles.input} input={input} value={input} onChange={e=>{setInput(e.target.value); setError('')}} onKeyPress={e=>addEnter(e)}/>
            <button type="button" className={`${'acf-button button button-primary add'} ${styles.button}`} onClick={()=>add(input)} onKeyPress={e=>addEnter(e)}>+</button>
          </>
        }
      </div>
    </div>
  )
}

export default AddList;