import React,{useState, useEffect, useRef} from 'react';
import styles from './SearchInput.module.css';
import {cloneDeep} from 'lodash';
import useOutsideAlerter from '../../Functions/useOutsideAlerter';
import nextId from 'react-id-generator';

const SearchInput = ({data, input, setInput, placeholder='', selectCallback, setError}) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dropdown, setDropdown] = useState([]);
  const [dataCopy, setDataCopy] = useState([]);

  const onClose = () => {
    setSelectedIndex(0);
    setOpen(false);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onClose, open)

  useEffect(() => {
    setDataCopy(cloneDeep(data));
  }, [data])

  useEffect(() => {
    if(data&&data.length>0) {
      const filtered = data.filter(item=>item.name.toUpperCase().includes(input.toUpperCase()));
      setDataCopy(filtered);
    }
  }, [input, data])

  useEffect(() => {
    const mapData = dataCopy => {
      return dataCopy.map((item, index) => {
        if(index===selectedIndex) {
          return <div key={nextId()} className={styles.selected} onMouseEnter={()=>handleMouseEnter(index)} onClick={()=>handleClick(index)}>{item.name}</div>
        } else {
          return <div key={nextId()} className={styles.not_selected} onMouseEnter={()=>handleMouseEnter(index)} onClick={()=>handleClick(index)}>{item.name}</div>
        }
      });
    }
    const mapped = mapData(dataCopy);
    setDropdown(mapped);
  }, [selectedIndex, dataCopy])

  const handleKeyPress = e => {
    if(e.key==='ArrowDown') {
      e.preventDefault();
      if(selectedIndex+1>=dataCopy.length) {
        setSelectedIndex(0);
      } else {
        setSelectedIndex(selectedIndex+1);
      }
    } else if(e.key==='ArrowUp') {
      e.preventDefault();
      if(selectedIndex-1<0) {
        setSelectedIndex(dataCopy.length-1);
      } else {
        setSelectedIndex(selectedIndex-1);
      }
    } else if(e.key==='Enter') {
      e.preventDefault();
      setError('');
      if(selectCallback) {
        if(dataCopy[selectedIndex]&&dataCopy[selectedIndex].name) {
          selectCallback(e, dataCopy[selectedIndex].name);
          setOpen(false);
        }
      } else {
        if(dataCopy[selectedIndex]&&dataCopy[selectedIndex].name) {
          setInput(dataCopy[selectedIndex].name);
          setOpen(false);
        }
      }
    }
  }

  const handleMouseEnter = index => {
    setSelectedIndex(index);
  }

  const handleClick = index => {
    setError('');
    setInput(dataCopy[index].name);
    if(selectCallback) {
      selectCallback(null, dataCopy[index].name);
    }
    setOpen(false);
  }

  const onFocus = () => {
    setOpen(true);
  }

  const onChange = e => {
    setOpen(true);
    setError('');
    setInput(e.target.value);
  }

  return (
    <div ref={wrapperRef} className={styles.container} onFocus={onFocus}>
      <input value={input} onChange={e=>onChange(e)} placeholder={placeholder} onKeyDown={handleKeyPress}/>
      <div className={`${open?styles.dropdown:styles.closed}`}>
        {dropdown}
      </div>
    </div>
  )
}

export default SearchInput;