from flask_wtf import FlaskForm
from wtforms import validators
from wtforms import StringField
from wtforms.validators import DataRequired, NumberRange, url, Email, ValidationError
from wtforms.fields import (BooleanField, FloatField, SelectField, DateField, StringField, PasswordField, SubmitField, TextAreaField, TimeField, IntegerField, TextAreaField)
from app.models import Comment

class CommentForm(FlaskForm):
    comment = TextAreaField("Comment", validators=[DataRequired(),
        validators.Length( min=5, max=1000, message='Comment must be between 5 and 1000 characters')])
    stars = IntegerField('Stars rating', validators=[DataRequired(), 
        NumberRange(min=1, max=5, message="Stars rating must be between 1 and 5")])