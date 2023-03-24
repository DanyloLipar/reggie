export type Article = {
  articleId: number;
  articleName: string;
  categoryId: number;
  category: string;
  tags: string[];
  articleSummary: string;
  requirements: Requirements[];
};

export type Requirements = {
  requirementId: number;
  requirementName: string;
  requirementSummary: string;
};

export type Category = {
  articleSummaries: any;
  category: string;
  categoryId: number;
  categorySummary: string;
  numberOfArticles: number;
  numberOfRequirements: number;
};

export enum windowModalType {
  noModalDefault = 0,
  notificationModal = 1,
  exportModal = 2,
}
