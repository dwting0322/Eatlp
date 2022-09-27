from flask_wtf import FlaskForm
from wtforms import validators
from wtforms import StringField
from wtforms.validators import DataRequired, NumberRange, url, Email, ValidationError
from wtforms.fields import (BooleanField, FloatField, SelectField, DateField, StringField, PasswordField, SubmitField, TextAreaField, TimeField, IntegerField, TextAreaField)
from app.models import image

def urlCheck(form,field):
    imageUrl = field.data
    if  ("jpg" or "png" or "jpeg" or "gif") not in imageUrl:
        raise ValidationError("URL must be a jpg, jpeg, png , or gif")

class ImageForm(FlaskForm):
    url = StringField("Url", validators=[DataRequired(), url(), urlCheck,
        validators.Length(max=500, message="Url must be less than 500 characters")])

    