import { useState } from "react";
import classNames from "classnames";

import star from "../../assets/photos/results/star.svg";
import active_star from "../../assets/photos/results/star-active.svg";
import dislike from "../../assets/photos/dislike.svg";
import like from "../../assets/photos/like.svg";
import likeActive from "../../assets/photos/like-active.svg";
import dislikeActive from "../../assets/photos/dislike-active.svg";
import link_active from "../../assets/photos/results/link-active.svg";
import text_area from "../../assets/photos/results/text-area.svg";
import transform_active from "../../assets/photos/results/transform-active.svg";
import transform from "../../assets/photos/results/transform.svg";
import visit from "../../assets/photos/results/visit.svg";

type RequirementProp = {
  requirementId: number;
  requirementName: string;
  requirementSummary: string;
  commentFeedback: any;
  saveFeedback: (id: number, type: string, value: number | boolean) => void;
  handleFeedback: (id: number) => void;
};

const Requirement = ({
  requirementId,
  requirementName,
  requirementSummary,
  commentFeedback,
  saveFeedback,
  handleFeedback,
}: RequirementProp) => {
  const [hovered, setHovered] = useState<string | number>("");

  return (
    <div
      key={requirementId}
      onMouseEnter={() => setHovered(requirementId)}
      onMouseLeave={() => setHovered("")}>
      <div
        className={classNames({
          "conversation-quest-section": true,
          "conversation-quest-section-active": hovered === requirementId,
        })}>
        {hovered !== requirementId && (
          <div
            className={classNames({
              "conversation-quest-section-line": true,
            })}></div>
        )}
        <div className="conversation-quest-section-content">
          <p className="conversation-quest-section-content__main">
            {requirementSummary}
          </p>
          <span className="conversation-quest-section-content__add">
            {requirementName}
          </span>
        </div>
        {hovered === requirementId && (
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
                {commentFeedback && commentFeedback[`star${requirementId}`] ? (
                  <img
                    className="conversation-answer-section-content-links__item-btn-img"
                    src={active_star}
                    alt="active_star"
                    onClick={() => {
                      saveFeedback(requirementId, "star", false);
                      handleFeedback(requirementId);
                    }}
                  />
                ) : (
                  <img
                    className="conversation-answer-section-content-links__item-btn-img"
                    src={star}
                    alt="star"
                    onClick={() => {
                      saveFeedback(requirementId, "star", true);
                      handleFeedback(requirementId);
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
              {commentFeedback &&
              commentFeedback[`transform${requirementId}`] ? (
                <button className="conversation-answer-section-content-links__item-btn">
                  <img
                    className="conversation-answer-section-content-links__item-btn-img"
                    src={transform_active}
                    alt="transform_active"
                    onClick={() => {
                      saveFeedback(requirementId, "transform", false);
                      handleFeedback(requirementId);
                    }}
                  />
                </button>
              ) : (
                <button className="conversation-answer-section-content-links__item-btn">
                  <img
                    className="conversation-answer-section-content-links__item-btn-img"
                    src={transform}
                    alt="star"
                    onClick={() => {
                      saveFeedback(requirementId, "transform", true);
                      handleFeedback(requirementId);
                    }}
                  />
                </button>
              )}
            </li>
          </ul>
        )}
      </div>
      {hovered === requirementId && (
        <div className="conversation-quest-section-footer">
          <ul className="conversation-answer-section-footer-links">
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
                {commentFeedback && commentFeedback[`star${requirementId}`] ? (
                  <img
                    className="conversation-answer-section-content-links__item-btn-img"
                    src={active_star}
                    alt="active_star"
                    onClick={() => {
                      saveFeedback(requirementId, "star", false);
                      handleFeedback(requirementId);
                    }}
                  />
                ) : (
                  <img
                    className="conversation-answer-section-content-links__item-btn-img"
                    src={star}
                    alt="star"
                    onClick={() => {
                      saveFeedback(requirementId, "star", true);
                      handleFeedback(requirementId);
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
              {commentFeedback &&
              commentFeedback[`transform${requirementId}`] ? (
                <button className="conversation-answer-section-content-links__item-btn">
                  <img
                    className="conversation-answer-section-content-links__item-btn-img"
                    src={transform_active}
                    alt="transform_active"
                    onClick={() => {
                      saveFeedback(requirementId, "transform", false);
                      handleFeedback(requirementId);
                    }}
                  />
                </button>
              ) : (
                <button className="conversation-answer-section-content-links__item-btn">
                  <img
                    className="conversation-answer-section-content-links__item-btn-img"
                    src={transform}
                    alt="star"
                    onClick={() => {
                      saveFeedback(requirementId, "transform", true);
                      handleFeedback(requirementId);
                    }}
                  />
                </button>
              )}
            </li>
          </ul>
          {commentFeedback && !commentFeedback[`like${requirementId}`] && (
            <>
              <img
                onClick={() => {
                  saveFeedback(requirementId, "like", 1);
                  handleFeedback(requirementId);
                }}
                src={like}
                alt="def_like"
              />
              <img
                onClick={() => {
                  saveFeedback(requirementId, "like", 2);
                  handleFeedback(requirementId);
                }}
                src={dislike}
                alt="dislike"
              />
            </>
          )}
          {commentFeedback && commentFeedback[`like${requirementId}`] === 1 && (
            <>
              <img
                onClick={() => {
                  saveFeedback(requirementId, "like", 0);
                  handleFeedback(requirementId);
                }}
                src={likeActive}
                alt="voted"
              />
              <img
                onClick={() => {
                  saveFeedback(requirementId, "like", 2);
                  handleFeedback(requirementId);
                }}
                src={dislike}
                alt="dislike"
              />
            </>
          )}
          {commentFeedback && commentFeedback[`like${requirementId}`] === 2 && (
            <>
              <img
                onClick={() => {
                  saveFeedback(requirementId, "like", 1);
                  handleFeedback(requirementId);
                }}
                src={like}
                alt="like"
              />
              <img
                onClick={() => {
                  saveFeedback(requirementId, "like", 0);
                  handleFeedback(requirementId);
                }}
                src={dislikeActive}
                alt="dislike"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Requirement;
