from app.models import db, Business



def seed_business():
    business1 = Business(
        owner_id = 1,
        phone = "(323)111-1111",
        address = "111 Main Street",
        city = "Santa Ana",
        state = "CA",
        zipcode = 92701,
        country = "USA",
        lat = 37.7645358,
        lng = -122.4730327,
        name = "Restaurant #1",
        description = "Restaurant #1",
        price_range = "$$", 
        preview_img="https://www.f13design.com/wp-content/uploads/2018/09/Pho-Restaurant-2.jpg",
        
    )
    business2 = Business(
        owner_id = 2,
        phone = "(909)222-2222",
        address = "222 Main Street",
        city = "Santa Ana",
        state = "CA",
        zipcode = 92701,
        lat = 37.7645358,
        lng = -122.4730327,
        name = "Restaurant #2",
        description = "Restaurant #2",
        price_range = "$", 
        preview_img="https://i.pinimg.com/originals/b8/d7/78/b8d77820b71296821ad5ff50a5135bbf.jpg",
    )
    business3 = Business(
        owner_id = 3,
        phone = "(909)333-3333",
        address = "333 Main Street",
        city = "Huntington Beach",
        state = "CA",
        zipcode = 92648,
        country = "USA",
        lat = 37.7645358,
        lng = -122.4730327,
        name = "Restaurant #1",
        description = "Restaurant #1",
        price_range = "$", 
        preview_img="https://silversmithsrestaurant.co.uk/wp-content/uploads/2020/03/IMG_1343-2-min-scaled.jpg",
    )
    business4 = Business(
        owner_id = 4,
        phone = "(797)444-4444",
        address = "444 Main Street",
        city = "Huntington Beach",
        state = "CA",
        zipcode = 92648,
        country = "USA",
        lat = 37.7645358,
        lng = -122.4730327,
        name = "Restaurant #4",
        description = "Restaurant #4",
        price_range = "$", 
        preview_img="http://www.trussvilletribune.com/wp-content/uploads/2018/06/DSC_0439.jpg",
    )
    business5 = Business(
        owner_id = 5,
        phone = "(626)555-5555",
        address = "555 Main Street",
        city = "Huntington Beach",
        state = "CA",
        zipcode = 92648,
        country = "USA",
        lat = 37.7645358,
        lng = -122.4730327,
        name = "Restaurant #5",
        description = "Restaurant #5",
        price_range = "$$", 
        preview_img="https://s.inyourpocket.com/gallery/256165.jpg",
    )
    business6 = Business(
        owner_id = 6,
        phone = "(310)666-6666",
        address = "666 Main Street",
        city = "Huntington Beach",
        state = "CA",
        zipcode = 92648,
        country = "USA",
        lat = 37.7645358,
        lng = -122.4730327,
        name = "Restaurant #6",
        description = "Restaurant #6",
        price_range = "$$$", 
        preview_img="http://www.hoteljalta.com/files-sbbasic/sr_hoteljalta_com/hotel-jalta-praha-dining-01.jpg",
    )
    business7 = Business(
        owner_id = 7,
        phone = "(310)777-7777",
        address = "777 Main St",
        city = "Fort Worth",
        state = "TX",
        zipcode = 76102,
        country = "USA",
        lat = 37.7645358,
        lng = -122.4730327,
        name = "Restaurant #7",
        description = "Restaurant #7",
        price_range = "$$$$", 
        preview_img="https://www.caymangoodtaste.com/assets/images/GoHOCT18-12-1-20200925151550.jpg",
    )


    business8 = Business(
        owner_id = 8,
        phone = "(626)888-8888",
        address = "888 N Main Street",
        city = "Los Angeles",
        state = "CA",
        zipcode = 92701,
        country = "USA",
        lat = 37.7645358,
        lng = -122.4730327,
        name = "Restaurant #8",
        description = "Restaurant #8",
        price_range = "$",
        preview_img="https://worldbranddesign.com/wp-content/uploads/2020/11/820.jpg"
    )
    business9 = Business(
        owner_id = 9,
        phone = "(909)999-9999",
        address = "999 Main Street",
        city = "Watsonville",
        state = "CA",
        zipcode = 95076,
        country = "USA",
        lat = 37.7645358,
        lng = -122.4730327,
        name = "Restaurant #9",
        description = "Restaurant #9",
        price_range = "$$$$", 
        preview_img="https://www.timeoutbahrain.com/public/images/2020/01/26/Japanese-Peruvian-restaurant-opens-in-Adliya-Clay5.jpg",
    )
    business10 = Business(
        owner_id = 10,
        phone = "(626)000-0000",
        address = "1000 Main Street",
        city = "Watsonville",
        state = "CA",
        zipcode = 95076,
        country = "USA",
        lat = 37.7645358,
        lng = -122.4730327,
        name = "Restaurant #10",
        description = "Restaurant #10",
        price_range = "$$", 
        preview_img="https://jooinn.com/images/interior-design-restaurant-2.jpg",
    )
    

    
    db.session.add(business1)
    db.session.add(business2)
    db.session.add(business3)
    db.session.add(business4)
    db.session.add(business5)
    db.session.add(business6)
    db.session.add(business7)
    db.session.add(business8)
    db.session.add(business9)
    db.session.add(business10)

    db.session.commit()



    
# Uses a raw SQL query to TRUNCATE the posts table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
