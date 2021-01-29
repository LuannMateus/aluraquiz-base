import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../common/Button';

const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: 4px;
  overflow: hidden;
  h1, h2, h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;

Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};
  
  * {
    margin: 0;
  }
`;

Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`;

export const QuestionWidget = ({
  question, totalQuestion, questionIndex, onSubmit,
}) => {
  const questionId = `question__${questionIndex}`;

  QuestionWidget.propTypes = {
    question: PropTypes.object.isRequired,
    totalQuestion: PropTypes.number.isRequired,
    questionIndex: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkRow href='/' /> */}
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestion}`}
        </h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />

      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>
        <form onSubmit={(infosDoEvento) => {
          infosDoEvento.preventDefault();
          onSubmit();
        }}
        >
          {question.alternatives.map((alternative, index) => {
            const alternativeId = `alternative__${index}`;

            return (
              <Widget.Topic as="label" htmlFor={alternativeId} key={alternativeId}>
                <input
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={false}>
            Confirmar
          </Button>
        </form>
      </Widget.Content>
    </Widget>
  );
};

Widget.Topic = styled.a`
  outline: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => `${theme.colors.primary}40`};
  padding: 10px 15px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: .3s;
  display: block;

  &:hover,
  &:focus {
    opacity: .5;
  }
`;

export default Widget;
