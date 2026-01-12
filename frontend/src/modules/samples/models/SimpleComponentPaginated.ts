import type { SimpleComponent } from "./SimpleComponent";
import type { UrlPages } from "./UrlPages";

export interface SimpleComponentPaginated {
  current_page: number;
  data: SimpleComponent[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: UrlPages[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
  search: string;
}
