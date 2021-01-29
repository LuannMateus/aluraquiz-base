import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import db from '../db.json';

import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Widget, { QuestionWidget } from '../src/components/Widget';

// import Button from '../src/components/common/Button';
import QuizContainer from '../src/components/QuizContainer';

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const totalQuestion = db.questions.length;
  const question = db.questions[currentQuestion];

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 500);
  }, []);

  function handleSubmit() {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < totalQuestion) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  function LoadingScreen() {
    return (
      <Widget>
        <Widget.Header>
          Carregando...
        </Widget.Header>

        <Widget.Content>
          [Desafio do Loading]
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
          />
        )}

        {screenState === 'LOADING' && <LoadingScreen />}

        {screenState === 'RESULT' && <div>Você acertou X questões, parabéns!!!</div>}

      </QuizContainer>

    </QuizBackground>
  );
}
