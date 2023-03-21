import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { APIRoutes } from "../../core/http";
import { Article, Category } from "../../core/types";
import useHttpGet from "../../core/hooks/useHttpGet";

import more from "../../assets/photos/results/more.svg";
import summary from "../../assets/photos/results/summary.svg";
import star from "../../assets/photos/results/star.svg";
import starActive from "../../assets/photos/results/star-active.svg";
import visit from "../../assets/photos/results/visit.svg";
import link_disable from "../../assets/photos/results/link-disable.svg";
import text_area from "../../assets/photos/results/text-area.svg";
import transform from "../../assets/photos/results/transform.svg";
import transformActive from "../../assets/photos/results/transform-active.svg";
import like from "../../assets/photos/like.svg";
import dislike from "../../assets/photos/dislike.svg";
import likeActive from "../../assets/photos/like-active.svg";
import dislikeActive from "../../assets/photos/dislike-active.svg";
import { filters } from "../../core/constants/filters";
import { results } from "../../core/constants/results";
import { toast } from "react-toastify";

const Results = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [allresults, setAllResults] = useState<any>([]);
  const [pin, setPin] = useState(false);

  const { searchId } = useParams();

  useEffect(() => {
    setAllResults(results);
  }, []);

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
    const newCategory = categories.find((category: Category) => category.categoryId === id);
    setSelectedCategory(newCategory);
  };

  useHttpGet<any>(`${APIRoutes.SEARCH_SUMMARY}/${searchId}`, {
    resolve: (response) => {
      if (response) {
        setCategories(response?.summaries);
        setSelectedCategory(response?.summaries[0])
      }
    },
    reject: (error) => {
      toast.error("Articles not found!")
    }
  });

  console.log(selectedCategory);

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
            <div
              className="overview-head-end-list__item"
              onClick={() => setPin(!pin)}>
              {pin ? (
                <img src={starActive} alt="star-active" />
              ) : (
                <img src={star} alt="star" />
              )}
            </div>
            <li className="overview-head-end-list__item">
              <img src={visit} alt="visit" />
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
              onClick={() => filterParamsSwitcher(category.categoryId)}>
              <button
                onClick={() => setIsActive(!isActive)}
                className={
                  selectedCategory?.categoryId === category.categoryId
                    ? "overview-categories-list-item-active-btn"
                    : "overview-categories-list-item-btn"
                }>
                <span
                  className={
                    selectedCategory?.categoryId === category.categoryId
                      ? "overview-categories-list-item-btn__txt-active"
                      : "overview-categories-list-item-btn__txt"
                  }>
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
            <li className="overview-categories-func__list-item">
              <img src={visit} alt="visit" />
            </li>
            <li
              className="overview-categories-func__list-item"
              onClick={() => setPin(!pin)}>
              {pin ? (
                <img src={starActive} alt="star-active" />
              ) : (
                <img src={star} alt="star" />
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
          {selectedCategory?.articleSummaries.map((article: Article, index: number) => (
            <div className="results-reviews-block" key={article.articleId}>
              <div className="results-reviews__block-main block-main">
                <div className="block-main-wrapper">
                  <div className="block-main-review">
                    <p className="block-main-review__txt">{article.articleSummary}</p>
                  </div>
                  <div className="block-main-review__block-footer block-footer">
                    <div className="block-footer-head">
                      <span className="block-footer-head__main">
                        {article.articleName}
                      </span>
                      <span className="block-footer-head__additional">
                        Summary
                      </span>
                    </div>
                    {/* {result.liked === 0 && (
                      <div className="block-footer-end">
                        <img
                          src={like}
                          alt="voted"
                          onClick={() => likeSwitcher(index, 1)}
                        />
                        <img
                          src={dislike}
                          alt="thumb_down"
                          onClick={() => likeSwitcher(index, 2)}
                        />
                      </div>
                    )}
                    {result.liked === 1 && (
                      <div className="block-footer-end">
                        <img
                          src={likeActive}
                          alt="voted"
                          onClick={() => likeSwitcher(index, 1)}
                        />
                        <img
                          src={dislike}
                          alt="thumb_down"
                          onClick={() => likeSwitcher(index, 2)}
                        />
                      </div>
                    )}
                    {result.liked === 2 && (
                      <div className="block-footer-end">
                        <img
                          src={like}
                          alt="voted"
                          onClick={() => likeSwitcher(index, 1)}
                        />
                        <img
                          src={dislikeActive}
                          alt="thumb_down"
                          onClick={() => likeSwitcher(index, 2)}
                        />
                      </div>
                    )} */}
                  </div>
                </div>
                <ul className="block-main-controls">
                  <li className="block-main-controls__item">
                    <button className="block-main-controls__item-btn">
                      <img src={link_disable} alt="link_disable" />
                    </button>
                  </li>
                  {/* <li className="block-main-controls__item">
                    <button
                      className="block-main-controls__item-btn"
                      onClick={() => starPiner(index)}>
                      {result.star ? (
                        <img src={starActive} alt="star-active" />
                      ) : (
                        <img src={star} alt="star" />
                      )}
                    </button>
                  </li> */}
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
                  {/* <li className="block-main-controls__item">
                    <button
                      className="block-main-controls__item-btn"
                      onClick={() => transformPiner(index)}>
                      {result.transform ? (
                        <img src={transformActive} alt="transform-active" />
                      ) : (
                        <img src={transform} alt="transform" />
                      )}
                    </button>
                  </li> */}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>
    </section>
  );
};

export default Results;
