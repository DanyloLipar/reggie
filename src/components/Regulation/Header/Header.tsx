import { Article } from "../../../core/types";

import info from "../../../assets/photos/results/info.svg";
import dislike from "../../../assets/photos/dislike.svg";
import star from "../../../assets/photos/results/star.svg";
import active_star from "../../../assets/photos/results/star-active.svg";
import exportIcon from "../../../assets/photos/results/export.svg";
import like from "../../../assets/photos/like.svg";
import likeActive from "../../../assets/photos/like-active.svg";
import dislikeActive from "../../../assets/photos/dislike-active.svg";

type HeaderProps = {
  article: Article;
  articleId: string;
  commentFeedback: any;
  saveFeedback: (id: number, type: string, value: number | boolean) => void;
  handleFeedback: (id: number) => void;
};

const Header = ({
  article,
  articleId,
  commentFeedback,
  handleFeedback,
  saveFeedback,
}: HeaderProps) => {
  return (
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
            {commentFeedback &&
              !commentFeedback[`like${Number(articleId)}`] && (
                <>
                  <img
                    onClick={() => {
                      saveFeedback(Number(articleId), "like", 1);
                      handleFeedback(Number(articleId));
                    }}
                    src={like}
                    alt="def_like"
                  />
                  <img
                    onClick={() => {
                      saveFeedback(Number(articleId), "like", 2);
                      handleFeedback(Number(articleId));
                    }}
                    src={dislike}
                    alt="dislike"
                  />
                </>
              )}
            {commentFeedback &&
              commentFeedback[`like${Number(articleId)}`] === 2 && (
                <>
                  <img
                    onClick={() => {
                      saveFeedback(Number(articleId), "like", 1);
                      handleFeedback(Number(articleId));
                    }}
                    src={like}
                    alt="voted"
                  />
                  <img
                    onClick={() => {
                      saveFeedback(Number(articleId), "like", 0);
                      handleFeedback(Number(articleId));
                    }}
                    src={dislikeActive}
                    alt="dislike"
                  />
                </>
              )}
            {commentFeedback &&
              commentFeedback[`like${Number(articleId)}`] === 1 && (
                <>
                  <img
                    onClick={() => {
                      saveFeedback(Number(articleId), "like", 0);
                      handleFeedback(Number(articleId));
                    }}
                    src={likeActive}
                    alt="liked"
                  />
                  <img
                    onClick={() => {
                      saveFeedback(Number(articleId), "like", 2);
                      handleFeedback(Number(articleId));
                    }}
                    src={dislike}
                    alt="dislike"
                  />
                </>
              )}
          </div>
        </div>
      </div>
      <div className="regulation-head-end">
        {commentFeedback && commentFeedback[`star${Number(articleId)}`] ? (
          <img
            src={active_star}
            alt="active_star"
            onClick={() => {
              handleFeedback(Number(articleId));
              if (article) {
                saveFeedback(Number(articleId), "star", false);
              }
            }}
          />
        ) : (
          <img
            src={star}
            alt="star"
            onClick={() => {
              handleFeedback(Number(articleId));
              saveFeedback(Number(articleId), "star", true);
            }}
          />
        )}
        <img src={exportIcon} alt="export" />
        <div className="regulation-head-end__thumbs">
          {commentFeedback && !commentFeedback[`like${Number(articleId)}`] && (
            <>
              <img
                onClick={() => {
                  saveFeedback(Number(articleId), "like", 1);
                  handleFeedback(Number(articleId));
                }}
                src={like}
                alt="def_like"
              />
              <img
                onClick={() => {
                  saveFeedback(Number(articleId), "like", 2);
                  handleFeedback(Number(articleId));
                }}
                src={dislike}
                alt="dislike"
              />
            </>
          )}
          {commentFeedback &&
            commentFeedback[`like${Number(articleId)}`] === 1 && (
              <>
                <img
                  onClick={() => {
                    saveFeedback(Number(articleId), "like", 0);
                    handleFeedback(Number(articleId));
                  }}
                  src={likeActive}
                  alt="voted"
                />
                <img
                  onClick={() => {
                    saveFeedback(Number(articleId), "like", 2);
                    handleFeedback(Number(articleId));
                  }}
                  src={dislike}
                  alt="dislike"
                />
              </>
            )}
          {commentFeedback &&
            commentFeedback[`like${Number(articleId)}`] === 2 && (
              <>
                <img
                  onClick={() => {
                    handleFeedback(Number(articleId));
                    saveFeedback(Number(articleId), "like", 1);
                  }}
                  src={like}
                  alt="liked"
                />
                <img
                  onClick={() => {
                    saveFeedback(Number(articleId), "like", 0);
                    handleFeedback(Number(articleId));
                  }}
                  src={dislikeActive}
                  alt="dislike"
                />
              </>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
