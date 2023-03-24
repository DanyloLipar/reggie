import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import classNames from "classnames";
import { useParams } from "react-router-dom";

import { APIRoutes } from "../../core/http";
import useHttpGet from "../../core/hooks/useHttpGet";

import info from "../../assets/photos/results/info.svg";
import voted from "../../assets/photos/results/voted.svg";
import def_like from "../../assets/photos/liked.svg";
import disliked from "../../assets/photos/dislike-active.svg";
import thumbs_down from "../../assets/photos/dislike.svg";
import text_area from "../../assets/photos/results/text-area.svg";
import star from "../../assets/photos/results/star.svg";
import active_star from "../../assets/photos/results/star-active.svg";
import visit from "../../assets/photos/results/visit.svg";
import transform from "../../assets/photos/results/transform.svg";
import transform_active from "../../assets/photos/results/transform-active.svg";
import link_active from "../../assets/photos/results/link-active.svg";
import AppService from "../../core/services/app.service";
import { Article, windowModalType } from "../../core/types";
import { useLogout } from "../../core/hooks/useLogout";
import { useAppSelector } from "../../core/store";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  setModal,
  setModalType,
} from "../../core/store/reducers/modal/modalSlice";

const Regulation = () => {
  const [showMore, setShowMore] = useState(false);
  const [hovered, setHovered] = useState<string | number>("");
  const [article, setArticle] = useState<Article>();
  const [isSummary, setIsSummary] = useState(false);
  const [feedback, setFeedback] = useState<string | number>("");

  const user = useAppSelector((state) => state.auth.currentUser);
  const modal = useAppSelector((state) => state.auth.modal);
  const dispatch = useDispatch();

  console.log(modal);

  const { logout } = useLogout();

  const { searchId, articleId } = useParams();

  useHttpGet<any>(
    `${APIRoutes.SEARCH_DETAILS}/${searchId}/articles/${articleId}`,
    {
      resolve: (response) => {
        setArticle(response?.article);
      },
    }
  );
  // const { fetchedData: articles } = useHttpGet<any>(`${APIRoutes.ARTICLES}`);

  const handleText = () => {
    if (!showMore) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
  };

  const handleFeedback = async (id: number) => {
    const newFeedback = {
      userId: user?.userId,
      isSummary: isSummary,
      articleId: id,
      feedback: feedback,
    };

    try {
      await AppService.changeIsSummary(Number(searchId), newFeedback);
    } catch (error: any) {}
  };

  // const addAcrticle = async () => {
  //   const response = await AppService.createArticle({
  //     id: 1,
  //     name: "artilce_1",
  //     categoryTag: "category_1",
  //     tags: ["tag1", "tag2"],
  //   });
  // };

  return (
    <section className="regulation">
      <div className="regulation-top">
        <button onClick={logout} className="regulation-top-btn">
          <span className="regulation-top-btn__txt">Sign out</span>
        </button>
      </div>
      <header className="regulation-head">
        <div className="regulation-head-title">
          <h1 className="regulation-head-title__txt">{article?.articleName}</h1>
          <div className="regulation-head-title-big">
            <img
              src={info}
              alt="info"
              className="regulation-head-title-big__logo"
            />
            <div className="regulation-head-title-big-small">
              {feedback === "" && (
                <>
                  <img
                    onClick={() => {
                      setFeedback(0);
                      handleFeedback(Number(articleId));
                    }}
                    src={def_like}
                    alt="def_like"
                  />
                  <img
                    onClick={() => {
                      setFeedback(1);
                      handleFeedback(Number(articleId));
                    }}
                    src={thumbs_down}
                    alt="thumbs_down"
                  />
                </>
              )}
              {feedback === 0 && (
                <>
                  <img
                    onClick={() => {
                      setFeedback(0);
                      handleFeedback(Number(articleId));
                    }}
                    src={voted}
                    alt="voted"
                  />
                  <img
                    onClick={() => {
                      setFeedback(1);
                      handleFeedback(Number(articleId));
                    }}
                    src={thumbs_down}
                    alt="thumbs_down"
                  />
                </>
              )}
              {feedback === 1 && (
                <>
                  <img
                    onClick={() => {
                      setFeedback(0);
                      handleFeedback(Number(articleId));
                    }}
                    src={def_like}
                    alt="liked"
                  />
                  <img
                    onClick={() => {
                      setFeedback(1);
                      handleFeedback(Number(articleId));
                    }}
                    src={disliked}
                    alt="thumbs_down"
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="regulation-head-end">
          {!isSummary && (
            <img
              src={star}
              alt="star"
              onClick={() => {
                setIsSummary(true);
                handleFeedback(Number(articleId));
              }}
            />
          )}
          {isSummary && (
            <img
              src={active_star}
              alt="active_star"
              onClick={() => {
                setIsSummary(false);
                handleFeedback(Number(articleId));
              }}
            />
          )}
          <img src={visit} alt="visit" />
          <div className="regulation-head-end__thumbs">
            {feedback === "" && (
              <>
                <img
                  onClick={() => {
                    setFeedback(0);
                    handleFeedback(Number(articleId));
                  }}
                  src={def_like}
                  alt="def_like"
                />
                <img
                  onClick={() => {
                    setFeedback(1);
                    handleFeedback(Number(articleId));
                  }}
                  src={thumbs_down}
                  alt="thumbs_down"
                />
              </>
            )}
            {feedback === 0 && (
              <>
                <img
                  onClick={() => {
                    setFeedback(0);
                    handleFeedback(Number(articleId));
                  }}
                  src={voted}
                  alt="voted"
                />
                <img
                  onClick={() => {
                    setFeedback(1);
                    handleFeedback(Number(articleId));
                  }}
                  src={thumbs_down}
                  alt="thumbs_down"
                />
              </>
            )}
            {feedback === 1 && (
              <>
                <img
                  onClick={() => {
                    setFeedback(0);
                    handleFeedback(Number(articleId));
                  }}
                  src={def_like}
                  alt="liked"
                />
                <img
                  onClick={() => {
                    setFeedback(1);
                    handleFeedback(Number(articleId));
                  }}
                  src={disliked}
                  alt="thumbs_down"
                />
              </>
            )}
          </div>
        </div>
      </header>
      <div className="regulation-subhead">
        <span className="regulation-subhead__txt">{article?.category}</span>
        <div className="regulation-subhead__thumbs">
          {!isSummary && (
            <img
              src={star}
              alt="star"
              onClick={() => {
                setIsSummary(true);
                handleFeedback(Number(articleId));
              }}
            />
          )}
          {isSummary && (
            <img
              src={active_star}
              alt="active_star"
              onClick={() => {
                setIsSummary(false);
                handleFeedback(Number(articleId));
              }}
            />
          )}
          <img src={visit} alt="visit" />
          <img src={voted} alt="voted" />
          <img src={thumbs_down} alt="thumbs_down" />
        </div>
      </div>
      <div className="regulation-desc">
        <p className="regulation-desc__txt">{article?.articleSummary}</p>
      </div>
      <main className="regulation__conversation conversation">
        {article?.requirements.map((requirement) => (
          <div
            onMouseEnter={() => setHovered(requirement.requirementId)}
            onMouseLeave={() => setHovered("")}
          >
            <div
              className={classNames({
                "conversation-quest-section": true,
                "conversation-quest-section-active":
                  hovered === requirement.requirementId,
              })}
            >
              {hovered !== requirement.requirementId && (
                <div
                  className={classNames({
                    "conversation-quest-section-line": true,
                  })}
                ></div>
              )}
              <div className="conversation-quest-section-content">
                <p className="conversation-quest-section-content__main">
                  {requirement.requirementSummary}
                </p>
                <span className="conversation-quest-section-content__add">
                  {requirement.requirementName}
                </span>
              </div>
              {hovered === requirement.requirementId && (
                <ul className="conversation-answer-section-content-links">
                  <li className="conversation-answer-section-content-links__item">
                    <button
                      className="conversation-answer-section-content-links__item-btn"
                      onClick={() => {
                        dispatch(setModalType(windowModalType.exportModal));
                        dispatch(setModal());
                      }}
                    >
                      <img
                        src={link_active}
                        alt="link_active"
                        className="conversation-answer-section-content-links__item-btn-img"
                      />
                    </button>
                  </li>
                  <li className="conversation-answer-section-content-links__item">
                    <button className="conversation-answer-section-content-links__item-btn">
                      {!isSummary && (
                        <img
                          className="conversation-answer-section-content-links__item-btn-img"
                          src={star}
                          alt="star"
                          onClick={() => {
                            setIsSummary(true);
                            handleFeedback(requirement.requirementId);
                          }}
                        />
                      )}
                      {isSummary && (
                        <img
                          className="conversation-answer-section-content-links__item-btn-img"
                          src={active_star}
                          alt="active_star"
                          onClick={() => {
                            setIsSummary(false);
                            handleFeedback(requirement.requirementId);
                          }}
                        />
                      )}
                    </button>
                  </li>
                  <li className="conversation-answer-section-content-links__item">
                    <button className="conversation-answer-section-content-links__item-btn">
                      <img
                        src={text_area}
                        alt="text_area"
                        className="conversation-answer-section-content-links__item-btn-img"
                      />
                    </button>
                  </li>
                  <li className="conversation-answer-section-content-links__item">
                    <button className="conversation-answer-section-content-links__item-btn">
                      <img
                        src={visit}
                        alt="visit"
                        className="conversation-answer-section-content-links__item-btn-img"
                      />
                    </button>
                  </li>
                  <li className="conversation-answer-section-content-links__item">
                    {!isSummary && (
                      <button className="conversation-answer-section-content-links__item-btn">
                        <img
                          className="conversation-answer-section-content-links__item-btn-img"
                          src={transform}
                          alt="star"
                          onClick={() => {
                            setIsSummary(true);
                            handleFeedback(requirement.requirementId);
                          }}
                        />
                      </button>
                    )}
                    {isSummary && (
                      <button className="conversation-answer-section-content-links__item-btn">
                        <img
                          className="conversation-answer-section-content-links__item-btn-img"
                          src={transform_active}
                          alt="transform_active"
                          onClick={() => {
                            setIsSummary(false);
                            handleFeedback(requirement.requirementId);
                          }}
                        />
                      </button>
                    )}
                  </li>
                </ul>
              )}
            </div>
            {hovered === requirement.requirementId && (
              <div className="conversation-quest-section-footer">
                <ul className="conversation-answer-section-footer-links">
                  <li className="conversation-answer-section-content-links__item">
                    <button
                      className="conversation-answer-section-content-links__item-btn"
                      onClick={() => {
                        dispatch(setModalType(windowModalType.exportModal));
                        dispatch(setModal());
                      }}
                    >
                      <img
                        src={link_active}
                        alt="link_active"
                        className="conversation-answer-section-content-links__item-btn-img"
                      />
                    </button>
                  </li>
                  <li className="conversation-answer-section-content-links__item">
                    <button className="conversation-answer-section-content-links__item-btn">
                      {!isSummary && (
                        <img
                          className="conversation-answer-section-content-links__item-btn-img"
                          src={star}
                          alt="star"
                          onClick={() => {
                            setIsSummary(true);
                            handleFeedback(requirement.requirementId);
                          }}
                        />
                      )}
                      {isSummary && (
                        <img
                          className="conversation-answer-section-content-links__item-btn-img"
                          src={active_star}
                          alt="active_star"
                          onClick={() => {
                            setIsSummary(false);
                            handleFeedback(requirement.requirementId);
                          }}
                        />
                      )}
                    </button>
                  </li>
                  <li className="conversation-answer-section-content-links__item">
                    <button className="conversation-answer-section-content-links__item-btn">
                      <img
                        src={text_area}
                        alt="text_area"
                        className="conversation-answer-section-content-links__item-btn-img"
                      />
                    </button>
                  </li>
                  <li className="conversation-answer-section-content-links__item">
                    <button className="conversation-answer-section-content-links__item-btn">
                      <img
                        src={visit}
                        alt="visit"
                        className="conversation-answer-section-content-links__item-btn-img"
                      />
                    </button>
                  </li>
                  <li className="conversation-answer-section-content-links__item">
                    {!isSummary && (
                      <button className="conversation-answer-section-content-links__item-btn">
                        <img
                          className="conversation-answer-section-content-links__item-btn-img"
                          src={transform}
                          alt="star"
                          onClick={() => {
                            setIsSummary(true);
                            handleFeedback(requirement.requirementId);
                          }}
                        />
                      </button>
                    )}
                    {isSummary && (
                      <button className="conversation-answer-section-content-links__item-btn">
                        <img
                          className="conversation-answer-section-content-links__item-btn-img"
                          src={transform_active}
                          alt="transform_active"
                          onClick={() => {
                            setIsSummary(false);
                            handleFeedback(requirement.requirementId);
                          }}
                        />
                      </button>
                    )}
                  </li>
                </ul>
                {feedback === "" && (
                  <>
                    <img
                      onClick={() => {
                        setFeedback(0);
                        handleFeedback(requirement.requirementId);
                      }}
                      src={def_like}
                      alt="def_like"
                    />
                    <img
                      onClick={() => {
                        setFeedback(1);
                        handleFeedback(requirement.requirementId);
                      }}
                      src={thumbs_down}
                      alt="thumbs_down"
                    />
                  </>
                )}
                {feedback === 0 && (
                  <>
                    <img
                      onClick={() => {
                        setFeedback(0);
                        handleFeedback(requirement.requirementId);
                      }}
                      src={voted}
                      alt="voted"
                    />
                    <img
                      onClick={() => {
                        setFeedback(1);
                        handleFeedback(requirement.requirementId);
                      }}
                      src={thumbs_down}
                      alt="thumbs_down"
                    />
                  </>
                )}
                {feedback === 1 && (
                  <>
                    <img
                      onClick={() => {
                        setFeedback(0);
                        handleFeedback(requirement.requirementId);
                      }}
                      src={def_like}
                      alt="like"
                    />
                    <img
                      onClick={() => {
                        setFeedback(1);
                        handleFeedback(requirement.requirementId);
                      }}
                      src={disliked}
                      alt="dislike"
                    />
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </main>
    </section>
  );
};

export default Regulation;
