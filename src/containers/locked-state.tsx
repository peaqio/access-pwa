import { useState, useLayoutEffect, useEffect } from 'react';
import { ILockedProps } from '../interfaces/locked-state';
import { connect } from 'react-redux';
import Router from 'next/router';
import { Dispatch } from 'redux';
import { ACCESS_DOOR } from '../store/actions/door/access-door';
import { NextPage } from 'next';

export const withLockedState = <
  P extends Partial<
    Pick<
      ILockedProps,
      // tslint:disable-next-line: max-union-size
      'isLocked' | 'time' | 'currentTime' | 'toggleButton' | 'selected'
    >
  >
>(
  Component: NextPage<P>,
) => {
  return connect(mapStateToProps)((props: P & { dispatch: Dispatch }) => {
    const [isLocked, setIsLocked] = useState(true);
    const time = props.time;
    const [currentTime, setCurrentTime] = useState(Date.now());
    const toggleButton = () => {
      ACCESS_DOOR(props.selected.ppk, props.selected.cpk)(props.dispatch).then(
        (response) => {
          setIsLocked(!isLocked);
          setState('unlocked');

          return response;
        },
      );
    };
    const closeDoor = () => {
      setIsLocked(true);
      setState('locked');
    };
    const [state, setState] = useState('locked');

    useEffect(() => {
      if (props.selected === null) {
        Router.push('/');
      }
    }, [props.selected]);

    useLayoutEffect(() => {
      const interval = setInterval(() => {
        const newCurrentTime = Date.now();

        setCurrentTime(newCurrentTime);

        if (time - newCurrentTime > 4000) {
          setState('unlocked');
        } else if (time - newCurrentTime > 500) {
          setState('almostLocked');
        } else {
          setState('locked');
        }
      }, 100);

      return () => clearInterval(interval);
    }, [time]);

    return (
      <Component
        {...props}
        isLocked={isLocked}
        time={time}
        currentTime={currentTime}
        toggleButton={toggleButton}
        state={state}
        closeDoor={closeDoor}
        selected={props.selected}
      />
    );
  });
};

function mapStateToProps(state, props) {
  return {
    ...props,
    selected: state.Door.selected,
    time: state.Door.time,
  };
}
