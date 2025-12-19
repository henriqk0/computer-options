import type { MyReview } from "./MyReview";

export interface ReviewsIntersecObserver {
  data: MyReview[];
  next_cursor: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_cursor: string;
  prev_page_url: string;
}
