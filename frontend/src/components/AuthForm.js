//* Query Parameters
// Query parameters are a defined set of parameters (key-value pair) attached to the end of a URL.
// They're used to provide additional information to a web server when making requests.
// They are an important part of the URL that define specific content or actions based on the data being passed.

import { Form, Link, useSearchParams } from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  // useSearchParams is basically Query Parameters
  const [searchParams] = useSearchParams();
  // get() allows us to retrieve the value for a specific query parameter
  //#  "mode" is the query parameter here
  const isLogin = searchParams.get("mode") === "login";

  return (
    <Form method="post" className={classes.form}>
      <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
      <p>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
      </p>
      <p>
        <label htmlFor="image">Password</label>
        <input id="password" type="password" name="password" required />
      </p>
      <div className={classes.actions}>
        {/* Using template literal to conditionally set URL */}
        <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
          {isLogin ? "Create new user" : "Login"}
        </Link>
        <button>Save</button>
      </div>
    </Form>
  );
}

export default AuthForm;
