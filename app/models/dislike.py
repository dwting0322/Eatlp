from .db import db


dislikes = db.Table(
    'dislikes',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('business_id', db.Integer, db.ForeignKey('businesses.id'), primary_key=True)
)