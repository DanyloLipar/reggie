import star from "../../assets/photos/results/star.svg";
import starActive from "../../assets/photos/results/star-active.svg";
import link_disable from "../../assets/photos/results/link-disable.svg";
import text_area from "../../assets/photos/results/text-area.svg";
import transform from "../../assets/photos/results/transform.svg";
import transformActive from "../../assets/photos/results/transform-active.svg";
import like from "../../assets/photos/like.svg";
import exportIcon from "../../assets/photos/results/export.svg";
import dislike from "../../assets/photos/dislike.svg";
import likeActive from "../../assets/photos/like-active.svg";
import dislikeActive from "../../assets/photos/dislike-active.svg";

import { Article, Category } from "../../core/types";
import { useNavigate } from "react-router-dom";

type ResultCardProps = {
  artcileFeedback: any;
  index: number;
  article: Article;
  saveFeedback: (id: number, type: string, value: number | boolean) => void;
  setArticleFeedback: (articleFeedback: any) => void;
  selectedCategory: Category;
  handleFeedback: (id: number) => void;
  transformPiner: (index: number) => void;
};

const ResultCard = ({
  artcileFeedback,
  index,
  article,
  saveFeedback,
  handleFeedback,
  selectedCategory,
  transformPiner,
}: ResultCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="results-reviews-block">
      <div className="results-reviews__block-main block-main">
        <div className="block-main-wrapper">
          <div
            className="block-main-review"
            onClick={() => {
              navigate(
                `/regulation/${selectedCategory.categoryId}/${article.articleId}`
              );
            }}
          >
            <p className="block-main-review__txt">{article.articleSummary}</p>
          </div>
          <div className="block-main-review__block-footer block-footer">
            <div className="block-footer-head">
              <span className="block-footer-head__main">
                {article.articleName}
              </span>
              <span className="block-footer-head__additional">Summary</span>
            </div>
            {!artcileFeedback[`like${article.articleId}`] && (
              <div className="block-footer-end">
                <img
                  src={like}
                  alt="voted"
                  onClick={() => {
                    saveFeedback(article?.articleId, "like", 1);
                    handleFeedback(article.articleId);
                  }}
                />
                <img
                  src={dislike}
                  alt="thumb_down"
                  onClick={() => {
                    saveFeedback(article?.articleId, "like", 2);
                    handleFeedback(article.articleId);
                  }}
                />
              </div>
            )}
            {artcileFeedback[`like${article.articleId}`] === 2 && (
              <div className="block-footer-end">
                <img
                  src={like}
                  alt="voted"
                  onClick={() => {
                    saveFeedback(article?.articleId, "like", 1);
                    handleFeedback(article.articleId);
                  }}
                />
                <img
                  src={dislikeActive}
                  alt="thumb_down"
                  onClick={() => {
                    saveFeedback(article?.articleId, "like", 0);
                    handleFeedback(article.articleId);
                  }}
                />
              </div>
            )}
            {artcileFeedback[`like${article.articleId}`] === 1 && (
              <div className="block-footer-end">
                <img
                  src={likeActive}
                  alt="voted"
                  onClick={() => {
                    saveFeedback(article?.articleId, "like", 0);
                    handleFeedback(article.articleId);
                  }}
                />
                <img
                  src={dislike}
                  alt="thumb_down"
                  onClick={() => {
                    saveFeedback(article?.articleId, "like", 2);
                    handleFeedback(article.articleId);
                  }}
                />
              </div>
            )}
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
              {artcileFeedback &&
              artcileFeedback[`star${article.articleId}`] ? (
                <img
                  src={starActive}
                  onClick={() => {
                    saveFeedback(article?.articleId, "star", false);
                    handleFeedback(article.articleId);
                  }}
                  alt="star-active"
                />
              ) : (
                <img
                  src={star}
                  onClick={() => {
                    saveFeedback(article?.articleId, "star", true);
                    handleFeedback(article.articleId);
                  }}
                  alt="star"
                />
              )}
            </button>
          </li>
          <li className="block-main-controls__item">
            <button className="block-main-controls__item-btn">
              <img src={text_area} alt="text_area" />
            </button>
          </li>
          {/* <li className="block-main-controls__item">
            <button className="block-main-controls__item-btn">
              <img src={exportIcon} alt="export" />
            </button>
          </li>
          <li className="block-main-controls__item">
            <button
              className="block-main-controls__item-btn"
              onClick={() => transformPiner(index)}
            >
              {artcileFeedback &&
              artcileFeedback[`transform${article.articleId}`] ? (
                <img
                  src={transformActive}
                  onClick={() => {
                    saveFeedback(article?.articleId, "transform", false);
                  }}
                  alt="transform-active"
                />
              ) : (
                <img
                  src={transform}
                  onClick={() => {
                    saveFeedback(article?.articleId, "transform", true);
                  }}
                  alt="transform"
                />
              )}
            </button>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default ResultCard;
