import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import internalDb from '../../db.json';

import QuizBackground from '../../src/components/QuizBackground';
import QuizLogo from '../../src/components/QuizLogo';
import Widget, { QuestionWidget } from '../../src/components/Widget';
import Loader from '../../src/components/common/Loader';
import QuizContainer from '../../src/components/QuizContainer';

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ dbExterno = internalDb }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState([]);

  const db = dbExterno;

  const totalQuestion = db.questions.length;
  const question = db.questions[currentQuestion];

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  function QuizScreen() {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 2000);
  }

  useEffect(() => {
    QuizScreen();
    return () => {
      setScreenState({});
    };
  }, []);

  function handleSubmit() {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < totalQuestion) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  // eslint-disable-next-line no-shadow
  function ResultWidget({ results }) {
    const router = useRouter();

    const { name } = router.query;

    ResultWidget.propTypes = {
      // eslint-disable-next-line react/forbid-prop-types
      results: PropTypes.array.isRequired,
    };

    return (
      <Widget>
        <Widget.Header>
          Tela de resultado
        </Widget.Header>

        <Widget.Content>

          <p>
            {
            `
              Parabéns ${name} você acertou ${results.reduce((acc, act) => (act ? acc + 1 : acc), 0)} perguntas
            `
            }

          </p>
          <ul>
            {results.map((result, index) => {
              const resultId = `result__${index}`;
              return (
                <li key={resultId}>
                  {`# ${index + 1}: ${result ? 'Acertou' : 'Errou'}`}
                </li>
              );
            })}
          </ul>
        </Widget.Content>
      </Widget>
    );
  }

  function LoadingScreen() {
    return (
      <Widget>
        <Widget.Header>
          Carregando...
        </Widget.Header>

        <Widget.Content>
          <Loader />
        </Widget.Content>
      </Widget>
    );
  }

  return (

    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === 'QUIZ' && (
          <QuestionWidget
            question={question}
            totalQuestion={totalQuestion}
            questionIndex={currentQuestion}
            onSubmit={handleSubmit}
            addResult={addResult}
          />
        )}

        {screenState === 'LOADING' && <LoadingScreen />}

        {screenState === 'RESULT' && <ResultWidget results={results} />}

      </QuizContainer>

    </QuizBackground>
  );
}

QuizPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dbExterno: PropTypes.object,
};

QuizPage.defaultProps = {
  // eslint-disable-next-line react/forbid-prop-types
  dbExterno: internalDb,
};
