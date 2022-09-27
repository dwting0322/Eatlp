from .db import db


likes = db.Table(
    'likes',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('business_id', db.Integer, db.ForeignKey('businesses.id'), primary_key=True)
)