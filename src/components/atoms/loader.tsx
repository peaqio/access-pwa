import styled from 'styled-components';
import { IStyledComponentsProps } from '../../interfaces/styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

export const Loader = styled((props: IStyledComponentsProps) => {
  return (
    <div className={props.className}>
      <CircularProgress color="primary" />
    </div>
  );
})`
  display: flex;
  justify-content: center;
`;
