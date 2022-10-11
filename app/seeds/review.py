
from app.models import db, Review

# Adds demo reviews, you can add other posts here if you want
def seed_reviews():
    review1 = Review(
        review="Wow this palce is so DELICIOUS! Staff is great and food is great!!!",
        stars=4,
        user_id=2,
        business_id=1
    )
    review2 = Review(
        review="One of my fav lunch places in LA. And the best restaurant around this area.",
        stars=4,
        user_id=3,
        business_id=1
    )
    review3 = Review(
        review="This is the best of east meets west. And I love how they update their menu with yummy specials.",
        stars=5,
        user_id=3,
        business_id=2
    )
    review4 = Review(
        review="The food reminds me of home cooked meals in the best way, with super wholesome and local ingredients.",
        stars=4,
        user_id=4,
        business_id=2
    )
    review5 = Review(
        review="This place is sux...I will not go next time!!!!!",
        stars=1,
        user_id=4,
        business_id=3
    )
    review6 = Review(
        review="What kind of sauce was on it? so disgusting.....",
        stars=2,
        user_id=5,
        business_id=3
    )
    review7 = Review(
        review="I really love this place!!!",
        stars=5,
        user_id=5,
        business_id=4
    )
    review8 = Review(
        review="Their food are so fresh, I will come back in the future.",
        stars=5,
        user_id=6,
        business_id=4
    )
    review9 = Review(
        review="This place is the worst place I have ever try....",
        stars=1,
        user_id=6,
        business_id=5
    )
    review10 = Review(
        review="This restautrant's waiters are so rude, I don't own you money!!!",
        stars=1,
        user_id=7,
        business_id=5
    )
    review11 = Review(
        review="Save your money. Don't come to this place.",
        stars=2,
        user_id=7,
        business_id=6
    )
    review12 = Review(
        review="I hate this place!!! The food is like trash!!!",
        stars=1,
        user_id=8,
        business_id=6
    )
    review13 = Review(
        review="I will back next time!",
        stars=4,
        user_id=2,
        business_id=7
    )
    review14 = Review(
        review="It's ok for the price range.",
        stars=3,
        user_id=3,
        business_id=8
    )
    review15 = Review(
        review="just fine their food.",
        stars=3,
        user_id=5,
        business_id=9
    )
    review16 = Review(
        review="It's ok for the price range",
        stars=3,
        user_id=8,
        business_id=9
    )
    review17 = Review(
        review="Maybe I will come next time, it's ok for the taste.",
        stars=3,
        user_id=2,
        business_id=10
    )
    review18 = Review(
        review="If your looking for a place for good BBQ then Domestic is the place to go.",
        stars=3,
        user_id=9,
        business_id=10
    )
    review19 = Review(
        review="We finally got a chance to order some lunch this week and the food was not how it usually is. I got dry meat and my sammy was a mess.",
        stars=1,
        user_id=2,
        business_id=11
    )
    review20 = Review(
        review="It's fine for the price, but I prob won't go often.",
        stars=2,
        user_id=3,
        business_id=12
    )
    review21 = Review(
        review="The atmosphere is indie and cool.",
        stars=4,
        user_id=5,
        business_id=13
    )
    review22 = Review(
        review="Best barbecue food , and fast service . Its really cute spot , and you gotta check it out.",
        stars=5,
        user_id=8,
        business_id=14
    )
    review23 = Review(
        review="I've been really wanting to try this place and it didn't blow my mind. The food was just okay",
        stars=3,
        user_id=1,
        business_id=14
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
    db.session.add(review16)
    db.session.add(review17)
    db.session.add(review18)
    db.session.add(review19)
    db.session.add(review20)
    db.session.add(review21)
    db.session.add(review22)
    db.session.add(review23)

    db.session.commit()



# Uses a raw SQL query to TRUNCATE the reviews table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()