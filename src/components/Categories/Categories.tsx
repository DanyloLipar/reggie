import React from "react";
import { Link } from "react-router-dom";
import tablet from "../../assets/photos/tablet-desktop.svg";
import tabletMobile from "../../assets/photos/tablet-desktop.svg";
import { categories } from "../../core/constants/categories";
import { categoriesMobile } from "../../core/constants/categories-mobile";

const Categories = () => {
  return (
    <section className="categories">
      <div className="categories__content">
        <div className="categories__content-desktop">
          <img src={tablet} alt="tablet" />
        </div>
        <div className="categories__content-mobile"></div>
        <div className="categories__all categories-desktop">
          {categories.map((category, index) => {
            return (
              <div key={index} className="categories__all-category">
                <span className="categories__all-category-name">
                  {category}
                </span>
              </div>
            );
          })}
        </div>
        <div className="categories__all categories-mobile">
          {categoriesMobile.map((category, index) => {
            return (
              <div key={index} className="categories__all-category">
                <span className="categories__all-category-name">
                  {category}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="categories__terms">
        <div className="categories__terms-box terms-box">
          <Link className="terms-box__link" to="">
            Privacy Policy
          </Link>
          <Link className="terms-box__link" to="">
            Terms of Service
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
