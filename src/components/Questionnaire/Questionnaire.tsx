const Questionnaire = () => {
  const script = document.createElement("script");
  script.src = "https://embed.typeform.com/next/embed.js";
  script.async = true;
  document.body.appendChild(script);

  return (
    <div
      data-tf-widget="L5DWEiaj"
      data-tf-opacity="100"
      data-tf-inline-on-mobile
      data-tf-iframe-props="title=Regy Landing Page"
      data-tf-transitive-search-params
      data-tf-auto-focus
      data-tf-medium="snippet"
      data-tf-full-screen
    ></div>
  );
};
export default Questionnaire;
