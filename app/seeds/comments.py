from app.models import db, Comment


# Adds demo comments, you can add other posts here if you want
def seed_comments():
    comment1 = Comment(
        comment="Wow this palce looked so tasty!",
        stars=4,
        user_id=1,
        business_id=1
    )
    comment2 = Comment(
        comment="Wish I could try that...look so good",
        stars=4,
        user_id=3,
        business_id=3
    )
    comment3 = Comment(
        comment="Yummy!",
        stars=5,
        user_id=5,
        business_id=5
    )
    comment4 = Comment(
        comment="So many fish, I love it!",
        stars=4,
        user_id=7,
        business_id=7
    )
    comment5 = Comment(
        comment="This place is sux...",
        stars=1,
        user_id=9,
        business_id=9
    )
    comment6 = Comment(
        comment="What kind of sauce was on it? so disgusting",
        stars=2,
        user_id=1,
        business_id=1
    )
    comment7 = Comment(
        comment="I really love this place!!!",
        stars=5,
        user_id=2,
        business_id=2
    )
    comment8 = Comment(
        comment="Their food are so fresh, I will come back in the future",
        stars=5,
        user_id=3,
        business_id=3
    )
    comment9 = Comment(
        comment="This place is the worst place I have ever try....",
        stars=1,
        user_id=4,
        business_id=4
    )
    comment10 = Comment(
        comment="This restautrant's waiters are so rude, I don't own you money!!! ",
        stars=1,
        user_id=5,
        business_id=5
    )
    comment11 = Comment(
        comment="Save your money",
        stars=2,
        user_id=6,
        business_id=6
    )
    comment12 = Comment(
        comment="I hate this place!!! so trash!!",
        stars=1,
        user_id=7,
        business_id=7
    )
    comment13 = Comment(
        comment="I will back next time!",
        stars=4,
        user_id=8,
        business_id=8
    )
    comment14 = Comment(
        comment="It's ok for the price range",
        stars=3,
        user_id=9,
        business_id=9
    )
    comment15 = Comment(
        comment="just fine their food",
        stars=3,
        user_id=10,
        business_id=10
    )


    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)
    db.session.add(comment15)

    db.session.commit()



# Uses a raw SQL query to TRUNCATE the comments table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()