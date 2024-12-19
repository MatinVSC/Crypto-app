import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from './Header';
import styled from "styled-components";

const StyledAppLayout = styled.div`
    display: grid;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-rows: 0;
        height: 100vh;
  }
`;

const Main = styled.main`
  background-color  : var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem 1rem;
  overflow: scroll;
`;

const Container = styled.div`
    max-width: 120rem;
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`;

function AppLayout() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <StyledAppLayout>
            <Sidebar openSidebar={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <Header toggleSidebar={toggleSidebar} />
            <Main>
                <Container>
                    <Outlet />
                </Container>
            </Main>
        </StyledAppLayout>
    );
}

export default AppLayout;
