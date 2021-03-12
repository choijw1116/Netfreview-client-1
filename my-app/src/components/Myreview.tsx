import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { addLikeThunk, deleteReviewThunk } from '../modules/review';

import plant from '../img/plant.png';
import heart from '../img/heart.png';
import profile from '../img/profileImg.svg';
import '../scss/Myreview.scss';

type MyReviewProps = {
  setIsOn: (isOn: boolean) => void;
};

function Myreview({ setIsOn }: MyReviewProps) {
  const reviews = useSelector((state: RootState) => state.review);
  const {
    reviews: { myReview },
  } = reviews;
  const { nickname, profileUrl } = useSelector(
    (state: RootState) => state.userInfo
  );

  const dispatch = useDispatch();

  const deleteReview = (reviewId: number) => {
    const payload = {
      reviewId,
    };
    dispatch(deleteReviewThunk(payload));
  };

  const addLike = (reviewId: number) => {
    const payload = {
      reviewId,
    };
    dispatch(addLikeThunk(payload));
  };

  if (myReview) {
    const { id, rating, text, likeCount } = myReview;
    return (
      <div className="MyreviewList__wholeInfo">
        <div className="MyreviewList-wrap">
          <div className="MyreviewList-top">
            <div className="MywholeInfo__profile">
              <img
                src={profileUrl || profile}
                alt="프로필"
                className="Myprofile__img"
              />
              <span className="Myprofile__nickname">{nickname}</span>
            </div>

            <div className="MywholeInfo__count">
              <div className="Mycount__rate">
                <img className="Myimg-rate" src={plant} />
                <span className="Myrate-num">{rating}</span>
              </div>
              <button
                onClick={() => {
                  addLike(id);
                }}
                type="button"
                className="Mycount__heart"
              >
                <img className="Myimg-heart" src={heart} />
                <span className="Myrate-num">{likeCount}</span>
              </button>
            </div>
          </div>
          <div className="MywholeInfo__div">{text}</div>
          <div className="MywholeInfo__btn">
            <button
              onClick={() => setIsOn(true)}
              className="Mybtn__review"
              type="button"
            >
              수정
            </button>
            <button
              onClick={() => {
                deleteReview(id);
              }}
              type="button"
              className="Mybtn__review"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="nomyreview">
      <h1>나의 리뷰가 존재하지 않습니다.</h1>
    </div>
  );
}

export default Myreview;
