import { Article, Requirements, windowModalType } from "../../../core/types";

import dislike from "../../../assets/photos/dislike.svg";
import star from "../../../assets/photos/results/star.svg";
import active_star from "../../../assets/photos/results/star-active.svg";
import exportIcon from "../../../assets/photos/results/export.svg";
import like from "../../../assets/photos/like.svg";
import likeActive from "../../../assets/photos/like-active.svg";
import dislikeActive from "../../../assets/photos/dislike-active.svg";
import { useDispatch } from "react-redux";
import {
  setArticlesIds,
  setModal,
  setModalType,
} from "../../../core/store/reducers/modal/modalSlice";

type MobileHeadProps = {
  commentFeedback: any;
  article: Article;
  articleId: string;
  saveFeedback: (id: number, type: string, value: number | boolean) => void;
  handleFeedback: (id: number) => void;
};

const MobileHead = ({
  commentFeedback,
  article,
  articleId,
  handleFeedback,
  saveFeedback,
}: MobileHeadProps) => {
  const dispatch = useDispatch();

  const saveAllIds = () => {
    const allIds: number[] = [];

    article.requirements.map((req: Requirements) =>
      allIds.push(req.requirementId)
    );

    return allIds;
  };

  return (
    <div className="regulation-subhead">
      <span className="regulation-subhead__txt">{article?.category}</span>
      <div className="regulation-subhead__thumbs">
        {commentFeedback && commentFeedback[`star${Number(articleId)}`] ? (
          <img
            src={active_star}
            alt="active_star"
            onClick={() => {
              saveFeedback(Number(articleId), "star", false);
              handleFeedback(Number(articleId));
            }}
          />
        ) : (
          <img
            src={star}
            alt="star"
            onClick={() => {
              saveFeedback(Number(articleId), "star", true);
              handleFeedback(Number(articleId));
            }}
          />
        )}
        <img
          src={exportIcon}
          alt="export"
          onClick={() => {
            dispatch(setArticlesIds(saveAllIds()));
            dispatch(setModalType(windowModalType.exportModal));
            dispatch(setModal());
          }}
        />
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
    </div>
  );
};

export default MobileHead;
