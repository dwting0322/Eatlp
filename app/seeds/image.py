from app.models import db, Image


def seed_images():
    image1 = Image(
        url = "https://cdn.lifestyleasia.com/wp-content/uploads/sites/3/2020/12/17161236/likemeat-f96pzsJZpcs-unsplash-scaled.jpg",
        user_id = 1,
        business_id = 1,
        comment_id = 1
    )
    image2 = Image(
        url = "https://s3-media0.fl.yelpcdn.com/bphoto/Roj6QcWeG0VW2B1-Ny5HVw/o.jpg",
        user_id = 2,
        business_id = 2,
        comment_id = 2
    )
    image3 = Image(
        url = "https://s.inyourpocket.com/gallery/pisa/2020/02/271514.jpg",
        user_id = 3,
        business_id = 3,
        comment_id = 3
    )
    image4 = Image(
        url = "https://img1.mashed.com/img/gallery/the-oldest-fast-food-chain-in-the-us-might-surprise-you/l-intro-1615688999.jpg",
        user_id = 4,
        business_id = 4,
        comment_id = 4
    )
    image5 = Image(
        url = "https://www.adrianharrison.com.au/wp-content/uploads/2018/09/enticing-steak-sandwich-photography.jpg",
        user_id = 5,
        business_id = 5,
        comment_id = 5
    )
    

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.commit()




# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
