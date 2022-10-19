from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .like import likes

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    bio = db.Column(db.String(500))
    gender = db.Column(db.String(50))
    # username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_img = db.Column(db.String(500), default='https://s3-media0.fl.yelpcdn.com/photo/u_4AtMdPnNBQgn5fWEyTnw/ss.jpg')
    


    businesses = db.relationship('Business', back_populates="user", cascade="all, delete-orphan")

    reviews = db.relationship("Review", back_populates='user', cascade="all, delete-orphan")

    liked_reviews = db.relationship('Review', secondary=likes, back_populates='likes')

    images = db.relationship('Image', back_populates='user', cascade="all, delete-orphan")


    @property
    def password(self):
        return self.hashed_password


    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)


    def check_password(self, password):
        return check_password_hash(self.password, password)


    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            # 'username': self.username,
            'bio': self.bio,
            'gender': self.gender,
            'email': self.email,
            'profile_img': self.profile_img,
        }
