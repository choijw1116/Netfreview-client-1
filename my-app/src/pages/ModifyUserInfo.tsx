import axios from 'axios';
import React, { ChangeEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import profile from '../img/profileImg.png';
import { RootState } from '../modules';
import {
  deleteMyInfoThunk,
  updateMyInfoPayloadType,
  updateMyInfoThunk,
} from '../modules/myInfo';
import '../scss/ModifyUserInfo.scss';

function ModifyUserInfo() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state: RootState) => state.login);
  const {
    myId,
    myName,
    nickname,
    profileUrl,
    introduction,
    status,
  } = useSelector((state: RootState) => state.myInfo);

  const [diffNickname, setDiffNickname] = useState(nickname);
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [description, setDescription] = useState(introduction);
  const [isValidPw, setIsValidPw] = useState(true);
  const [isMatchPw, setIsMatchPw] = useState(true);
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const [previewURL, setPreviewURL] = useState<string | ArrayBuffer | null>(
    profileUrl
  );
  const [isValidNickname, setIsValidNickname] = useState(true);
  const [isModify, setIsModify] = useState(false);

  // const errorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (password !== confirmPw && confirmPw) {
      setIsMatchPw(false);
    } else if (password === confirmPw) {
      setIsMatchPw(true);
    }
    return () => {
      if (password !== confirmPw && confirmPw) {
        setIsMatchPw(false);
      } else if (password === confirmPw) {
        setIsMatchPw(true);
      }
    };
  }, [password, confirmPw]);

  useEffect(() => {
    console.log('status change');

    if (isModify) {
      if (status === 'failed') {
        setIsValidNickname(false);
      } else if (status === 'idle') {
        history.push('/mypage');
      }
    }
  }, [status]);
  useEffect(() => {
    if (diffNickname !== nickname) {
      setIsValidNickname(true);
    }
  }, [diffNickname]);
  // useEffect(() => {
  //   console.log('isModify');
  //   if (status === 'failed') {
  //     console.log('isModify-fail');
  //     setIsValidNickname(false);
  //   } else if (diffNickname === nickname) {
  //     console.log('isModify-idle');
  //     // history.push('/mypage');
  //   }
  // }, [isModify]);

  const handleNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setDiffNickname(e.target.value);
  };

  //???????????? ????????? ??????
  const handlePW = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value === '') {
      setIsValidPw(true);
    } else {
      const regExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()_+|<>?:{}]).*$/;
      if (regExp.test(e.target.value)) {
        setIsValidPw(true);
      } else {
        setIsValidPw(false);
      }
    }
  };
  const isPwMatches = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPw(e.target.value);
  };

  const handleIntroduction = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    const fileList = e.target.files;
    console.log(fileList);

    reader.onloadend = () => {
      console.log('onloaded');

      if (!fileList) {
        console.log('!fileList');
        return;
      }
      setImgFile(fileList[0]);
      setPreviewURL(reader.result);
    };
    if (fileList) {
      console.log(fileList[0]);
      reader.readAsDataURL(fileList[0]);
    }
  };

  const resetImg = () => {
    setPreviewURL(profile);
  };

  const deleteAccount = async () => {
    const isDelete = confirm('????????? ?????????????????????????');
    if (isDelete) {
      const payload = {
        myId,
      };
      try {
        dispatch(deleteMyInfoThunk(payload));
        history.push('/');
      } catch (e) {
        console.log(e.response);
      }
    }
  };

  const checkModified = () => {
    if (
      (diffNickname !== nickname && isValidNickname) ||
      password ||
      description !== introduction ||
      imgFile ||
      previewURL === profile
    ) {
      return true;
    }
    return false;
  };

  const canPasswordSave = [isValidPw, isMatchPw, password].every(Boolean);

  const confirmModified = async () => {
    let profileUrl = '';
    if (imgFile) {
      const formData = new FormData();
      formData.append('image', imgFile);

      const res = await axios.post('/image', formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      profileUrl = res.data.data.profileUrl;
    }
    const payload: updateMyInfoPayloadType = {
      // nickname: diffNickname,
      introduction: description,
    };

    if (diffNickname !== nickname) {
      payload.nickname = diffNickname;
    }
    if (canPasswordSave) {
      payload.password = password;
    }
    if (profileUrl) {
      payload.profileUrl = profileUrl;
    }
    if (previewURL === profile) {
      payload.profileUrl = null;
    }

    console.log(payload);

    dispatch(updateMyInfoThunk(payload));
    setIsModify(true);
  };

  return (
    <section className="modify-user">
      <article className="modify-user-wrap">
        <h2 className="modify-user__title">???????????? ??????</h2>
        <table className="table">
          <tbody>
            <tr className="table__name">
              <th className="table__th">
                <div className="table__th-cell">??????</div>
              </th>
              <td className="table__td">
                <div className="table__td-cell text">{myName}</div>
              </td>
            </tr>
            <tr className="table__name">
              <th className="table__th">
                <div className="table__th-cell">????????? ??????</div>
              </th>
              <td className="table__td">
                <div className="table__td-cell image">
                  <div className="table__td-cell__img-wrap">
                    <img
                      className="table__td-cell__img"
                      src={
                        // src ????????? ?????? ????????? ?????? ?????? ????????????.
                        typeof previewURL === 'string' ? previewURL : profile
                        // typeof previewURL === 'string' ? previewURL : ''
                      }
                      alt="profile image"
                    />
                  </div>
                  <div className="profile__btn-wrap">
                    <label className="profile__btn change">
                      ?????? ??????
                      <input
                        type="file"
                        // accept="image/*"
                        className="profile__btn-input"
                        name="profile_img"
                        onChange={handleImgChange}
                      />
                    </label>
                    <button className="profile__btn delete" onClick={resetImg}>
                      ??????
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="table__nickname">
              <th className="table__th">
                <div className="table__th-cell">?????????</div>
              </th>
              <td className="table__td">
                <div className="table__td-cell">
                  <input
                    className={
                      isValidNickname
                        ? 'table__td-cell__nickname'
                        : 'table__td-cell__nickname error'
                    }
                    type="text"
                    onChange={handleNickname}
                    value={diffNickname}
                  />
                  <div
                    className={
                      isValidNickname
                        ? 'table__td-cell__caution'
                        : 'table__td-cell__caution error'
                    }
                  >
                    {isValidNickname ? null : '???????????? ???????????????.'}
                  </div>
                </div>
              </td>
            </tr>
            <tr className="table__pw">
              <th className="table__th">
                <div className="table__th-cell text">???????????? ??????</div>
              </th>
              <td className="table__td">
                <div className="table__td-cell">
                  <input
                    className={
                      isValidPw
                        ? 'table__td-cell__pw'
                        : 'table__td-cell__pw error'
                    }
                    type="password"
                    placeholder={'??????????????? ??????????????????'}
                    onChange={handlePW}
                  />
                  <div
                    className={
                      isValidPw
                        ? 'table__td-cell__caution'
                        : 'table__td-cell__caution error'
                    }
                  >
                    8-15????????? ??????/??????/??????????????? ?????? ??????????????????.
                  </div>
                  <input
                    className={
                      isMatchPw
                        ? 'table__td-cell__pw-confirm'
                        : 'table__td-cell__pw-confirm error'
                    }
                    type="password"
                    placeholder={'???????????? ??????????????? ?????? ?????? ??????????????????'}
                    onChange={isPwMatches}
                  />
                  <div
                    className={
                      isMatchPw
                        ? 'table__td-cell__caution'
                        : 'table__td-cell__caution error'
                    }
                    // ref={errorRef}
                  >
                    {isMatchPw
                      ? null
                      : '???????????? ??????????????? ???????????? ????????????. ?????? ????????? ?????????.'}
                  </div>
                </div>
              </td>
            </tr>
            <tr className="table__introduction">
              <th className="table__th">
                <div className="table__th-cell">?????? ??????</div>
              </th>
              <td className="table__td">
                <div className="table__td-cell">
                  <textarea
                    name=""
                    id=""
                    cols={30}
                    rows={10}
                    onChange={handleIntroduction}
                    value={description ? description : ''}
                  >
                    {/* {description} */}
                  </textarea>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="delete__account">
          <span className="delete__info">
            ??????????????? ??? ?????? ???????????? ?????????????
          </span>
          <span className="delete__account-btn" onClick={deleteAccount}>
            ???????????? ???????????? {'>>'}
          </span>
        </div>
        <div className="btn-wrap">
          <Link to="/mypage">
            <button className="btn btn-cancel">??????</button>
          </Link>
          {checkModified() ? (
            <button className="btn btn-save" onClick={confirmModified}>
              ??????
            </button>
          ) : (
            <div className="btn-save no-change">??????</div>
          )}
        </div>
      </article>
    </section>
  );
}
export default ModifyUserInfo;
