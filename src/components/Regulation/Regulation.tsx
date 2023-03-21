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
import { Article } from "../../core/types";
import { useLogout } from "../../core/hooks/useLogout";
import { useAppSelector } from "../../core/store";
import { toast } from "react-toastify";

const Regulation = () => {
  const [showMore, setShowMore] = useState(false);
  const [hovered, setHovered] = useState<string | number>("");
  const [article, setArticle] = useState<Article>();
  const [isSummary, setIsSummary] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isLiked, setIsLiked] = useState({
    head: 0,
    comment: 0,
    star_first: false,
    star_second: false,
    repeat: false,
  });

  const user = useAppSelector((state) => state.auth.currentUser);

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

  console.log(article);

  // const { fetchedData: articles } = useHttpGet<any>(`${APIRoutes.ARTICLES}`);

  const handleText = () => {
    if (!showMore) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
  };

  const handleSummary = async () => {
    const newFeedback = {
      userId: user?.userId,
      isSummary: isSummary,
      articleId: Number(articleId),
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

  console.log(article);

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
                    // onClick={() =>
                    //   setFeedback((prev) => {
                    //     if (feedback. === 1) {
                    //       return {
                    //         ...prev,
                    //         head: 0,
                    //       };
                    //     }
                    //     return {
                    //       ...prev,
                    //       head: 1,
                    //     };
                    //   })
                    // }
                    src={def_like}
                    alt="def_like"
                  />
                  <img
                    onClick={() =>
                      setIsLiked((prev) => {
                        if (isLiked.head === 2) {
                          return {
                            ...prev,
                            head: 0,
                          };
                        }
                        return {
                          ...prev,
                          head: 2,
                        };
                      })
                    }
                    src={thumbs_down}
                    alt="thumbs_down"
                  />
                </>
              )}
              {isLiked.head === 1 && (
                <>
                  <img
                    onClick={() =>
                      setIsLiked((prev) => {
                        if (isLiked.head === 1) {
                          return {
                            ...prev,
                            head: 0,
                          };
                        }

                        return {
                          ...prev,
                          head: 1,
                        };
                      })
                    }
                    src={voted}
                    alt="voted"
                  />
                  <img
                    onClick={() =>
                      setIsLiked((prev) => {
                        if (isLiked.head === 2) {
                          return {
                            ...prev,
                            head: 0,
                          };
                        }
                        return {
                          ...prev,
                          head: 2,
                        };
                      })
                    }
                    src={thumbs_down}
                    alt="thumbs_down"
                  />
                </>
              )}
              {isLiked.head === 2 && (
                <>
                  <img
                    onClick={() =>
                      setIsLiked((prev) => {
                        if (isLiked.head === 1) {
                          return {
                            ...prev,
                            head: 0,
                          };
                        }
                        return {
                          ...prev,
                          head: 1,
                        };
                      })
                    }
                    src={def_like}
                    alt="liked"
                  />
                  <img
                    onClick={() =>
                      setIsLiked((prev) => {
                        if (isLiked.head === 2) {
                          return {
                            ...prev,
                            head: 0,
                          };
                        }
                        return {
                          ...prev,
                          head: 2,
                        };
                      })
                    }
                    src={disliked}
                    alt="thumbs_down"
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="regulation-head-end">
          {!isLiked.star_first && (
            <img
              src={star}
              alt="star"
              onClick={() => {
                setIsLiked((prev) => {
                  return {
                    ...prev,
                    star_first: true,
                  };
                });
              }}
            />
          )}
          {isLiked.star_first && (
            <img
              src={active_star}
              alt="active_star"
              onClick={() => {
                setIsLiked((prev) => {
                  return {
                    ...prev,
                    star_first: false,
                  };
                });
              }}
            />
          )}
          <img src={visit} alt="visit" />
          <div className="regulation-head-end__thumbs">
            {isLiked.head === 0 && (
              <>
                <img
                  onClick={() =>
                    setIsLiked((prev) => {
                      return {
                        ...prev,
                        head: 1,
                      };
                    })
                  }
                  src={def_like}
                  alt="def_like"
                />
                <img
                  onClick={() =>
                    setIsLiked((prev) => {
                      return {
                        ...prev,
                        head: 2,
                      };
                    })
                  }
                  src={thumbs_down}
                  alt="thumbs_down"
                />
              </>
            )}
            {isLiked.head === 1 && (
              <>
                <img
                  onClick={() =>
                    setIsLiked((prev) => {
                      return {
                        ...prev,
                        head: 1,
                      };
                    })
                  }
                  src={voted}
                  alt="voted"
                />
                <img
                  onClick={() =>
                    setIsLiked((prev) => {
                      return {
                        ...prev,
                        head: 2,
                      };
                    })
                  }
                  src={thumbs_down}
                  alt="thumbs_down"
                />
              </>
            )}
            {isLiked.head === 2 && (
              <>
                <img
                  onClick={() =>
                    setIsLiked((prev) => {
                      return {
                        ...prev,
                        head: 1,
                      };
                    })
                  }
                  src={def_like}
                  alt="liked"
                />
                <img
                  onClick={() =>
                    setIsLiked((prev) => {
                      return {
                        ...prev,
                        head: 2,
                      };
                    })
                  }
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
          {!isLiked.star_first && (
            <img
              src={star}
              alt="star"
              onClick={() => {
                setIsLiked((prev) => {
                  return {
                    ...prev,
                    star_first: true,
                  };
                });
              }}
            />
          )}
          {isLiked.star_first && (
            <img
              src={active_star}
              alt="active_star"
              onClick={() => {
                setIsLiked((prev) => {
                  return {
                    ...prev,
                    star_first: false,
                  };
                });
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
                    <button className="conversation-answer-section-content-links__item-btn">
                      <img
                        src={link_active}
                        alt="link_active"
                        className="conversation-answer-section-content-links__item-btn-img"
                      />
                    </button>
                  </li>
                  <li className="conversation-answer-section-content-links__item">
                    <button className="conversation-answer-section-content-links__item-btn">
                      {!isLiked.star_second && (
                        <img
                          className="conversation-answer-section-content-links__item-btn-img"
                          src={star}
                          alt="star"
                          onClick={() => {
                            setIsLiked((prev) => {
                              return {
                                ...prev,
                                star_second: true,
                              };
                            });
                          }}
                        />
                      )}
                      {isLiked.star_second && (
                        <img
                          className="conversation-answer-section-content-links__item-btn-img"
                          src={active_star}
                          alt="active_star"
                          onClick={() => {
                            setIsLiked((prev) => {
                              return {
                                ...prev,
                                star_second: false,
                              };
                            });
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
                    {!isLiked.repeat && (
                      <button className="conversation-answer-section-content-links__item-btn">
                        <img
                          className="conversation-answer-section-content-links__item-btn-img"
                          src={transform}
                          alt="star"
                          onClick={() => {
                            setIsLiked((prev) => {
                              return {
                                ...prev,
                                repeat: true,
                              };
                            });
                          }}
                        />
                      </button>
                    )}
                    {isLiked.repeat && (
                      <button className="conversation-answer-section-content-links__item-btn">
                        <img
                          className="conversation-answer-section-content-links__item-btn-img"
                          src={transform_active}
                          alt="transform_active"
                          onClick={() => {
                            setIsLiked((prev) => {
                              return {
                                ...prev,
                                repeat: false,
                              };
                            });
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
                {isLiked.comment === 0 && (
                  <>
                    <img
                      onClick={() =>
                        setIsLiked((prev) => {
                          if (isLiked.comment === 1) {
                            return {
                              ...prev,
                              comment: 0,
                            };
                          }
                          return {
                            ...prev,
                            comment: 1,
                          };
                        })
                      }
                      src={def_like}
                      alt="def_like"
                    />
                    <img
                      onClick={() =>
                        setIsLiked((prev) => {
                          if (isLiked.comment === 2) {
                            return {
                              ...prev,
                              comment: 0,
                            };
                          }
                          return {
                            ...prev,
                            comment: 2,
                          };
                        })
                      }
                      src={thumbs_down}
                      alt="thumbs_down"
                    />
                  </>
                )}
                {isLiked.comment === 1 && (
                  <>
                    <img
                      onClick={() =>
                        setIsLiked((prev) => {
                          if (isLiked.comment === 1) {
                            return {
                              ...prev,
                              comment: 0,
                            };
                          }
                          return {
                            ...prev,
                            comment: 1,
                          };
                        })
                      }
                      src={voted}
                      alt="voted"
                    />
                    <img
                      onClick={() =>
                        setIsLiked((prev) => {
                          if (isLiked.comment === 2) {
                            return {
                              ...prev,
                              comment: 0,
                            };
                          }
                          return {
                            ...prev,
                            comment: 2,
                          };
                        })
                      }
                      src={thumbs_down}
                      alt="thumbs_down"
                    />
                  </>
                )}
                {isLiked.comment === 2 && (
                  <>
                    <img
                      onClick={() =>
                        setIsLiked((prev) => {
                          if (isLiked.comment === 1) {
                            return {
                              ...prev,
                              comment: 0,
                            };
                          }
                          return {
                            ...prev,
                            comment: 1,
                          };
                        })
                      }
                      src={def_like}
                      alt="liked"
                    />
                    <img
                      onClick={() =>
                        setIsLiked((prev) => {
                          if (isLiked.comment === 2) {
                            return {
                              ...prev,
                              comment: 0,
                            };
                          }
                          return {
                            ...prev,
                            comment: 2,
                          };
                        })
                      }
                      src={disliked}
                      alt="thumbs_down"
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
