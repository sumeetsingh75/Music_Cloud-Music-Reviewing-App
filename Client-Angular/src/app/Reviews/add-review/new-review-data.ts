import { IReview } from '../review';
export interface AddReviewDialogData {
   
    newReview:IReview;
    allReviews:IReview[];
    avgRating:number;
  }