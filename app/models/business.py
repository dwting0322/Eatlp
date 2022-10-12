from .db import db
from sqlalchemy.sql import func


class Business(db.Model):
    __tablename__ = 'businesses'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    # city = db.Column(db.String(50), nullable=False)
    # state = db.Column(db.String(50), nullable=False)
    # country = db.Column(db.String(50), nullable=False)
    # zipcode = db.Column(db.String(5), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    price_range = db.Column(db.String(4), nullable=False)
    preview_img = db.Column(db.String(500), default='https://s3-media0.fl.yelpcdn.com/assets/public/contentful_header_placeholder.yji-c726a4032894dcf91b72.png')
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())


    user = db.relationship("User", back_populates="businesses")

    


    reviews = db.relationship("Review", back_populates='business', cascade="all, delete-orphan")

    images = db.relationship("Image", back_populates='business', cascade="all, delete-orphan")
    


    def business_likes_count(self):
        return len(self.likes)


    def to_dict(self):

        return {
            "id" : self.id,
            "ownerId" : self.owner_id,
            "name" : self.name,
            "phone" : self.phone,
            "address" : self.address,
            # "city" : self.city,
            # "state" : self.state,
            # "country" : self.country,
            # "zipcode" : self.zipcode,
            "lat" : self.lat,
            "lng" : self.lng,
            "description" : self.description,
            "price_range" : self.price_range,
            "preview_img" : self.preview_img,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "user": self.user.to_dict(),
            "reviews": [c.to_dict() for c in self.reviews]
        }