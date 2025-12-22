import type { Like } from "./Like";
import type { UserWithNameOnly } from "./UserWithNameOnly";

export interface Review {
  anycomponent_id: number;
  content: string;
  created_at: string;
  id: number;
  likes: Like[];
  likes_count: number;
  rating: number;
  title: string;
  updated_at: string;
  user: UserWithNameOnly;
  user_id: number;
}
