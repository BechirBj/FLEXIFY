// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// interface ProtectedRouteProps {
//   children: React.ReactElement;
//   role: string;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
//   const { isAuthenticated, userRole } = useAuth();
//   return isAuthenticated && role.includes(userRole|| '')? children : <Navigate to="/" />;
// };

// export default ProtectedRoute;
import React from 'react';

const Ef: React.FC = () => {
  return (
    <div>
      <h1 className='text-red-700'>
        Hello
      </h1>
    </div>
  );
}

export default Ef;
