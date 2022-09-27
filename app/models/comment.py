from .db import db
from sqlalchemy.sql import func



class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    comment = db.Column(db.String(1000), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())




    user = db.relationship("User", back_populates="comments")

    business = db.relationship('Business', back_populates='comments')
    
    images = db.relationship("Image", back_populates='comment')



    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "business_id": self.business_id,
            "comment": self.comment,
            "stars": self.stars,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "user": self.user.to_dict()
        }