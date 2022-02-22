import React, { useEffect, useState } from "react";
import { authenticationService } from "../../_services/authentication.service";
import GoToLoginPage from "../login/GoToLoginPage";

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [userIsFetched, setUserIsFetched] = useState({
    state: false,
    data: {},
  });

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
        <GoToLoginPage />
      </div>
    )
  ) : (
    <h1>Checkin premission...</h1>
  );
};

export default PrivateRoute;
