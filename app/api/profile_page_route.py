from flask import Blueprint, request
from app.models import db, User, Business
from app.forms.edit_profile_form import editProfileForm
from flask_login import login_required, current_user


profile_route = Blueprint('profile', __name__)


#GET PROFILE
@profile_route.route('/<int:userId>')
def profile_page(userId):
  userprofile = User.query.get(userId)
  profile = [userprofile.to_dict()]
  allbusinesses = Business.query.filter(Business.owner_id == userId).all()
  businesses = [business.to_dict() for business in allbusinesses]
  res = {
    'profile': profile,
    'businesses': businesses
  }
  return res


#EDIT PROFILE
@profile_route.route('/edit/<int:userId>', methods=['PUT'])
@login_required
def edit_profile(userId):
  editForm = editProfileForm()
  editForm['csrf_token'].data = request.cookies['csrf_token']
  userprofile = User.query.get_or_404(userId)
  # Double check if profile exist / throws 404
  if not userprofile:
    return {'message': 'Profile does not exist', "statusCode": 404}
  #check if logged in user is profile owner / throw 403
  if userId == current_user.id:
    first_name = editForm.data['first_name']
    last_name = editForm.data['last_name']
    bio = editForm.data['bio']
    gender = editForm.data['gender']
    profile_img = editForm.data['profile_img']

    userprofile.first_name = first_name
    userprofile.last_name = last_name
    userprofile.bio = bio
    userprofile.gender = gender
    userprofile.profile_img = profile_img

    db.session.commit()
    return userprofile.to_dict()
  else:
    return {'message': "You don't have authorization to update", "statusCode": 403}