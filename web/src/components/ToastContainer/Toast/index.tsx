import React, { useEffect } from 'react';
import { FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: Record<string, unknown>;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiXCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    // qual o motivo dessa função no return?
    // precisamos ter uma forma de se caso esse componente deixe de existir antes dos 3 segundos(ex: usuário fechou o toast) essa função removeToast não seja executada

    // como esse return funciona?
    // se retornarmos uma função dentro de um useEffect, essa função vai ser automaticamente executada se o componente deixar de existir, no nosso caso
    // vamos dar um clear no timeout e a função removeToast não será executada

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container
      type={message.type}
      hasDescription={!!message.description}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
