
from app.models import db, Review

# Adds demo reviews, you can add other posts here if you want
def seed_reviews():
    review1 = Review(
        review="Wow this palce looked so tasty!",
        stars=4,
        user_id=1,
        business_id=1
    )
    review2 = Review(
        review="Wish I could try that...look so good",
        stars=4,
        user_id=3,
        business_id=3
    )
    review3 = Review(
        review="Yummy!",
        stars=5,
        user_id=5,
        business_id=5
    )
    review4 = Review(
        review="So many fish, I love it!",
        stars=4,
        user_id=7,
        business_id=7
    )
    review5 = Review(
        review="This place is sux...",
        stars=1,
        user_id=9,
        business_id=9
    )
    review6 = Review(
        review="What kind of sauce was on it? so disgusting",
        stars=2,
        user_id=1,
        business_id=1
    )
    review7 = Review(
        review="I really love this place!!!",
        stars=5,
        user_id=2,
        business_id=2
    )
    review8 = Review(
        review="Their food are so fresh, I will come back in the future",
        stars=5,
        user_id=3,
        business_id=3
    )
    review9 = Review(
        review="This place is the worst place I have ever try....",
        stars=1,
        user_id=4,
        business_id=4
    )
    review10 = Review(
        review="This restautrant's waiters are so rude, I don't own you money!!! ",
        stars=1,
        user_id=5,
        business_id=5
    )
    review11 = Review(
        review="Save your money",
        stars=2,
        user_id=6,
        business_id=6
    )
    review12 = Review(
        review="I hate this place!!! so trash!!",
        stars=1,
        user_id=7,
        business_id=7
    )
    review13 = Review(
        review="I will back next time!",
        stars=4,
        user_id=8,
        business_id=8
    )
    review14 = Review(
        review="It's ok for the price range",
        stars=3,
        user_id=9,
        business_id=9
    )
    review15 = Review(
        review="just fine their food",
        stars=3,
        user_id=10,
        business_id=10
    )


    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.add(review11)
    db.session.add(review12)
    db.session.add(review13)
    db.session.add(review14)
    db.session.add(review15)

    db.session.commit()



# Uses a raw SQL query to TRUNCATE the reviews table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()