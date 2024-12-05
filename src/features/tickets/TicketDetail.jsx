import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTicketId } from "./useTicketId";
import Spinner from "../../ui/Spinner";
import { useQuery } from "react-query";
import styled, { keyframes } from "styled-components";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useForm } from "react-hook-form";
import { useReplayTicket } from "./useReplayTicket";
import { format } from "date-fns";
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
`;

const TicketHeader = styled.div`
  background: #1976d2;
  color: #fff;
  padding: 15px;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
`;

const DetailItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const DetailLabel = styled.span`
  font-weight: bold;
  color: #2c3e50;
  margin-right: 1rem;
`;

const Detail = styled.p`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
  color: #34495e;
  line-height: 1.6;
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

  & small {
    display: block;
    margin-top: 5px;
    color: #757575;
    font-size: 0.8rem;
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
`;

const TicketReplay = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const TicketDetail = () => {
  const { ticketId } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const { userTicketId, isLoading } = useTicketId();
  const { replayTicket, isLoading: isReplay } = useReplayTicket();
  const moveBack = useMoveBack();

  useEffect(() => {
    userTicketId({ ticketId });
  }, [ticketId]);

  const { data } = useQuery(["userTicketId"], {
    enabled: false,
  });

  if (isLoading) return <Spinner />;

  function onSubmit({ content }) {
    if (!content) return;
    replayTicket({ ticketId, content }, {
      onSuccess: () => reset()
    });
  };

  return (
    <>
      <Row type="horizontal">
        <Heading>Ticket Detail</Heading>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </Row>

      <TicketContainer>
        <TicketHeader>
          <h2>{data?.subject || "Unknown Subject"}</h2>
          <span>Status : {data?.open ? "is Open" : "is Closed"}</span>
        </TicketHeader>

        <TicketDetails>
          <DetailItem>
            <DetailLabel>Topic : </DetailLabel>
            <Detail>{data?.topic || "N/A"}</Detail>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Timestamp : </DetailLabel>
            <Detail>
              {data?.timestamp
                ? format(new Date(data?.timestamp / 1000000), "yyyy-MM-dd HH:mm")
                : "Invalid Date"}
            </Detail>
          </DetailItem>
          <DetailItem>
            <DetailLabel>User ID : </DetailLabel>
            <Detail>{data?.user || "Unknown"}</Detail>
          </DetailItem>
        </TicketDetails>

        {data?.messages.map((msg, index) => (
          <MessageContainer key={index} role={msg.role}>
            <p>
              <strong>
                {msg.role === "admin" ? "Support" : "You"}:
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
                placeholder="Replay"
                {...register("content", {
                  required: "This field is required",
                  minLength: {
                    value: 5,
                    message: 'Descriptions must contain at least 5 characters !'
                  }
                })}
              />
              <Button>{isReplay ? <SpinnerMini /> : "Send"}</Button>
            </form>
          </Row>
        </TicketReplay>
      </TicketContainer>
    </>
  );
};

export default TicketDetail;
