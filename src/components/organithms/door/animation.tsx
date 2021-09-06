import styled from 'styled-components';
import { ILockedProps } from '../../../interfaces/locked-state';
import { GroupIconButton } from '../../molecules/door/group-icon-button';
import { IStyledComponentsProps } from '../../../interfaces/styled-components';

export const Animation = styled(
  (props: ILockedProps & IStyledComponentsProps) => {
    return <GroupIconButton {...props} />;
  },
)``;
