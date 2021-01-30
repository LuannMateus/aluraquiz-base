/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';

import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Button from '../src/components/common/Button';
import Input from '../src/components/common/Input';
import QuizContainer from '../src/components/QuizContainer';
import Link from '../src/components/common/Link';

/* const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  flex: 1;
  background-size: cover;
  background-position: center;
`; */

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Alura Quiz - Goodfellas</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.2 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Goodfellas</h1>
          </Widget.Header>
          <Widget.Content>
            {/* eslint-disable-next-line max-len */}
            <p>Teste os seus conhecimentos sobre o clássico filme Goodfellas e divirta-se criando o seu AluraQuiz!</p>
            <form onSubmit={(infosDoEvento) => {
              infosDoEvento.preventDefault();

              router.push(`/quiz?name=${name}`);

              // Router manda para a próxima página.
            }}
            >
              <Input
                name="nomeDoUsuário"
                placeholder="Diz ai seu nome"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`JOGAR ${name}`}
              </Button>
            </form>

          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.2 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1> Quizes da Galera</h1>
            <p>Dá uma olhada nesses quizes incríveis que o pessoa da Imersão Next Js fez:</p>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, gitHubUser] = linkExterno.replace(/\//g, '')
                  .replace('https:', '').replace('vercel.app', '').split('.');
                return (
                  <li key={linkExterno}>
                    <Widget.Topic as={Link} href={`/quiz/${projectName}___${gitHubUser}`}>
                      {`${gitHubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <GitHubCorner projectUrl="https://github.com/alura-challenges/aluraquiz-base" />

    </QuizBackground>
  );
}
