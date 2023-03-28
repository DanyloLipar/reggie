import { ReactEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { APIRoutes } from "../../core/http";
import {
  Article,
  Category,
  Requirements,
  windowModalType,
} from "../../core/types";
import useHttpGet from "../../core/hooks/useHttpGet";

import more from "../../assets/photos/results/more.svg";
import summary from "../../assets/photos/results/summary.svg";
import star from "../../assets/photos/results/star.svg";
import starActive from "../../assets/photos/results/star-active.svg";
import exportIcon from "../../assets/photos/results/export.svg";
import { results } from "../../core/constants/results";
import { useLogout } from "../../core/hooks/useLogout";
import { useAppSelector } from "../../core/store";
import AppService from "../../core/services/app.service";
import { useDispatch } from "react-redux";
import {
  setArticlesIds,
  setModal,
  setModalType,
  setNotice,
  setSearchNum,
  setTitle,
} from "../../core/store/reducers/modal/modalSlice";
import ResultCard from "../ResultCard";

const Results = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [reloadChecker, setReloadChecker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [allresults, setAllResults] = useState<any>([]);
  const [artcileFeedback, setArticleFeedback] = useState<any>();

  const user = useAppSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const { searchId } = useParams();

  useHttpGet<any>(`${APIRoutes.SEARCH_SUMMARY}/${searchId}`, {
    resolve: (response) => {
      if (response) {
        setCategories(response?.summaries);
        setSelectedCategory(response?.summaries[0]);
      }
    },
    reject: (error) => {
      dispatch(setTitle("Success"));
      dispatch(setNotice("Logged in successfully!"));
      dispatch(setModalType(windowModalType.exportModal));
      dispatch(setModal());
    },
  });

  useEffect(() => {
    localStorage.setItem(
      "feedback",
      JSON.stringify({
        [`star${selectedCategory?.categoryId}`]: false,
      })
    );
  }, [selectedCategory]);

  useEffect(() => {
    setSearchQuery(JSON.parse(localStorage.getItem("searchQuery") || ""));
    setAllResults(results);
    dispatch(setSearchNum(Number(searchId)));
  }, []);

  useEffect(() => {
    if (localStorage.getItem("feedback")) {
      setArticleFeedback(JSON.parse(localStorage.getItem("feedback") || "{}"));
    }
  }, [reloadChecker]);

  const starPiner = (index: number) => {
    const newResults = [...allresults];
    newResults[index].star = !newResults[index].star;
    setAllResults(newResults);
  };

  const transformPiner = (index: number) => {
    const newResults = [...allresults];
    newResults[index].transform = !newResults[index].transform;
    setAllResults(newResults);
  };

  const likeSwitcher = (index: number, typeNum: number) => {
    const newResults = [...allresults];

    if (newResults[index].liked === typeNum) {
      newResults[index].liked = 0;
    } else {
      newResults[index].liked = typeNum;
    }

    setAllResults(newResults);
  };

  // const filterParamsSwitcher = (id: number) => {
  //   if (filterParams.includes(id)) {
  //     setFilterParams(filterParams.filter((param: any) => param !== id));
  //     return;
  //   }

  //   setFilterParams([...filterParams, id]);
  // };

  const filterParamsSwitcher = (id: number) => {
    const newCategory = categories.find(
      (category: Category) => category.categoryId === id
    );
    setSelectedCategory(newCategory);
  };

  const saveFeedback = (id: number, type: string, value: boolean | number) => {
    if (localStorage.getItem("feedback")) {
      localStorage.setItem(
        "feedback",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("feedback") || "{}"),
          [`${type}${id}`]: value,
        })
      );
    } else {
      localStorage.setItem(
        "feedback",
        JSON.stringify({
          [`${type}${id}`]: value,
        })
      );
    }
    setReloadChecker(!reloadChecker);
  };

  const handleFeedback = async (id: number) => {
    const storage = JSON.parse(localStorage.getItem(`feedback`) || "{}");

    const newFeedback = {
      userId: user?.userId,
      isSummary: storage[`star${id}`] || false,
      articleId: id,
      feedback: storage[`like${id}`] || 0,
    };
    try {
      await AppService.changeIsSummary(Number(searchId), newFeedback);
    } catch (error: any) {
      console.log(error);
    }
  };

  const performSearch = async () => {
    try {
      const response = await AppService.searchPerform({
        userId: user?.userId,
        query: searchQuery,
      });

      navigate(`/results-overview/${response?.data?.searchId}`);
      localStorage.setItem("searchQuery", JSON.stringify(searchQuery));
    } catch (errors: any) {
      dispatch(setTitle("Error!"));
      dispatch(setNotice("Nothing was found."));
      dispatch(setModalType(windowModalType.notificationModal));
      dispatch(setModal());
    }
  };

  const saveAllIds = () => {
    const allIds: number[] = [];

    categories.map((category: Category) =>
      category.articleSummaries.map((article: Article) =>
        allIds.push(article.articleId)
      )
    );

    return allIds;
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      performSearch();
    }
  };

  return (
    <section className="overview">
      <div className="overview-top">
        <button onClick={logout} className="overview-top-btn">
          <span className="overview-top-btn__txt">Sign out</span>
        </button>
      </div>
      <header className="overview-head">
        <input
          className="overview-head__title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
        />
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
            <div className="overview-head-end-list__item">
              {artcileFeedback &&
              artcileFeedback[`star${selectedCategory?.categoryId}`] ? (
                <img
                  src={starActive}
                  onClick={() => {
                    if (selectedCategory) {
                      saveFeedback(selectedCategory?.categoryId, "star", false);
                      handleFeedback(selectedCategory.categoryId);
                    }
                  }}
                  alt="star-active"
                />
              ) : (
                <img
                  src={star}
                  onClick={() => {
                    if (selectedCategory) {
                      saveFeedback(selectedCategory?.categoryId, "star", true);
                      handleFeedback(selectedCategory.categoryId);
                    }
                  }}
                  alt="star"
                />
              )}
            </div>
            <li
              className="overview-head-end-list__item"
              onClick={() => {
                dispatch(setArticlesIds(saveAllIds()));
                dispatch(setModalType(windowModalType.exportModal));
                dispatch(setModal());
              }}
            >
              <img src={exportIcon} alt="export" />
            </li>
          </ul>
        </div>
      </header>
      <div className="overview-categories">
        <ul className="overview-categories-list">
          {categories.map((category: Category, index: number) => (
            <li
              className="overview-categories-list-item"
              key={category.categoryId}
              onClick={() => filterParamsSwitcher(category.categoryId)}
            >
              <button
                onClick={() => setIsActive(!isActive)}
                className={
                  selectedCategory?.categoryId === category.categoryId
                    ? "overview-categories-list-item-active-btn"
                    : "overview-categories-list-item-btn"
                }
              >
                <span
                  className={
                    selectedCategory?.categoryId === category.categoryId
                      ? "overview-categories-list-item-btn__txt-active"
                      : "overview-categories-list-item-btn__txt"
                  }
                >
                  {category.category}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="overview-categories-func">
          <ul className="overview-categories-func__list">
            <li className="overview-categories-func__list-item">
              <img src={more} alt="more" />
            </li>
            <li className="overview-categories-func__list-item">
              <img src={summary} alt="summary" />
            </li>
            <li
              className="overview-categories-func__list-item"
              onClick={() => {
                dispatch(setArticlesIds(saveAllIds()));
                dispatch(setModalType(windowModalType.exportModal));
                dispatch(setModal());
              }}
            >
              <img src={exportIcon} alt="export" />
            </li>
            <li className="overview-categories-func__list-item">
              {artcileFeedback &&
              artcileFeedback[`star${selectedCategory?.categoryId}`] ? (
                <img
                  src={starActive}
                  onClick={() => {
                    if (selectedCategory) {
                      saveFeedback(selectedCategory?.categoryId, "star", false);
                      handleFeedback(selectedCategory.categoryId);
                    }
                  }}
                  alt="star-active"
                />
              ) : (
                <img
                  src={star}
                  onClick={() => {
                    if (selectedCategory) {
                      saveFeedback(selectedCategory?.categoryId, "star", true);
                      handleFeedback(selectedCategory.categoryId);
                    }
                  }}
                  alt="star"
                />
              )}
            </li>
          </ul>
        </div>
      </div>
      <main className="overview__results results">
        <div className="results-regulation">
          <span className="results-regulation-head">
            {`Generated based on ${selectedCategory?.numberOfArticles} regulations and ${selectedCategory?.numberOfRequirements} requirements`}
          </span>
          <div className="results-regulation-desc">
            <p className="results-regulation-desc__txt">
              {selectedCategory?.categorySummary}
            </p>
          </div>
        </div>
        <div className="results-reviews">
          {selectedCategory?.articleSummaries.map(
            (article: Article, index: number) => (
              <ResultCard
                key={article.articleId}
                article={article}
                saveFeedback={saveFeedback}
                handleFeedback={handleFeedback}
                artcileFeedback={artcileFeedback}
                setArticleFeedback={setArticleFeedback}
                transformPiner={transformPiner}
                selectedCategory={selectedCategory}
                index={index}
              />
            )
          )}
        </div>
      </main>
    </section>
  );
};

export default Results;
