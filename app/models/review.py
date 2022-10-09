from .db import db
from sqlalchemy.sql import func



class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    review = db.Column(db.String(1000), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    review_img = db.Column(db.String(500))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())




    user = db.relationship("User", back_populates="reviews")

    business = db.relationship('Business', back_populates='reviews')
    
    images = db.relationship("Image", back_populates='review')



    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "business_id": self.business_id,
            "review": self.review,
            "stars": self.stars,
            "review_img":self.review_img,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "user": self.user.to_dict(),
            "business_name": self.business.name
        }