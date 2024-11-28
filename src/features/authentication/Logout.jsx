import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import SpinnerMini from '../../ui/SpinnerMini';
import { useLogout } from './useLogout';

export default function Logout() {
    const { logout, isLoading } = useLogout();

    return (
        <ButtonIcon
            onClick={logout}
            disabled={isLoading}
        >
            {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
        </ButtonIcon>
    )
}