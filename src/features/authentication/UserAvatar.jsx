import { useUserData } from "../dashboard/useUserData";
import styled from "styled-components";
import SpinnerMini from "../../ui/SpinnerMini";
import defaultUserImg from '../../../public/img/default-user.jpg';


const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.8rem;
    font-size: 1.5rem;
  }
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  height: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);

  @media (max-width: 768px) {
    width: 3.2rem;
    height: 3.2rem;
  }
`;

export default function UserAvatar() {
  const { userData, isLoading } = useUserData();

  if (isLoading) return <SpinnerMini />;

  const { email, avatar } = userData;
  const username = email.split('@')[0];

  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || defaultUserImg}
        alt={`avatar of ${email}`}
      />
      <span>{username}</span>
    </StyledUserAvatar>
  );
}
