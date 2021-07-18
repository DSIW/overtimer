import TimeLog from '../../domain/TimeLog'
import {State} from './formDialogReducer';
import {Dispatch, useEffect, useState} from "react";

export default function useStateFromProps(timeLog: TimeLog): [State, Dispatch<State>] {
  const initial: State = {
    timeLog,
    error: false
  };

  const [state, setState] = useState(initial);

  useEffect(() => {
    setState(initial)
  }, [timeLog]);

  return [state, setState]
}
