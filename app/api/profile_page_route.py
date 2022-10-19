from flask import Blueprint, request
from app.models import db, User, Business
from app.forms.edit_profile_form import editProfileForm
from flask_login import login_required, current_user


profile_route = Blueprint('profile', __name__)


#GET PROFILE
@profile_route.route('/<int:userId>')
def profile_page(userId):
  user_profile = User.query.get_or_404(userId)
 
  profile = user_profile.to_dict()

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
  
  userprofile = User.query.get_or_404(userId)
 
  if not userprofile:
    return {'message': 'Profile does not exist', "statusCode": 404}, 404

  if userId != current_user.id:
    return {'message': "You don't have authorization to update", "statusCode": 403}, 403
  
  editForm['csrf_token'].data = request.cookies['csrf_token']
  
  # if editForm.validate_on_submit():
    
  if userId == current_user.id:
      userprofile.first_name = editForm.data['first_name']
      userprofile.last_name = editForm.data['last_name']
      userprofile.bio = editForm.data['bio']
      userprofile.gender = editForm.data['gender']
      userprofile.profile_img = editForm.data['profile_img']

      db.session.commit()
      return userprofile.to_dict()
  