import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userAction';

function RegisterScreen(props) {
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container ">
          <li>
            <h2>Create Account</h2>
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
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name "
              onChange={(e) => setName(e.target.value)}
            />
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
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword "
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button primary">
              Regiser
            </button>
          </li>
          <li>
            Already have an account?{' '}
            <Link
              to={redirect === '/' ? 'signin' : 'signin?redirect=' + redirect}
              className="button secondary text-center"
            >
              Sign-in
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default RegisterScreen;
