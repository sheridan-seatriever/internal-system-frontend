import React,{useState} from 'react';
import styles from './AddList.module.css';
import SearchInput from '../SearchInput';

const AddList = ({data, selectedData, setSelectedData, item_id, item_property}) => {

  const mapSelectedData = selectedData => {
    if(selectedData&&Array.isArray(selectedData)) {
      return selectedData.map(item => {
        return (
          <div className={styles.row}>
            <div>{item}</div>
            <button type="button" className={styles.remove}>-</button>
          </div>
        )
      })
    }
  }

  return (
    <div className={styles.inner}>
      <div className={styles.team_members_container}>
        {mapSelectedData(selectedData)}
      </div>
      <div className={styles.input_group}>
        <SearchInput id="list_id" data={data} item_id={item_id} item_property={item_property} />
        <button type="button" className={`${styles.no_wrap} ${'acf-button button button-primary'}`}>+ ADD PERSON</button>
      </div>
    </div>
  )
}

export default AddList;