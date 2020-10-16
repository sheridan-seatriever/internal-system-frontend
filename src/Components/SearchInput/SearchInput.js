import React,{useState, useEffect, useRef} from 'react';
import styles from './SearchInput.module.css';
import {cloneDeep} from 'lodash';
import useOutsideAlerter from '../../Functions/useOutsideAlerter';

const SearchInput = ({data, input, setInput}) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dropdown, setDropdown] = useState([]);
  const [dataCopy, setDataCopy] = useState([]);

  const onClose = () => {
    setSelectedIndex(0);
    setOpen(false);
  }

  const wrapperRef = {useRef};
  useOutsideAlerter(wrapperRef, onClose, open)

  useEffect(() => {
    setDataCopy(cloneDeep(data));
  }, [data])

  useEffect(() => {
    if(data.length>0) {
      const filtered = data.filter(item=>item.name.toUpperCase().includes(input.toUpperCase()));
      setDataCopy(filtered);
    }
  }, [input, data])

  useEffect(() => {
    const mapData = dataCopy => {
      return dataCopy.map((item, index) => {
        if(index===selectedIndex) {
          return <div className={styles.selected} onClick={()=>console.log(index)} onMouseOver={()=>handleMouseOver(index)} onMouseDown={()=>handleMouseDown(index)}>{item.name}</div>
        } else {
          return <div className={styles.not_selected} onClick={()=>console.log(index)} onMouseOver={()=>handleMouseOver(index)} onMouseDown={()=>handleMouseDown(index)}>{item.name}</div>
        }
      });
    }
    const mapped = mapData(dataCopy);
    setDropdown(mapped);
  }, [selectedIndex, dataCopy])

  const handleKeyPress = e => {
    if(e.key==='ArrowDown') {
      if(selectedIndex+1>=dataCopy.length) {
        setSelectedIndex(0);
      } else {
        setSelectedIndex(selectedIndex+1);
      }
    } else if(e.key==='ArrowUp') {
      if(selectedIndex-1<0) {
        setSelectedIndex(dataCopy.length-1);
      } else {
        setSelectedIndex(selectedIndex-1);
      }
    } else if(e.key==='Enter') {
      setOpen(false);
      setInput(dataCopy[selectedIndex].name);
    }
  }

  const handleMouseOver = index => {
    setSelectedIndex(index);
  }

  const handleMouseDown = index => {
    setInput(dataCopy[index].name);
  }

  const onFocus = () => {
    setOpen(true);
  }

  const onClick = () => {
    setOpen(true);
  }

  const onChange = e => {
    setInput(e.target.value);

  }

  return (
    <div className={styles.container} onFocus={onFocus} onClick={onClick} onKeyDown={handleKeyPress} ref={wrapperRef}>
      <input value={input} onChange={e=>onChange(e)}/>
      <div className={`${open?styles.dropdown:styles.closed}`}>
        {dropdown}
      </div>
    </div>
  )
}

export default SearchInput;