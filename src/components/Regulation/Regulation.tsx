import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
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

const Regulation = () => {
  const [showMore, setShowMore] = useState(false);

  const [isLiked, setIsLiked] = useState({
    head: 0,
    comment: 0,
    star_first: false,
    star_second: false,
    repeat: false,
  });

  const { searchId, articleId } = useParams();

  // const { fetchedData: articleDetailed } = useHttpGet<any>(
  //   `${APIRoutes.SEARCH_DETAILS}/${searchId}/articles/${articleId}`
  // );

  // const { fetchedData: articles } = useHttpGet<any>(`${APIRoutes.ARTICLES}`);

  const handleText = () => {
    if (!showMore) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
  };

  const addAcrticle = async () => {
    const response = await AppService.createArticle({
      id: 1,
      name: "artilce_1",
      categoryTag: "category_1",
      tags: ["tag1", "tag2"],
    });
  };

  return (
    <section className="regulation">
      <div className="regulation-top">
        <button onClick={addAcrticle} className="regulation-top-btn">
          <span className="regulation-top-btn__txt">Sign out</span>
        </button>
      </div>
      <header className="regulation-head">
        <div className="regulation-head-title">
          <h1 className="regulation-head-title__txt">New York City</h1>
          <div className="regulation-head-title-big">
            <img
              src={info}
              alt="info"
              className="regulation-head-title-big__logo"
            />
            <div className="regulation-head-title-big-small">
              {isLiked.head === 0 && (
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
        <span className="regulation-subhead__txt">Building codes</span>
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
        <p className="regulation-desc__txt">
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
          Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
          tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non
          suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at
          maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales
          sodales.
        </p>
      </div>
      <main className="regulation__conversation conversation">
        <div className="conversation-quest-section">
          <div className="conversation-quest-section-line"></div>
          <div className="conversation-quest-section-content">
            <p className="conversation-quest-section-content__main">
              “You made it so simple. My new site is so much faster and easier
              to work with than my old site. I just choose the page, make the
              change.”
            </p>
            <span className="conversation-quest-section-content__add">
              Section 901.2.1
            </span>
          </div>
        </div>
        <div className="conversation-answer-section">
          <div className="conversation-answer-section-content">
            <div className="conversation-answer-section-content-head">
              <p className="conversation-answer-section-content-head__txt">
                “You made it so simple. My new site is so much faster and easier
                to work with than my old site. I just choose the page, make the
                change.”
              </p>
              <span className="conversation-answer-section-content-head__under">
                Section 901.2.1
              </span>
            </div>
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
          </div>
          <div className="conversation-answer-section-footer">
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
          <ul className="conversation-answer-section-func">
            <li className="conversation-answer-section-func__item">
              <button className="conversation-answer-section-content-links__item-btn">
                <img
                  src={link_active}
                  alt="link_active"
                  className="conversation-answer-section-content-links__item-btn-img"
                />
              </button>
            </li>
            <li className="conversation-answer-section-func__item">
              <button className="conversation-answer-section-func__item-link">
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
            <li className="conversation-answer-section-func__item">
              <button className="conversation-answer-section-func__item-link">
                <img
                  src={text_area}
                  alt="text_area"
                  className="conversation-answer-section-content-links__item-btn-img"
                />
              </button>
            </li>
            <li className="conversation-answer-section-func__item">
              <button className="conversation-answer-section-func__item-link">
                <img
                  src={visit}
                  alt="visit"
                  className="conversation-answer-section-content-links__item-btn-img"
                />
              </button>
            </li>
            <li className="conversation-answer-section-func__item">
              <button className="conversation-answer-section-func__item-link">
                <img
                  src={transform}
                  alt="transform"
                  className="conversation-answer-section-content-links__item-btn-img"
                />
              </button>
            </li>
            <li className="conversation-answer-section-func__item">
              <button className="conversation-answer-section-func__item-link">
                <img
                  src={voted}
                  alt="voted"
                  className="conversation-answer-section-content-links__item-btn-img"
                />
              </button>
            </li>
            <li className="conversation-answer-section-func__item">
              <button className="conversation-answer-section-func__item-link">
                <img
                  src={thumbs_down}
                  alt="thumbs_down"
                  className="conversation-answer-section-content-links__item-btn-img"
                />
              </button>
            </li>
          </ul>
        </div>
        <div className="conversation-quest-section">
          <div className="conversation-quest-section-line"></div>
          <div className="conversation-quest-section-content">
            <p className="conversation-quest-section-content__main">
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
              mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
              vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum
              auctor ornare leo, non suscipit magna interdum eu. Curabitur
              pellentesque nibh nibh, at maximus ante fermentum sit amet.
              Pellentesque commodo lacus at sodales sodales. Quisque sagittis
              orci ut diam condimentum, vel euismod erat placerat. In.
              {showMore && (
                <span className="conversation-quest-section-content__main">
                  “You made it so simple. My new site is so much faster and
                  easier to work with than my old site. I just choose the page,
                  make the change.” “You made it so simple. My new site is so
                  much faster and easier to work with than my old site. I just
                  choose the page, make the change.” “You made it so simple. My
                  new site is so much faster and easier to work with than my old
                  site. I just choose the page, make the change.”
                </span>
              )}
              {showMore ? (
                <button
                  className="conversation-quest-section-content__more"
                  onClick={handleText}>
                  <span>Show less</span>
                </button>
              ) : (
                <button
                  className="conversation-quest-section-content__more"
                  onClick={handleText}>
                  <span>See more</span>
                </button>
              )}
            </p>
            <span className="conversation-quest-section-content__add">
              Section 901.2.1
            </span>
          </div>
        </div>
        <div className="conversation-quest-section">
          <div className="conversation-quest-section-line"></div>
          <div className="conversation-quest-section-content">
            <p className="conversation-quest-section-content__main">
              “You made it so simple. My new site is so much faster and easier
              to work with than my old site. I just choose the page, make the
              change.”
            </p>
            <span className="conversation-quest-section-content__add">
              Section 901.2.1
            </span>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Regulation;
