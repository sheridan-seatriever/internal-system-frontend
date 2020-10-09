import React,{useState} from 'react';
import styles from './AddList.module.css';
import nextId from 'react-id-generator';
import SearchInput from '../SearchInput';

const AddList = ({data, selectedData, setSelectedData}) => {

  const [input, setInput] = useState('');

  const mapSelectedData = selectedData => {
    if(selectedData&&Array.isArray(selectedData)) {
      return selectedData.map(item => {
        return (
          <div key={nextId()} className={styles.row}>
            <div>{item}</div>
            <button type="button" className={styles.remove} onClick={item=>remove(item)}>-</button>
          </div>
        )
      })
    }
  }

  const add = () => {
    
  }  
  
  const remove = item => {
    const newData = [...selectedData]
    newData.splice(selectedData.indexOf(item));
    setSelectedData(newData);
  }


  return (
    <div className={styles.inner}>
      <div className={styles.team_members_container}>
        {mapSelectedData(selectedData)}
      </div>
      <div className={styles.input_group}>
        {data?
          <SearchInput id="list_id" data={data} input={input} setInput={setInput}/>:
          <input className={styles.input} input={input} value={input} onChange={e=>setInput(e.target.value)} />
        }
        <button type="button" className={`${'acf-button button button-primary add'}`} onClick={()=>{
          if(input) {
            setSelectedData([...selectedData, input]);
            setInput('');
          }
        }}>+</button>
      </div>
    </div>
  )
}

export default AddList;