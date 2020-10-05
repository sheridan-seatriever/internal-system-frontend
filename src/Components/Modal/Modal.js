import React,{useRef} from 'react';
import styles from './Modal.module.css';
import useOutsideAlerter from './useOutsideAlerter';

function Modal(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.callback);

  return (
    <div>
      <div className={`${props.open?styles.overlay:''} `}></div>
      <div className={`${styles.position_container} ${props.open&&styles.open}`}>
        <div ref={wrapperRef} className={`${styles.modal} ${'animated zoomIn bg-blue'} ${styles.transform}`}>{props.children}</div>
      </div>
    </div>
  );
}

export default Modal;