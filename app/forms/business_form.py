from flask_wtf import FlaskForm
from wtforms import validators
from wtforms import StringField
from wtforms.validators import DataRequired, NumberRange, url, Email, ValidationError
from wtforms.fields import (BooleanField, FloatField, SelectField, DateField, StringField, PasswordField, SubmitField, TextAreaField, TimeField, IntegerField, TextAreaField)
from app.models import Business


def check_preview_img(form, field):
    if not form.preview_img.data:
        form.preview_img.data = 'https://s3-media0.fl.yelpcdn.com/assets/public/contentful_header_placeholder.yji-c726a4032894dcf91b72.png'
        return 


class PostForm(FlaskForm):

    phone = StringField('Phone number', validators=[DataRequired(), 
        validators.Length(min=10, max=15, message="Phone must be between 10 - 15 characters")])

    address = StringField("Address", validators=[DataRequired(),
        validators.Length(min=5, max=255, message="Address must be between 5 - 255 characters")])

    city = StringField("City", validators=[DataRequired(),
        validators.Length(min=2, max=50, message="City must be between 2 - 50 characters")])

    state = StringField("State", validators=[DataRequired(),
        validators.Length(min=2, max=50, message="State must be between 2 - 50 characters")])
    
    country = StringField('Country', validators=[DataRequired(),
        validators.Length(min=2, max=50, message="Country must be between 2 - 50 characters")])

    zipcode = StringField('Zip code', validators=[DataRequired(),
        validators.Length(min=5, max=5, message="Zipcode must be 5 characters")])

    lat = FloatField("Latitude", validators=[DataRequired(), 
        NumberRange(min=-90, max=90, message="Latitude must be between -90 to 90")])
    
    lng = FloatField("Longitude", validators=[DataRequired(), 
        NumberRange(min=-180, max=180, message="Longitude must be between -180 to 180")])

    name = StringField("Name", validators=[DataRequired(), 
        validators.Length(min=4, max=50, message="Name must be between 4 - 50 characters")])

    description = StringField('Description', validators=[DataRequired(),
        validators.Length(min=1, max=500, message="Description must be between 1 - 500 characters")])

    price_range = StringField("Price range", validators=[DataRequired(), 
        validators.Length(min=1, max=4, message="Price range must be between $ - $$$$")])

    preview_img = StringField("Preview image", validators=[DataRequired(), check_preview_img,
        validators.Length(max=500, message="Preview image must be less than 500 characters")])