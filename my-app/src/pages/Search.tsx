import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchVideoListThunk,
  resetVideoList,
  VideoInfo,
} from '../modules/videoList';
import { RootState } from '../modules';
import queryString from 'query-string';
import SmallPoster from '../components/SmallPoster';
import nosearch from '../img/nosearch.png';
import '../scss/Search.scss';

function Search() {
  const location = useLocation();
  const query = queryString.parse(location.search).q;
  const dispatch = useDispatch();

  const {
    videoInfoList: { videoList },
    // status,
  } = useSelector((state: RootState) => state.videoList);

  useEffect(() => {
    if (typeof query === 'string') {
      const payload = { query };
      dispatch(fetchVideoListThunk(payload));
    }
    return () => {
      dispatch(resetVideoList());
    };
  }, [query, dispatch]);
  return (
    <div className="whole">
      {/* {isSearch ? (  */}
      <section className="mysearchlist">
        <div className="searchlist-line">
          {/* <SmallPoster id, title, posterUrl, rating/> */}
        </div>
        <div className="searchlist-wrapper">
          {!videoList || videoList.length === 0 ? (
            <section className="mysearchlist no-search">
              <div className="nosearch__info no-search">
                <div className="info-wrapper no-search">
                  <img
                    className="info-wrapper__img no-search"
                    src={nosearch}
                    alt="검색결과"
                  />
                  {/* 검색어가 사라지게 구현을 해서 잠시 수정 해두었습니다. */}
                  <h3 className="info-wrapper__title no-search">
                    {query}에 대한 검색결과가 없습니다.
                  </h3>
                  <span className="info-wrapper__text no-search">
                    단어철자가 정확한지 확인하거나 다른 키워드로 검색해보세요!
                  </span>
                </div>
              </div>
            </section>
          ) : (
            videoList.map((video: VideoInfo) => {
              const { id, title, posterUrl, rating } = video;
              return (
                <SmallPoster
                  key={id}
                  id={id}
                  title={title}
                  posterUrl={posterUrl}
                  rating={rating}
                />
                // <div key={el.id}>{el.title}</div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
export default Search;
