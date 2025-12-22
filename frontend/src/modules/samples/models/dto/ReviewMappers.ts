import type { ReviewSavePayload } from './ReviewDTOs'
import type { ReviewFormValidated } from './ReviewSchemas'

export function toReviewSavePayload(
  data: ReviewFormValidated,
  userId: number,
  componentId: number,
): ReviewSavePayload {
  return {
    ...data,
    user_id: userId,
    anycomponent_id: componentId,
  }
}
