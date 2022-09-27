from .db import db

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    url = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'))
    

    user = db.relationship('User', back_populates='images')

    business = db.relationship('Business', back_populates='images')

    comment = db.relationship('Comment', back_populates='images')


    
    def to_dict(self):
        return {
            "id": self.id,
            "url": self.url,
            "user_id": self.user_id,
            "comment_id": self.comment_id,
            "business_id": self.business_id
        }