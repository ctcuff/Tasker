import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

interface LoadingOverlayProps {
  show: boolean;
}

const Overlay = styled.div`
  display: ${({ show }: LoadingOverlayProps) => (show ? 'block' : 'none')};
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  z-index: 2;
`;

const Center = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingOverlay = ({ show }: LoadingOverlayProps) => (
  <Overlay show={show}>
    <Center>
      <CircularProgress
        variant="indeterminate"
        disableShrink={false}
        size={90}
        thickness={2}
      />
    </Center>
  </Overlay>
);

export default LoadingOverlay;
