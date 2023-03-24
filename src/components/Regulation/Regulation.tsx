import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Requirement from "../Requirement";
import MobileHead from "./MobileHead";

import { APIRoutes } from "../../core/http";
import useHttpGet from "../../core/hooks/useHttpGet";
import { Article } from "../../core/types";
import { useLogout } from "../../core/hooks/useLogout";
import { useAppSelector } from "../../core/store";

import Header from "./Header";
import { useDispatch } from "react-redux";
import {
  setModal,
  setModalType,
} from "../../core/store/reducers/modal/modalSlice";

const Regulation = () => {
  const [showMore, setShowMore] = useState(false);
  const [article, setArticle] = useState<Article>();
  const [reloadChecker, setReloadChecker] = useState(false);
  const [commentFeedback, setCommentFeedback] = useState();

  const user = useAppSelector((state) => state.auth.currentUser);
  const modal = useAppSelector((state) => state.auth.modal);
  const dispatch = useDispatch();

  console.log(modal);

  const { logout } = useLogout();

  const { searchId, articleId } = useParams();

  useEffect(() => {
    localStorage.setItem(
      "commentFeedback",
      JSON.stringify({
        [`star${Number(articleId)}`]: false,
      })
    );
  }, []);

  useEffect(() => {
    if (localStorage.getItem("commentFeedback")) {
      setCommentFeedback(
        JSON.parse(localStorage.getItem("commentFeedback") || "{}")
      );
    }
  }, [reloadChecker]);

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
      // isSummary: isSummary,
      articleId: id,
      // feedback: feedback,
    };

    try {
      // await AppService.changeIsSummary(Number(searchId), newFeedback);
    } catch (error: any) {}
  };

  const saveFeedback = (id: number, type: string, value: boolean | number) => {
    if (localStorage.getItem("commentFeedback")) {
      localStorage.setItem(
        "commentFeedback",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("commentFeedback") || "{}"),
          [`${type}${id}`]: value,
        })
      );
    } else {
      localStorage.setItem(
        "commentFeedback",
        JSON.stringify({
          [`${type}${id}`]: value,
        })
      );
    }
    setReloadChecker(!reloadChecker);
  };

  return (
    <section className="regulation">
      <div className="regulation-top">
        <button onClick={logout} className="regulation-top-btn">
          <span className="regulation-top-btn__txt">Sign out</span>
        </button>
      </div>
      {article && articleId && (
        <>
          <Header
            commentFeedback={commentFeedback}
            article={article}
            articleId={articleId}
            handleFeedback={handleFeedback}
            saveFeedback={saveFeedback}
          />

          <MobileHead
            commentFeedback={commentFeedback}
            article={article}
            articleId={articleId}
            handleFeedback={handleFeedback}
            saveFeedback={saveFeedback}
          />
        </>
      )}
      <div className="regulation-desc">
        <p className="regulation-desc__txt">{article?.articleSummary}</p>
      </div>
      <main className="regulation__conversation conversation">
        {article?.requirements.map((requirement) => (
          <Requirement
            requirementId={requirement.requirementId}
            requirementName={requirement.requirementName}
            requirementSummary={requirement.requirementSummary}
            commentFeedback={commentFeedback}
            saveFeedback={saveFeedback}
            handleFeedback={handleFeedback}
          />
        ))}
      </main>
    </section>
  );
};

export default Regulation;
