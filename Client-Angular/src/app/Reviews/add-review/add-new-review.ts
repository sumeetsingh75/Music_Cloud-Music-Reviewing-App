import { Component, OnInit, Input, Inject } from '@angular/core';
import { ReviewService } from '../review.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StarRatingComponent } from 'ng-starrating';
import { AddReviewDialogData } from './new-review-data';
import { IReview } from '../review';

@Component({
  selector: 'add-review-dialog',
  templateUrl: 'add-review-dialog.html',
})
export class AddReviewDialog {

  constructor(
    public dialogRef: MatDialogRef<AddReviewDialog>, private reviewService: ReviewService,
    @Inject(MAT_DIALOG_DATA) public data: AddReviewDialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Service Call to save new Review into Database
  save() {
    console.log("new Review is" + this.data.newReview);
    this.reviewService.addNewReview(this.data.newReview).subscribe(data => {
      if (data) {
        var addedReview: IReview = {
          reviewId: data.reviewId,
          songId: data.songId,
          submittedOn: data.submittedOn,
          submitedBy: data.submitedBy,
          reviewDesc: data.reviewDesc,
          rating: data.rating,
          visibility: data.visibility

        }
        this.data.allReviews.push(addedReview);
        console.log(this.data.avgRating);
        if(this.data.allReviews.length == 1){
          this.data.avgRating = Math.round(((this.data.avgRating * (this.data.allReviews.length - 1)) + this.data.newReview.rating) / this.data.allReviews.length);
        }
        else{
          this.data.avgRating = this.data.newReview.rating;
        }
       
        console.log(this.data.avgRating);
      }

    }, error => {

      console.log(JSON.stringify(error.error.details[0].message));
    });
  }

  //Method to fetch rating from UI
  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {

    this.data.newReview.rating = $event.newValue;
  }

}