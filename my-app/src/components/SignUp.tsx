import axios from 'axios';
import React, { useState, useRef /*FormEvent*/, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import _ from 'lodash/fp';
import SignIn from './SignIn';

import img from '../img/logo.svg';
import facebook from '../img/facebook.png';
import google from '../img/btn_google_signin_light_normal_web@2x.png';
import kakao from '../img/kakao-talk.png';
import '../scss/SignUp.scss';
import { useHistory } from 'react-router';

/********* type ********/
interface FormInput {
  name: string;
  email: string;
  nickname: string;
  password: string;
}

type isModalprops = {
  closeModal: () => void;
};

/************ Function *************/

function SignUp({ closeModal }: isModalprops) {
  const history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm<FormInput>();
  // const [isLogin, setIsLogin] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [warning, setWarning] = useState('');
  const [isSignInOpen, setIsSignInOpen] = useState<boolean>(false);
  const [isSignUpClose, setIsSignUpClose] = useState<boolean>(false);
  // const [rePassword, setRePassword] = useState<string>('');
  const number = 12;
  // console.log(watch('password-confirm'));

  const Password = useRef();
  Password.current = watch('Password');

  const onChangeName = (e: any) => {
    setName(e.target.value);
  };
  const onChangeNickname = (e: any) => {
    setNickname(e.target.value);
  };
  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  // const emailRef: any = useRef();
  // const nameRef: any = useRef();
  // const passwordRef: any = useRef();
  // const rePasswordRef: any = useRef();
  // const errorRef: any = useRef();

  const onSubmit = async () => {
    //console.log('hey');

    if (!name || !nickname || !email || !password) {
      return alert('????????? ?????? ??????????????????');
    } else {
      // try {
      //   await dispatch(loginThunk({ email, password }));
      // } catch (error) {
      //   console.log(error.response.data);
      //   if (error.response.data.message === `?????? ???????????? ??????????????????.`) {
      //     <div>?????? ???????????? ??????????????????</div>;
      //     // alert(`?????? ???????????? ??????????????????.`);
      //   }
      //   if (error.response.data.message === `?????? ???????????? ??????????????????.`) {
      //     alert(`?????? ???????????? ??????????????????`);
      //   } else if (error.response.data.status !== 422) {
      //     alert(`????????? ??????????????????!`);
      //   }
      // }
      axios
        .post('/users/signup', {
          name,
          nickname,
          email,
          password,
        })
        .then((res) => {
          //console.log(res);
          // alert(res.data);
          alert('???????????????~! ???????????????????????????!! :)');
          setIsSignInOpen(true);
          setIsSignUpClose(true);
        })
        .catch((error) => {
          //console.log(error.response.data);
          if (error.response.data.message === '?????? ???????????? ??????????????????.') {
            // <div>?????? ???????????? ??????????????????</div>;
            // alert(`?????? ???????????? ??????????????????.`);
            setWarning('?????? ???????????? ??????????????????');
            return;
          }
          if (error.response.data.message === `?????? ???????????? ??????????????????.`) {
            setWarning(`?????? ???????????? ??????????????????`);
            return;
          }
          // else if (error.response.data.status !== 422) {
          //   setWarning(`??????????????? ??????????????? ???????????????!`);
          //   return;
          // }
        });
    }
  };

  const openSignIn = () => {
    setIsSignInOpen(true);
    setIsSignUpClose(true);
  };

  // const closeSignIn = () => {
  //   setIsSignInOpen(false);
  // };
  useEffect(() => {
    if (!isSignUpClose) {
      // ????????? ??????
      document.body.style.overflow = 'hidden';
    }
    return () => {
      // ????????? ?????? ??????
      document.body.style.overflow = 'scroll';
      // document.body.style.overflow = 'unset';
    };
  });

  return (
    <div>
      {isSignUpClose ? null : (
        <div className="signinModal">
          <div onClick={closeModal} className="modal-back"></div>
          <section className="signup">
            <img className="img" src={img} />
            <div className="signup__wrap">
              <h3 className="signup-title">????????????</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
                <input
                  name="Name"
                  maxLength={number}
                  ref={register({
                    required: true,
                    minLength: 2,
                    pattern: /^[???-???a-zA-Z]+$/,
                  })}
                  className="signup-input"
                  type="text"
                  onChange={onChangeName}
                  placeholder="Name"
                />
                {_.get('Name.type', errors) === 'required' && (
                  <p className="input">??????????????????!</p>
                )}
                {_.get('Name.type', errors) === 'maxLength' && (
                  <p className="input">13??? ???????????? ???????????????!</p>
                )}
                {_.get('Name.type', errors) === 'minLength' && (
                  <p className="input">2?????? ?????? ???????????????!</p>
                )}
                {_.get('Name.type', errors) === 'pattern' && (
                  <p className="input">????????? ???????????????!</p>
                )}
                <input
                  onChange={onChangeNickname}
                  name="Nickname"
                  ref={register({
                    required: true,
                    maxLength: 15,
                    minLength: 2,
                    // pattern: /^[???-???a-zA-Z]+$/,
                  })}
                  className="signup-input"
                  type="text"
                  placeholder="Nickname"
                />
                {_.get('Nickname.type', errors) === 'required' && (
                  <p className="input">??????????????????!</p>
                )}
                {_.get('Nickname.type', errors) === 'maxLength' && (
                  <p className="input">16??? ???????????? ???????????????!</p>
                )}
                {_.get('Nickname.type', errors) === 'minLength' && (
                  <p className="input">2?????? ?????? ???????????????!</p>
                )}
                {/* {_.get('Nickname.type', errors) === 'pattern' && (
                  <p className="input">??????????????? ??????,???????????? ?????????!</p>
                )} */}
                <input
                  onChange={onChangeEmail}
                  name="email"
                  ref={register({
                    required: true,
                    pattern: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  })}
                  className="signup-input"
                  type="text"
                  placeholder="Email"
                />
                {_.get('email.type', errors) === 'required' && (
                  <p className="input">??????????????????!</p>
                )}
                {_.get('email.type', errors) === 'pattern' && (
                  <p className="input">?????????????????? ???????????????!</p>
                )}

                <input
                  onChange={onChangePassword}
                  name="Password"
                  ref={register({
                    required: true,
                    pattern: /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
                    // pattern: /([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/,
                  })}
                  className="signup-input"
                  type="password"
                  placeholder="Password"
                />
                {_.get('Password.type', errors) === 'required' && (
                  <p className="input">??????????????????!</p>
                )}
                {_.get('Password.type', errors) === 'pattern' && (
                  <p className="input">
                    ??????,??????,????????????(!@$%^&* ??? ??????)??? ???????????? 8~15?????????
                    ???????????????!(????????? ??????????????? ???????????????)
                  </p>
                )}

                <input
                  // onChange={onChangePassword}
                  name="password-confirm"
                  ref={register({
                    required: true,
                    validate: (value) => value === Password.current,
                  })}
                  className="signup-input"
                  type="password"
                  placeholder="Password"
                />
                {_.get('password-confirm.type', errors) === 'required' && (
                  <p className="input">??????????????????!</p>
                )}
                {_.get('password-confirm.type', errors) === 'validate' && (
                  <p className="input">??????????????? ?????? ????????????!</p>
                )}

                {/* <div className="signup-btn"> */}
                {/* <button
                    type="submit"
                    id="completebtn"
                    className="signupcompleteButton"
                  > */}
                <div className="alert__sign-up">{warning}</div>
                <div className="login-btn">
                  <button
                    type="submit"
                    id="completebtn"
                    className="signupcompleteButton"
                  >
                    ????????????
                  </button>

                  <button
                    onClick={openSignIn}
                    type="button"
                    id="Btn"
                    className="signupMoveButton"
                  >
                    ??????????????? ??????
                  </button>
                </div>
              </form>

              <ul className="signup-social">
                <li className="signup-social__wrap">
                  <ul className="signupsocial__wrap">
                    <a
                      href="https://www.gettoday4.click/users/google"
                      className="google"
                    >
                      <div className="googlelogo">{/* {google} */}</div>
                    </a>
                  </ul>
                </li>
              </ul>
            </div>
          </section>
        </div>
      )}
      {isSignInOpen ? <SignIn closeModal={closeModal} /> : null}
    </div>
  );
}

export default SignUp;
