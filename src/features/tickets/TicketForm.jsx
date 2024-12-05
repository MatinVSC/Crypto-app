import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import styled from 'styled-components';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useSendTicket } from './useSendTicket';
import SpinnerMini from '../../ui/SpinnerMini';
import FormRowVertical from '../../ui/FormRowVertical';

const FormContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px 30px;
`;

const SectionTitle = styled.h3`
  color: var(--color-brand-600);
  font-size: 1.8rem;
  margin-bottom: 20px;
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
`;


const SelectBox = styled.select` width: 100%;
    padding: 12px;
    border: 1px solid #555;
    border-radius: 8px;
    font-size: 1.2rem;

    &:focus { outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
 } `;

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
`;

export default function TicketForm() {
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
        <Heading>Ticket Detail</Heading>
        <Button variation="secondary" onClick={moveBack}>Back</Button>
      </Row>

      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionTitle>Create a New Ticket</SectionTitle>

          <FormRowVertical label="subject" error={errors?.subject?.message}>
            <Input
              type="text"
              disabled={isSending}
              {...register('subject', { required: 'This field is required' })}
            />
          </FormRowVertical>

          <FormRowVertical label="Topic" error={errors?.topic?.message}>
            <SelectBox {...register('topic', { required: 'This field is required' })}
              disabled={isSending}
            >
              <option value="">Select a Department</option>
              <option value="Technical Department">Technical Department</option>
              <option value="Finance Department">Finance Department</option>
              <option value="Management Department">Management Department</option>
            </SelectBox>
          </FormRowVertical>

          <FormRowVertical label="Description" error={errors?.description?.message}>
            <TextArea
              rows="4"
              disabled={isSending}
              {...register('description', {
                required: 'This field is required',
                minLength: {
                  value: 30,
                  message: 'Descriptions must contain at least 30 characters !'
                }
              })}
            />
          </FormRowVertical>

          <FormRowVertical>
            <Button variation="primary">{isSending ? <SpinnerMini /> : "Send Ticket"}</Button>
          </FormRowVertical>
        </form>
      </FormContainer>
    </>
  )
};