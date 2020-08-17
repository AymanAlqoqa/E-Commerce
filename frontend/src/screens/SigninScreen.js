import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userAction';

function SigninScreen(props) {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container ">
          <li>
            <h2>Sign-In</h2>
          </li>
          <li>
            {loading ? <div className="text-center">loading ...</div> : ''}

            {error ? (
              <div className="text-danger text-center">{error}</div>
            ) : (
              ''
            )}
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email "
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password "
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button primary">
              Signin
            </button>
          </li>
          <li>New to E-commerce?</li>
          <li>
            <Link
              to={
                redirect === '/' ? 'register' : 'register?redirect=' + redirect
              }
              className="button secondary text-center"
            >
              Create your E-commerce Account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default SigninScreen;
