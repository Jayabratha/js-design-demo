import React, { useState, useEffect, useRef, Fragment } from 'react';
import './list.scss';

function AnimateList(props: any) {
  const interval = useRef<number>(0);
  const count = useRef<number>(0);
  const updatedList = useRef<any[]>([]);
  const [animatedList, setAnimatedList] = useState<any[]>([]);

  useEffect(() => {
    let timeout: number;
    function animateList() {
      const list: any[] = props.children;
      const listLength: number = list.length;

      updatedList.current = list;
      setAnimatedList([...updatedList.current]);

      interval.current = window.setInterval(() => {
        if (count.current < listLength) {
          updatedList.current = list.map((item, index) => {
            if (index <= count.current) {
              return React.cloneElement(item, { ...item.props, className: `${item.props.className} show` });
            } else {
              return item;
            }
          });
          setAnimatedList([...updatedList.current]);
          count.current++;
        } else {
          window.clearInterval(interval.current);
        }
      }, props.interval ? props.interval : 100);
    }

    if (props.animate && !props.disable) {
      timeout = window.setTimeout(() => {
        animateList();
      }, props.delay ? props.delay : 0);
    } else {
      setAnimatedList([...props.children.map(
        (item: any) => React.cloneElement(item, { ...item.props, className: `${item.props.className} show` }))]);
    }

    return function reset() {
      count.current = 0;
      updatedList.current = [];
      setAnimatedList([]);
      window.clearInterval(interval.current);
      window.clearTimeout(timeout);
    };
  }, [props]);

  return (
    <Fragment>
      {animatedList}
    </Fragment>
  );
}

export default AnimateList;
