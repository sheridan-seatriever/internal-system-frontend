import React,{} from 'react';
import styles from './AddList.module.css';
import nextId from 'react-id-generator';
import SearchInput from '../SearchInput';

const AddList = ({data, placeholder, selectedData, setSelectedData, validate, setError, input, setInput}) => {


  const mapSelectedData = selectedData => {
    if(selectedData&&Array.isArray(selectedData)) {
      return selectedData.map(item => {
        return (
          <div key={nextId()} className={styles.row}>
            <div>{item}</div>
            <button type="button" className={`${'remove'} ${styles.button}`} onClick={item=>remove(item)}>-</button>
          </div>
        )
      })
    }
  }

  const addEnter = e => {
    if(e.key === 'Enter') {
      if(input) {
        e.preventDefault();
        add();
      }
    }
  }

  const add = () => {
    if(validate(input)) {
      setSelectedData([...selectedData, input]);
      setInput('');
    }
  }  
  
  const remove = item => {
    const newData = [...selectedData]
    newData.splice(selectedData.indexOf(item));
    setSelectedData(newData);
  }


  return (
    <div className={`${'acf-field acf-input'} ${styles.inner}`}>
      <div className={styles.team_members_container}>
        {mapSelectedData(selectedData)}
      </div>
      <div className={styles.input_group}>
        {data?
          <SearchInput placeholder={placeholder} data={data} input={input} setInput={setInput} setError={setError} onKeyPress={e=>addEnter(e)}/>:
          <input placeholder={placeholder} className={styles.input} input={input} value={input} onChange={e=>{setInput(e.target.value); setError('')}} onKeyPress={e=>addEnter(e)}/>
        }
        <button type="button" className={`${'acf-button button button-primary add'} ${styles.button}`} onClick={add}>+</button>
      </div>
    </div>
  )
}

export default AddList;