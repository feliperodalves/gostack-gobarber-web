import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />
      <form action="">
        <h1>Faça seu logon</h1>
        <Input icon={FiMail} name="email" type="email" placeholder="E-mail" />
        <Input
          icon={FiLock}
          name="password"
          type="password"
          placeholder="Senha"
        />
        <Button type="submit">Entrar</Button>
        <Link to="/">Esqueci minha senha</Link>
      </form>
      <Link to="/">
        <FiLogIn />
        Criar conta
      </Link>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
