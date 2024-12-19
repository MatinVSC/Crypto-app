import styled, { keyframes } from "styled-components";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTicketId } from "./useTicketId";
import { useQuery } from "react-query";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useForm } from "react-hook-form";
import { useReplayTicket } from "./useReplayTicket";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TicketContainer = styled.div`
  background: #f0f4f8;
  padding: 25px;
  border-radius: 10px;
  min-width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const TicketHeader = styled.div`
  background: #1976d2;
  color: #fff;
  padding: 15px;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 1.4rem;
  }
`;

const TicketDetails = styled.div`
  margin: 20px 0;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    margin: 15px 0;
    padding: 15px;
  }
`;

const DetailItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }
`;

const DetailLabel = styled.span`
  font-weight: bold;
  color: #2c3e50;
  margin-right: 1rem;

  @media (max-width: 768px) {
    margin-right: 0.5rem;
  }
`;

const Detail = styled.p`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
  color: #34495e;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: ${(props) => (props.role === "admin" ? "flex-start" : "flex-end")};
  margin: 10px ${(props) => (props.role === "admin" ? "auto" : "0")} 10px ${(props) => (props.role === "admin" ? "0" : "auto")};
  padding: 10px 15px;
  max-width: 60%;
  background: ${(props) => (props.role === "admin" ? "#e3f2fd" : "#f1f8e9")};
  border-radius: ${(props) =>
    props.role === "admin" ? "10px 10px 10px 0" : "10px 10px 0 10px"};
  border: ${(props) =>
    props.role === "admin" ? "1px solid #1976d2" : "1px solid #388e3c"};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.3s ease-out;
  word-wrap: break-word;
  word-break: break-word;

  & small {
    display: block;
    margin-top: 5px;
    color: #757575;
    font-size: 0.8rem;

    @media (max-width: 768px) {
      font-size: 0.7rem;
    }
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
    font-size: 1rem;
    padding: 10px;
  }
`;

const TicketReplay = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

const TicketDetail = () => {
  const { t } = useTranslation();
  const { ticketId } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const { userTicketId, isLoading } = useTicketId();
  const { replayTicket, isLoading: isReplay } = useReplayTicket();
  const moveBack = useMoveBack();

  useEffect(() => {
    userTicketId({ ticketId });
  }, [ticketId, userTicketId]);

  const { data } = useQuery(["userTicketId"], {
    enabled: false,
  });

  const ticketStatus = data?.open ? t('tickets.open', 'is open') : t('tickets.close', 'is close');

  if (isLoading) return <Spinner />;

  function onSubmit({ content }) {
    if (!content) return;
    replayTicket({ ticketId, content }, {
      onSuccess: () => reset()
    });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading>{t('tickets.detail', 'View Details')}</Heading>
        <Button variation="secondary" onClick={moveBack}>
          {t('back', 'Back')}
        </Button>
      </Row>

      <TicketContainer>
        <TicketHeader>
          <h2>{data?.subject || "Unknown Subject"}</h2>
          <span>{t('tickets.status', 'Status :')} {ticketStatus}</span>
        </TicketHeader>

        <TicketDetails>
          <DetailItem>
            <DetailLabel>{t('tickets.topic', 'Topic :')}</DetailLabel>
            <Detail>{data?.topic || "N/A"}</Detail>
          </DetailItem>
          <DetailItem>
            <DetailLabel>{t('date', 'Date')}</DetailLabel>
            <Detail>
              {data?.timestamp
                ? format(new Date(data?.timestamp / 1000000), "yyyy-MM-dd HH:mm")
                : "Invalid Date"}
            </Detail>
          </DetailItem>
          <DetailItem>
            <DetailLabel>{t('tickets.userId', 'User ID : ')}</DetailLabel>
            <Detail>{data?.user || "Unknown"}</Detail>
          </DetailItem>
        </TicketDetails>

        {data?.messages.map((msg, index) => (
          <MessageContainer key={index} role={msg.role}>
            <p>
              <strong>
                {msg.role === "admin" ? t('tickets.support', 'Support') : t('tickets.you', 'You')}:
              </strong>{" "}
              {msg.content}
            </p>
            <small>{format(new Date(data?.timestamp / 1000000), "yyyy-MM-dd HH:mm")}</small>
          </MessageContainer>
        ))}

        <TicketReplay>
          <Row>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextArea
                rows="2"
                disabled={isReplay}
                placeholder={t('tickets.replay', 'Replay')}
                {...register("content", {
                  required: t('errors.require', 'This field is required'),
                  minLength: {
                    value: 5,
                    message: t('errors.description', 'Descriptions must contain at least 5 characters.')
                  }
                })}
              />
              <Button>{isReplay ? <SpinnerMini /> : t('tickets.send', 'Send')}</Button>
            </form>
          </Row>
        </TicketReplay>
      </TicketContainer>
    </>
  );
};

export default TicketDetail;
