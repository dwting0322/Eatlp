from flask import Blueprint, redirect, url_for, render_template, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from ..models.business import Business
from ..forms.business_form import BusinessForm
from ..models.db import db
from ..models.review import Review
from ..forms.review_form import ReviewForm
from ..models.image import Image
from .auth_routes import validation_errors_to_error_messages
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)


business_routes = Blueprint('business', __name__)



# Get all businesses
@business_routes.route("")
def get_all_businesses():
    all_business = Business.query.all()
    all_business_json = [business.to_dict() for business in all_business]
    return {"businesses": all_business_json}


# Get one business by business ID
@business_routes.route("/<business_id>")
def get_one_business(business_id):
    
    try:
        business_id = int(business_id) 
    except:
        return {'message': '404 Error'}, 404
    
    business = Business.query.get_or_404(business_id)
    business_json = business.to_dict()
    # add image to one business
    images_by_business_id = Image.query.filter(Image.business_id == business_id).all()
    images_by_business_id_json = [image.to_dict() for image in images_by_business_id]
    business_json['image'] = images_by_business_id_json ## add image list to business
    business_json['countReview'] = len(business.reviews)

    if business.reviews:

        total = 0
        for review in business.reviews:
            total = total + review.stars

        avgRating = round(total / len(business.reviews), 2)
        business_json['avgRating'] = avgRating
    else:
        business_json['avgRating'] = 0

    return {"business": business_json}


# Get all business of the Current User
@business_routes.route("/current")
@login_required
def get_current_businesses():
    current_business = Business.query.filter(Business.owner_id == current_user.id).all()
    
    if not current_business:
        return {"message": "You don't have any business", "statusCode": 404}

    
    current_business_json = [business.to_dict() for business in current_business]
    
    return {"current_business": current_business_json}
    

#Create a new business
@business_routes.route("new_business", methods=["POST"])
@login_required
def create_new_business():
    form = BusinessForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_business = Business(
            owner_id=current_user.id,
            phone=form.data['phone'],
            address=form.data['address'],
            name=form.data['name'],
            description=form.data['description'],
            price_range=form.data['price_range'],
            preview_img=form.data['preview_img'],
            # city=form.data['city'],
            # state=form.data['state'],
            # country=form.data['country'],
            # zipcode=form.data['zipcode'],
            # lat=form.data['lat'],
            # lng=form.data['lng'],
        )
        db.session.add(new_business)
        db.session.commit()

        return new_business.to_dict()

    else:
        return jsonify(form.errors)


#Edit a business
@business_routes.route("/<int:business_id>", methods=["PUT"])
@login_required
def edit_business(business_id):
    form = BusinessForm()
    business = Business.query.get_or_404(business_id)

    if current_user.id != business.owner_id:
        return {"message": "You don't have authorization to update", "statusCode": 403}

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        
        business.phone=form.data['phone']
        business.address=form.data['address']
        business.name=form.data['name']
        business.description=form.data['description']
        business.price_range=form.data['price_range']
        business.preview_img=form.data['preview_img']
        business.phone=form.data['phone']
        # business.city=form.data['city'],
        # business.state=form.data['state'],
        # business.country=form.data['country'],
        # business.zipcode=form.data['zipcode'],
        # business.lat=form.data['lat'],
        # business.lng=form.data['lng'],
        
      
        db.session.commit()

        return business.to_dict()

    else:
        return jsonify(form.errors)



# Delete Business
@business_routes.route("/<int:business_id>", methods=["DELETE"])
@login_required
def delete_business(business_id):

    business = Business.query.get_or_404(business_id)

    if current_user.id == business.owner_id:
        db.session.delete(business)
        db.session.commit()
        return {'message': 'Successfully deleted'}
    else:
        return {'message': 'Unauthorized user', "statusCode": 403}



#Create a new review by business ID
@business_routes.route("/<business_id>/reviews", methods=["POST"])
@login_required
def create_new_review(business_id):
    form = ReviewForm()

    try:
        business_id = int(business_id) 
    except:
        return {'message': '404 Error'} 
        
    business = Business.query.get_or_404(business_id)
  
    
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_review = Review(
            user_id=current_user.id,
            business_id=business.id,
            review=form.data['review'],
            stars=form.data['stars'],
            review_img=form.data['review_img']
        )
        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict()

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# get all review for business id
@business_routes.route('/<int:business_id>/all_review')
# @login_required
def get_all_business_review(business_id):
    all_review_by_business_id = Review.query.filter(Review.business_id == business_id).all()
    all_review_by_business_id_json = [review.to_dict() for review in all_review_by_business_id]
    
    for review in all_review_by_business_id_json:
        images_by_business_id = Image.query.filter(Image.business_id == business_id).all()
        images_json = [image.to_dict() for image in images_by_business_id]
        review['image']= images_json

    
    return {"reviews": all_review_by_business_id_json}



# add image to AWS S3 bucket, return url to image
@business_routes.route('/upload', methods=['POST'])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]
   
    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)
    
    upload = upload_file_to_s3(image)
   
    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400
    url = upload["url"]
    return {"url": url}
