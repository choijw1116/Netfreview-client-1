import React, { useEffect, useState } from 'react';
import ReviewBanner from '../components/ReviewBanner';
import ReviewList from '../components/ReviewList';
import SideBar from '../components/SideBar';
import WriteReview from '../components/WriteReview';
import Myreview from '../components/Myreview';
// import Header from '../components/Header';
import '../scss/Review.scss';
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideoThunk } from '../modules/video';
import { RootState } from '../modules';
import { fetchReviewsThunk } from '../modules/review';

function Review() {
  const [isOn, setIsOn] = useState(false);
  const location = useLocation();
  const currentPage = queryString.parse(location.search).page;
  const { videoId } = useParams<{ videoId: string }>();

  const reviews = useSelector((state: RootState) => state.review);
  const {
    reviews: { myReview },
    status,
  } = reviews;

  const dispatch = useDispatch();

  const getVideoInfo = (videoId: string) => {
    dispatch(fetchVideoThunk(videoId));
  };

  const getReviews = (videoId: string, currentPage: string) => {
    const payload = {
      videoId: Number(videoId),
      page: Number(currentPage),
    };
    dispatch(fetchReviewsThunk(payload));
  };

  useEffect(() => {
    getVideoInfo(videoId);
  }, [videoId]);

  useEffect(() => {
    console.log('test');
    if (typeof currentPage === 'string') {
      getReviews(videoId, currentPage);
    }
  }, [currentPage, videoId]);

  return (
    <div>
      <ReviewBanner />
      <div className="area">
        <div className="left">
          <SideBar />
        </div>

        <div className="right">
          {myReview && !isOn ? (
            <Myreview setIsOn={setIsOn} />
          ) : (
            <WriteReview setIsOn={setIsOn} />
          )}
          <ReviewList />
        </div>
      </div>
    </div>
  );
}
export default Review;

// useEffect 2

// axios.get(`reviews/${videoId}/?page=${currentPage}`).then((res) => {
//   const { myReview, totalCount, reviewList } = res.data;
//   const { start, end, totalPage } = getPaging(
//     totalCount,
//     8,
//     Number(currentPage)
//   );
//   const reviews = reviewList.map((review: any) => {
//     const { id, nickname, profileUrl } = review.user;
//     review.user = {
//       id,
//       nickname,
//       profileUrl,
//     };
//     return review;
//   });
//   onFetchReviews(reviews);
//   onFetchMyReviews(myReview);
//   onUpdateCurrentPage(Number(currentPage));
//   onUpdateStartEndPage({ start, end, total: totalPage });
// });
