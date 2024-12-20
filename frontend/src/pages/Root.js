import { Outlet, useLoaderData, useSubmit } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

function RootLayout() {
  // No need to use useRouteLoaderData here because you already in the root file
  const token = useLoaderData();
  // useSubmit programmatically submits a form
  // we are trying to submit the logout form after the token expires in 1 hour
  // token is set to expire in 1 hour, in the backend
  const submit = useSubmit();
  // const navigation = useNavigation();
  useEffect(() => {
    if (!token) {
      return () => {};
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return () => {};
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);
    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
      // seTimeout expects time in milliseconds, so we are setting time for 1 hour
      //1 * 60 * 60 * 1000
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
