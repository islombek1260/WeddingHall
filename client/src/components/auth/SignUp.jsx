import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import "./style.css"
import Error404 from "../utils/Error404";
import Loading from "../utils/Loading";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const SIGN_UP_MUTATION = gql`
    mutation SignUp($username: String!, $password: String!) {
      signUp(username: $username, password: $password) {
        success
        data
        access_token
      }
    }
  `;

  const [signUp, { loading, error }] = useMutation(SIGN_UP_MUTATION, {
    update: (_, data) => {
      if(data?.data) {
          window.location.href = '/'
      }
  }
  });

  if (error) return <><Error404 /></>
  if (loading) return <><Loading /></>

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signUp({ variables: { username, password } });
      console.log(data); // Обработка успешного результата
    } catch (error) {
      console.error(error); // Обработка ошибки
    }
  };

  return (
    <>
    <h2>Sign Up</h2>
    <form className="signin-form" onSubmit={handleSignUp}>
      <input
        className="signin-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="signin-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="signin-button" type="submit" disabled={loading && <Loading />}>
        Sign Up
      </button>
      <a className="signup-link" href="/">Sign In</a>
      {error && <Error404 />}
    </form>
    
    </>
  );
};

export default SignUpForm;