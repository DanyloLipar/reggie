type ArticleSummary = {
  articleId: number;
  articleName: string;
  tags: string[];
  articleSummary: string;
};

export type Article = {
  categoryId: number;
  category: string;
  numberOfArticles: number;
  numberOfRequirements: number;
  categorySummary: string;
  articleSummaries: ArticleSummary[];
};
