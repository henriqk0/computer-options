export interface ReviewFormInput {
  title: string
  content: string
  rating: number
}

export interface ReviewSavePayload extends ReviewFormInput {
  user_id: number
  anycomponent_id: number
}

export interface ReviewDTO {
  id: number
  title: string
  content: string
  rating: number
  created_at: string
}
