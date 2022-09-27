from .db import db
from sqlalchemy.sql import func

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    url = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'))
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
    
    

    user = db.relationship('User', back_populates='images')

    business = db.relationship('Business', back_populates='images')

    comment = db.relationship('Comment', back_populates='images')



    def to_dict(self):
        return {
            "id": self.id,
            "url": self.url,
            "user_id": self.user_id,
            "business_id": self.business_id,
            "comment_id": self.comment_id,
            "user": self.user.to_dict()
        }