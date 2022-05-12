import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignInPage({ setAuth }) {
    const [errorMessage, setErrorMessage] = useState("");

    async function signIn(event) {
        event.preventDefault();
        const mail = event.target.mail.value; // mail value from inout field in sign in form
        const password = event.target.password.value; // password value from inout field in sign in form
        const loginObject = { mail: mail, password: password };
        const response = await fetch("http://localhost:3000/auth/?action=login", {
            method: "POST",
            body: JSON.stringify(loginObject)
        });

        const data = await response.json();
        if (data.error) {
            setErrorMessage(data.error);
        }

        if (data.authenticated) {
            console.log(data.user);
            localStorage.setItem("isAuth", true);
            localStorage.setItem("authUser", JSON.stringify(data.user));
            setAuth(true);
        } else {
            localStorage.removeItem("isAuth");
            localStorage.removeItem("authUser");
        }
    }
    return (
      <section className="page">
        <h1 className="text-center">Sign In</h1>
        <form onSubmit={signIn}>
          <input type="email" name="mail" placeholder="Type your mail" />
          <input
            type="password"
            name="password"
            placeholder="Type your password"
          />
          <p className="text-error">{errorMessage}</p>
          <button>Sign in</button>
        </form>
        <p className="text-center">
          Don't have an account? <Link to="/sign-up">Sign Up</Link>
        </p>
      </section>
    );
}
