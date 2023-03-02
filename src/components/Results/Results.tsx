import { useState } from "react";

import "./Results.scss";
import more from "../../assets/photos/results/more.svg";
import summary from "../../assets/photos/results/summary.svg";
import star from "../../assets/photos/results/star.svg";
import visit from "../../assets/photos/results/visit.svg";

import link_disable from "../../assets/photos/results/link-disable.svg";
import text_area from "../../assets/photos/results/text-area.svg";
import transform from "../../assets/photos/results/transform.svg";
import voted from "../../assets/photos/results/voted.svg";
import thumb_down from "../../assets/photos/results/thumbs-down.svg";

const Results = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <section className="overview">
      <div className="overview-top">
        <button className="overview-top-btn">
          <span className="overview-top-btn__txt">Sign out</span>
        </button>
      </div>
      <header className="overview-head">
        <h1 className="overview-head__title">Intercom</h1>
        <div className="overview-head-end">
          <ul className="overview-head-end-list">
            <li className="overview-head-end-list__item">
              <img src={more} alt="more" />
            </li>
            <li className="overview-head-end-list__item">
              <img src={summary} alt="summary" />
            </li>
          </ul>
          <ul className="overview-head-end-list">
            <li className="overview-head-end-list__item">
              <img src={star} alt="star" />
            </li>
            <li className="overview-head-end-list__item">
              <img src={visit} alt="visit" />
            </li>
          </ul>
        </div>
      </header>
      <div className="overview-categories">
        <ul className="overview-categories-list">
          <li className="overview-categories-list-item">
            <button
              onClick={() => setIsActive(!isActive)}
              className={
                isActive
                  ? "overview-categories-list-item-active-btn"
                  : "overview-categories-list-item-btn"
              }>
              <span
                className={
                  isActive
                    ? "overview-categories-list-item-btn__txt-active"
                    : "overview-categories-list-item-btn__txt"
                }>
                Life-safety
              </span>
            </button>
          </li>
          <li className="overview-categories-list-item">
            <button
              onClick={() => setIsActive(!isActive)}
              className={
                isActive
                  ? "overview-categories-list-item-active-btn"
                  : "overview-categories-list-item-btn"
              }>
              <span
                className={
                  isActive
                    ? "overview-categories-list-item-btn__txt-active"
                    : "overview-categories-list-item-btn__txt"
                }>
                + Environmental
              </span>
            </button>
          </li>
          <li className="overview-categories-list-item">
            <button
              onClick={() => setIsActive(!isActive)}
              className={
                isActive
                  ? "overview-categories-list-item-active-btn"
                  : "overview-categories-list-item-btn"
              }>
              <span
                className={
                  isActive
                    ? "overview-categories-list-item-btn__txt-active"
                    : "overview-categories-list-item-btn__txt"
                }>
                + Location
              </span>
            </button>
          </li>
          <li className="overview-categories-list-item">
            <button
              onClick={() => setIsActive(!isActive)}
              className={
                isActive
                  ? "overview-categories-list-item-active-btn"
                  : "overview-categories-list-item-btn"
              }>
              <span
                className={
                  isActive
                    ? "overview-categories-list-item-btn__txt-active"
                    : "overview-categories-list-item-btn__txt"
                }>
                + Zoning
              </span>
            </button>
          </li>
          <li className="overview-categories-list-item">
            <button
              onClick={() => setIsActive(!isActive)}
              className={
                isActive
                  ? "overview-categories-list-item-active-btn"
                  : "overview-categories-list-item-btn"
              }>
              <span
                className={
                  isActive
                    ? "overview-categories-list-item-btn__txt-active"
                    : "overview-categories-list-item-btn__txt"
                }>
                + Privacy
              </span>
            </button>
          </li>
        </ul>
      </div>
      <main className="overview__results results">
        <div className="results-regulation">
          <span className="results-regulation-head">
            Generated based on 3 regulations and 72 requirements
          </span>
          <div className="results-regulation-desc">
            <p className="results-regulation-desc__txt">
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
              mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
              vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum
              auctor ornare leo, non suscipit magna interdum eu. Curabitur
              pellentesque nibh nibh, at maximus ante fermentum sit amet.
              Pellentesque commodo lacus at sodales sodales.
            </p>
          </div>
        </div>
        <div className="results-reviews">
          <div className="results-reviews-block">
            <div className="results-reviews__block-main block-main">
              <div className="block-main-wrapper">
                <div className="block-main-review">
                  <p className="block-main-review__txt">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                    massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                    sapien fringilla, mattis ligula consectetur, ultrices
                    mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet
                    augue. Vestibulum auctor ornare leo, non suscipit magna
                    interdum eu. Curabitur pellentesque nibh nibh, at maximus
                    ante fermentum sit amet. Pellentesque commodo lacus at
                    sodales sodales. Quisque sagittis orci ut diam condimentum,
                    vel euismod erat placerat. In iaculis arcu eros, eget tempus
                    orci facilisis id. Praesent lorem orci, mattis non efficitur
                    id, ultricies vel nibh. Sed volutpat lacus vitae gravida
                    viverra. Fusce vel tempor elit. Proin tempus,.
                  </p>
                </div>
                <div className="block-main-review__block-footer block-footer">
                  <div className="block-footer-head">
                    <span className="block-footer-head__main">
                      City Building Code 2020
                    </span>
                    <span className="block-footer-head__additional">
                      Summary
                    </span>
                  </div>
                  <div className="block-footer-end">
                    <img src={voted} alt="voted" />
                    <img src={thumb_down} alt="thumb_down" />
                  </div>
                </div>
              </div>
              <ul className="block-main-controls">
                <li className="block-main-controls__item">
                  <button className="block-main-controls__item-btn">
                    <img src={link_disable} alt="link_disable" />
                  </button>
                </li>
                <li className="block-main-controls__item">
                  <button className="block-main-controls__item-btn">
                    <img src={star} alt="star" />
                  </button>
                </li>
                <li className="block-main-controls__item">
                  <button className="block-main-controls__item-btn">
                    <img src={text_area} alt="text_area" />
                  </button>
                </li>
                <li className="block-main-controls__item">
                  <button className="block-main-controls__item-btn">
                    <img src={visit} alt="visit" />
                  </button>
                </li>
                <li className="block-main-controls__item">
                  <button className="block-main-controls__item-btn">
                    <img src={transform} alt="transform" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="results-reviews-block">
            <div className="results-reviews__block-main block-main">
              <div className="block-main-wrapper">
                <div className="block-main-review">
                  <p className="block-main-review__txt">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                    massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                    sapien fringilla, mattis ligula consectetur, ultrices
                    mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet
                    augue. Vestibulum auctor ornare leo, non suscipit magna
                    interdum eu. Curabitur pellentesque nibh nibh, at maximus
                    ante fermentum sit amet. Pellentesque commodo lacus at
                    sodales sodales. Quisque sagittis orci ut diam condimentum,
                    vel euismod erat placerat. In iaculis arcu eros, eget tempus
                    orci facilisis id. Praesent lorem orci, mattis non efficitur
                    id, ultricies vel nibh. Sed volutpat lacus vitae gravida
                    viverra. Fusce vel tempor elit. Proin tempus,.
                  </p>
                </div>
                <div className="block-main-review__block-footer block-footer">
                  <div className="block-footer-head">
                    <span className="block-footer-head__main">
                      City Building Code 2020
                    </span>
                    <span className="block-footer-head__additional">
                      Summary
                    </span>
                  </div>
                  <div className="block-footer-end">
                    <img src={voted} alt="voted" />
                    <img src={thumb_down} alt="thumb_down" />
                  </div>
                </div>
              </div>
              <ul className="block-main-controls">
                <li className="block-main-controls__item">
                  <button className="block-main-controls__item-btn">
                    <img src={link_disable} alt="link_disable" />
                  </button>
                </li>
                <li className="block-main-controls__item">
                  <button className="block-main-controls__item-btn">
                    <img src={star} alt="star" />
                  </button>
                </li>
                <li className="block-main-controls__item">
                  <button className="block-main-controls__item-btn">
                    <img src={text_area} alt="text_area" />
                  </button>
                </li>
                <li className="block-main-controls__item">
                  <button className="block-main-controls__item-btn">
                    <img src={visit} alt="visit" />
                  </button>
                </li>
                <li className="block-main-controls__item">
                  <button className="block-main-controls__item-btn">
                    <img src={transform} alt="transform" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Results;
