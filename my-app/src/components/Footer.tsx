import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wrap">
        <div className="footer__left">
          <ul className="footer__policy">
            <li>
              <a
                href={'https://github.com/codestates/Netfreview-client'}
                target="_blank"
                rel="noreferrer"
              >
                Github ( Client )
              </a>
            </li>
            <li>
              <a
                href={'https://github.com/codestates/Netfreview-server'}
                target="_blank"
                rel="noreferrer"
              >
                Github ( Server )
              </a>
            </li>
            {/* <li>클릭하시면 깃허브 페이지로 이동합니다</li> */}
          </ul>
          <ul className="footer__service">
            <li>
              <em>고객센터</em>
              <span>|</span>
              <b>dummycompany@netfreview.com, 2424-5252</b>
            </li>
            <li>
              <em>제휴 및 대외 협력</em>
              <span>|</span>
              <b>communication@codestates.com, 703-88-00878</b>
            </li>
          </ul>
          <ul className="footer__company">
            <li>
              <em>주식회사 넷프리뷰</em>
              <span>|</span>
              <b>김남인, 조슬지, 최정완, 최재선</b>
              <span>|</span>
              <b>전국 각 지역</b>
            </li>
            <li>
              <em>사업자 등록 번호 </em>
              <span>|</span>
              <b>codestates FULL IM 25th team3</b>
            </li>
          </ul>
          <div>
            <h1 className="footer__logo">netfreview</h1>
            <p className="footer__copyright">
              <em>© 2021 by NETFREVIEW, Inc. All rights reserved.</em>
            </p>
          </div>
        </div>
        <div className="footer__right">
          <p className="footer_lang">한국어</p>
          <ul className="footer__social-links">
            <li className="footer__social-link facebook">facebook</li>
            <li className="footer__social-link instagram">instagram</li>
            <li className="footer__social-link twitter">twitter</li>
            <li className="footer__social-link youtube">youtube</li>
          </ul>
          <p>구글 크롬에 최적화 되어있습니다</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
