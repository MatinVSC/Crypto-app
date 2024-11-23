import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Register from './pages/Register';
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Coins from "./pages/Coins";
import Plans from "./pages/Plans";
import Transactions from "./pages/Transactions";
import GetTickets from './pages/GetTickets';
import ProtectedRoute from "./ui/ProtectedRoute";
import CoinDeposit from "./pages/CoinDeposit";
import CoinWithdraw from './pages/CoinWithdraw'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    }
  }
});

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            <Route element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>

              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="coins" element={<Coins />} />
              <Route path="coins/deposit/:coinId" element={<CoinDeposit />} />
              <Route path="coins/withdraw/:coinId" element={<CoinWithdraw />} />
              <Route path="plans" element={<Plans />} />
              <Route path="gett" element={<Transactions />} />
              <Route path="getTickets" element={<GetTickets />} />
              <Route path="account" element={<Account />} />
            </Route>

            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxHeight: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)'
          }
        }}
      />

    </QueryClientProvider>
  );
}

export default App;
