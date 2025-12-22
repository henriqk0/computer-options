import type { Like } from "./Like";
import type { SimpleComponentWithNameOnly } from "./SimpleComponentWithNameOnly";

export interface MyReview {
  anycomponent: SimpleComponentWithNameOnly;
  anycomponent_id: number;
  content: string;
  created_at: string;
  id: number;
  likes: Like[];
  likes_count: number;
  rating: number;
  title: string;
  updated_at: string;
  user_id: number;
}
