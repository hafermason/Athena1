import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import Properties from './pages/Properties';
import Opportunities from './pages/Opportunities';
import Settings from './pages/Settings';
import CreditCards from './pages/CreditCards';
import Budget from './pages/Budget';
import Vehicles from './pages/Vehicles';
import Insurance from './pages/Insurance';
import Documents from './pages/Documents';
import Estate from './pages/Estate';
import Contacts from './pages/Contacts';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="budget" element={<Budget />} />
          <Route path="properties" element={<Properties />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="insurance" element={<Insurance />} />
          <Route path="opportunities" element={<Opportunities />} />
          <Route path="credit-cards" element={<CreditCards />} />
          <Route path="documents" element={<Documents />} />
          <Route path="estate" element={<Estate />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
