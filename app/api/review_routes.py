from flask import Blueprint, redirect, url_for, render_template, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from ..models.db import db
from ..models.review import Review
from ..forms.review_form import ReviewForm


review_routes = Blueprint('review', __name__)


#Get all reviews
@review_routes.route('/')
def all_reviews():
    all_review = Review.query.all()
    all_review_json = [review.to_dict() for review in all_review]
    return {"reviews": all_review_json}


# Get one review by review ID
@review_routes.route("/<int:review_id>")
def get_one_review(review_id):
    business = Review.query.get_or_404(review_id)
    return business.to_dict()


# Get all review of the Current User
@review_routes.route("/current")
@login_required
def get_current_reviews():

    if Review.user_id != current_user.id:
        return {"message": "You don't have any business", "statusCode": 404}

    current_reviews = Review.query.filter(Review.owner_id == current_user.id).all()
    current_review_json = [current_review.to_dict() for current_review in current_reviews]
    return {"current_review": current_review_json}


# edit review
@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def edit_comment(review_id):

    form = ReviewForm()
    edited_review = Review.query.get_or_404(review_id)

    if current_user.id != edited_review.user_id:
        return {"message": "You don't have authorization to update", "statusCode": 403}

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        edited_review.review = form.data['review']
        edited_review.stars = form.data['stars']
        db.session.commit()

        return edited_review.to_dict()
    else:
        return {'message': 'Unauthorized user', "statusCode": 403}


# delete review
@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_comment(review_id):

    review = Review.query.get_or_404(review_id)

    if current_user.id == review.user_id:

        db.session.delete(review)
        db.session.commit()
        return {'message': 'Successfully deleted'}
    else:
        return {'message': 'Unauthorized user', "statusCode": 403}

    