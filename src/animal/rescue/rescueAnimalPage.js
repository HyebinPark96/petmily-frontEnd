import { useState, useEffect, useRef } from 'react';

const RescueAnimalPage = () => {
  // const [scrollDirection, setScrollDirection] = useState('');
  // const [scrollY, setScrollY] = useState(0);

  const [scroll, setScroll] = useState(0);
  const wheel = useRef(null);

  const onScrollFunction = () => {
    console.log('window.scrollY: ' + window.scrollY)
    setScroll(window.scrollY);
  };

  useEffect(() => {
    scrollFunction();
  }, [scroll]);

  const scrollFunction = () => {
    if (scroll > 0) {
      wheel.current.scrollIntoView();
    } else {
      console.log('return')
      return;
    }
  };

  return (
    <div onWheel={onScrollFunction} style={{height: 'calc(100% - 67.5px)'}}>
      <div style={{height: '500px', backgroundColor: 'red'}}>1</div>
      <div style={{height: '500px', backgroundColor: 'orange'}}>2</div>
      <div ref={wheel} style={{height: '500px', backgroundColor: 'yellow'}}>3</div>
    </div>
  );

}

export default RescueAnimalPage;