import styled from "styled-components";
import { useUserData } from "../dashboard/useUserData";
import SpinnerMini from "../../ui/SpinnerMini";


const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;


export default function UserAvatar() {
    const { userData, isLoading } = useUserData();

    if (isLoading) return <SpinnerMini />    

    const { email, avatar } = userData;

    return (
        <StyledUserAvatar>
            <Avatar
                src={avatar || '../../public/img/default-user.jpg'}
                alt={`avatar of ${email}`}
            />
            <span>{email}</span>
        </StyledUserAvatar>
    )
}