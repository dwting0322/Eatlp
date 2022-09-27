from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, url
from app.models import User
from wtforms import validators


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')



class SignUpForm(FlaskForm):
    firstName = StringField('First name', validators=[DataRequired(),
        validators.Length(min=1, max=50, message="First name must be between 1 - 50 characters")])
    
    lastName = StringField('Last name', validators=[DataRequired(),
        validators.Length(min=1, max=50, message="Last name must be between 1 - 50 characters")])
    # username = StringField(
    #     'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, Email()])
    
    password = StringField('password', validators=[DataRequired(),
        validators.Length(min=6, max=60, message="Password must be between 6 - 60 characters")])