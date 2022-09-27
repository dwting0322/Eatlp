from flask_wtf import FlaskForm
from wtforms import validators
from wtforms import StringField
from wtforms.validators import DataRequired, NumberRange, url, Email, ValidationError
from wtforms.fields import (BooleanField, FloatField, SelectField, DateField, StringField, PasswordField, SubmitField, TextAreaField, TimeField, IntegerField, TextAreaField)
from app.models import image



class ImageForm(FlaskForm):
    url = StringField("Url", validators=[DataRequired(), url(),
        validators.Length(max=500, message="Url must be less than 500 characters")])

    