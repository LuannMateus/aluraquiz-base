import React, { useState } from 'react';
import { css } from '@emotion/react';
import LoaderAnimation from 'react-spinners/RingLoader';
import styled from 'styled-components';

const ContentLoader = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;

`;

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Loader() {
  const [loading] = useState(true);
  const [color] = useState('#c62828');

  return (
    <ContentLoader className="sweet-loading">

      <LoaderAnimation color={color} loading={loading} css={override} size={80} />
    </ContentLoader>
  );
}

export default Loader;
