import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiLock, FiUnlock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { isUuid } from 'uuidv4';
import { useQueryParam, StringParam } from 'use-query-params';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background, AnimationContainer } from './styles';
import api from '../../services/api';

interface ResetPasswordFormData {
  token: string;
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [token] = useQueryParam('token', StringParam);

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          token: Yup.mixed()
            .test('token-uuid', 'Token inválido', value => isUuid(value))
            .required('Token obrigatório'),
          password: Yup.string().min(6, 'Mínimo de 6 caracteres'),
          password_confirmation: Yup.string().oneOf([
            Yup.ref('Senhas não conferem'),
            null,
          ]),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/passord/reset', {
          token: data.token,
          passord: data.password,
        });

        addToast({
          type: 'success',
          title: 'Email de recuperação de senha',
          description:
            'Te enviamos um email com um link para recuperar sua senha',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          title: 'Erro ao Resetar a Senha',
          description: 'Ocorreu um erro ao tentar resetar a sua senha.',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit} initialData={{ token }}>
            <h1>Resetar senha</h1>
            <Input icon={FiUnlock} name="token" placeholder="Token" />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Nova Senha"
            />

            <Input
              icon={FiLock}
              name="password_confirmation"
              type="password"
              placeholder="Confirmação da Nova Senha"
            />
            <Button loading={loading} type="submit">
              Alterar Senha
            </Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
