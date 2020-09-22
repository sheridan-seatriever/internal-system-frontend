import React,{useRef} from 'react';
import styles from '../Styles/Modal.module.css';
import useOutsideAlerter from '../Hooks/useOutsideAlerter';

function Modal(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.callback);

  return (
    <div>
      <div className={`${props.open?styles.overlay:''}`}></div>
      <div ref={wrapperRef}>{props.children}</div>
    </div>
  );
}

export default Modal;