import React from 'react';
// import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import Quiz from './index';

// eslint-disable-next-line react/prop-types
const QuizDaGaleraPage = ({ dbExterno }) => (
  // eslint-disable-next-line react/prop-types
  <ThemeProvider theme={dbExterno.theme}>
    <Quiz dbExterno={dbExterno} />
  </ThemeProvider>
);

export async function getServerSideProps(context) {
  const [projectName, gitHubUser] = context.query.id.split('___');
  const dbExterno = await fetch(`https://${projectName}.${gitHubUser}.vercel.app/api/db`)
    .then((respostaDoServer) => {
      if (respostaDoServer.ok) {
        return respostaDoServer.json();
      }

      throw new Error('Falha em pegar os dados.');
    })
    .then((respostaDoServerOBJ) => respostaDoServerOBJ)
    .catch((err) => err);

  return {
    props: {
      dbExterno,
    },
  };
}

export default QuizDaGaleraPage;
