import { useForm } from 'react-hook-form';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useSendTicket } from './useSendTicket';
import { useTranslation } from 'react-i18next';
import Button from '../../ui/Button';
import styled from 'styled-components';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import SpinnerMini from '../../ui/SpinnerMini';
import FormRowVertical from '../../ui/FormRowVertical';

const FormContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px 30px;

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const SectionTitle = styled.h3`
  color: var(--color-brand-600);
  font-size: 1.8rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 15px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #555;
  border-radius: 8px;
  font-size: 1.2rem;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 10px;
  }
`;

const SelectBox = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #555;
  border-radius: 8px;
  font-size: 1.2rem;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 10px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #555;
  border-radius: 8px;
  font-size: 1.2rem;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 10px;
  }
`;

export default function TicketForm() {
  const { t } = useTranslation();
  const { sendTicket, isLoading: isSending } = useSendTicket();
  const moveBack = useMoveBack();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = ({ subject, topic, description }) => {
    if (!subject || !topic || !description) return;
    sendTicket({ subject, topic, description });
  };

  return (
    <>
      <Row type="horizontal">
        <Heading>{t('tickets.new', 'New Ticket')}</Heading>
        <Button variation="secondary" onClick={moveBack}>{t('back', 'Back')}</Button>
      </Row>

      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionTitle>{t('tickets.create', 'Create a new ticket')}</SectionTitle>

          <FormRowVertical label={t('tickets.subject', 'Subject')}
            error={errors?.subject?.message}>
            <Input
              type="text"
              disabled={isSending}
              {...register('subject', {
                required: t('errors.require', 'This field is required')
              })}
            />
          </FormRowVertical>

          <FormRowVertical label={t('tickets.topic', 'Topic')}
            error={errors?.topic?.message}>
            <SelectBox {...register('topic',
              { required: t('errors.require', 'This field is required') }
            )}
              disabled={isSending}
            >
              <option value="">{t('tickets.select', 'Select a Department')}</option>
              <option value="Technical Department">{t('tickets.technical', 'Technical Department')}</option>
              <option value="Finance Department">{t('tickets.finance', 'Finance Department')}</option>
              <option value="Management Department">{t('tickets.management', 'Management Department')}</option>
            </SelectBox>
          </FormRowVertical>

          <FormRowVertical label={t('tickets.descriptions', 'Descriptions')}
            error={errors?.description?.message}>
            <TextArea
              rows="4"
              disabled={isSending}
              {...register('description', {
                required: t('errors.require', 'This field is required'),
                minLength: {
                  value: 30,
                  message: t('errors.description30', 'Descriptions must contain at least 30 characters!')
                }
              })}
            />
          </FormRowVertical>

          <FormRowVertical>
            <Button variation="primary">{isSending ? <SpinnerMini /> : t('tickets.sendTicket', 'Send Ticket')}</Button>
          </FormRowVertical>
        </form>
      </FormContainer>
    </>
  )
};
