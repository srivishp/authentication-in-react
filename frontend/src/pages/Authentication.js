import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

// /auth route

export async function action({ request }) {
  //* Identifying if we want to sign up or login
  // We cannot use useSearchParams here as it is not a component.
  // Hence we use the URL method provided by the browser
  // and identify the searchParams which exist at the end of the URL

  const searchParams = new URL(request.url).searchParams;

  const mode = searchParams.get("mode") || "login";
  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  // sending request to the backend
  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }
  // managing token

  const resData = await response.json();
  const token = resData.token;

  // We have set timer to logout in Root.js, but if the user refreshes browser
  // before 1 hour passes, the useEffect executes and timer is reset.
  // But the token expires at the usual rate, so to prevent that we are doing...
  // ...whatever this is :|
  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  // Redirecting user to the starting page
  return redirect("/");
}
