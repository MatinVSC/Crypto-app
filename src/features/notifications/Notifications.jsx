import styled from "styled-components";
import SpinnerMini from "../../ui/SpinnerMini";
import { useNotifications } from "./useNotifications";

const RootContainer = styled.div`
  background-color: var(--color-grey-0);
  border-radius: 8px;
  border: 1px solid rgb(79, 70, 229);
  padding: 1.6rem;
  max-height: 500px;
  width: 100%;
  overflow-y: auto;

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    padding: 1rem;
    max-height: 400px;
    max-width: 100%;
  }
`;

const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NotificationItem = styled.div`
  background-color: var(--color-grey-50);
  border-radius: 6px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

const NotificationTitle = styled.h4`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-800);
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NotificationContent = styled.p`
  font-size: 1.2rem;
  color: var(--color-grey-600);
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const NotificationTimestamp = styled.span`
  font-size: 1rem;
  color: var(--color-grey-500);
  align-self: flex-end;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: var(--color-grey-600);
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export default function Notifications() {
    const { userNotifications, isLoading } = useNotifications();

    if (isLoading) return <SpinnerMini />;

    console.log(userNotifications);

    if (!userNotifications.length) {
        return (
            <RootContainer>
                <EmptyState>No notifications available</EmptyState>
            </RootContainer>
        );
    }

    return (
        <RootContainer>
            <NotificationContainer>
                {userNotifications.slice(0, 10).map((notification) => (
                    <NotificationItem key={notification.id}>
                        <NotificationTitle>{notification.title}</NotificationTitle>
                        <NotificationContent>{notification.content}</NotificationContent>
                        <NotificationTimestamp>
                            {new Date(notification.timestamp / 1e6).toLocaleString()}
                        </NotificationTimestamp>
                    </NotificationItem>
                ))}
            </NotificationContainer>
        </RootContainer>
    );
}
