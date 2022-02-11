import React, { useEffect, useState } from "react";
import { authenticationService } from "../../_services/authentication.service";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [userIsFetched, setUserIsFetched] = useState({
    state: false,
    data: {},
  });
  const navigate = useNavigate();

  useEffect(() => {
    authenticationService.authenticateRequest().then((data) => {
      setUserIsFetched({ state: true, data: data });
      data ? setAuth(true) : setAuth(false);
    });
  }, []);

  return userIsFetched.state ? (
    auth ? (
      React.cloneElement(children, { user: userIsFetched.data })
    ) : (
      <div>
        <h1>You have to log in</h1>
        {/*<Navigate to="/login" />*/}
      </div>
    )
  ) : (
    <h1>Checkin premission...</h1>
  );
};

export default PrivateRoute;
