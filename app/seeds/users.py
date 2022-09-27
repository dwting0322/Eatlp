from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io', 
        password='password', 
        first_name='Demo',
        last_name='Demo',
        profile_img='https://cdnb.artstation.com/p/assets/images/images/020/071/433/large/joshua-carreras-marge-simpson-posted-to-x.jpg?1566245506'
        
        )
    marnie = User(
        email='marnie@aa.io', 
        password='password', 
        first_name='Marnie',
        last_name='Lara',
        profile_img='https://cdnb.artstation.com/p/assets/images/images/020/071/433/large/joshua-carreras-marge-simpson-posted-to-x.jpg?1566245506'

        )
    bobbie = User(
        email='bobbie@aa.io', 
        password='password', 
        first_name='Bobbie',
        last_name='Lee',
        profile_img='https://cdnb.artstation.com/p/assets/images/images/020/071/433/large/joshua-carreras-marge-simpson-posted-to-x.jpg?1566245506'
       
        )
    fred = User(
        email='fred@aa.io', 
        password='password', 
        first_name='Fred',
        last_name='Flintstone',
        profile_img='https://cdnb.artstation.com/p/assets/images/images/020/071/433/large/joshua-carreras-marge-simpson-posted-to-x.jpg?1566245506'
     
        )
    kangaskhan = User(
        email='kangaskhan@aa.io', 
        password='password', 
        first_name='Kangaskhan',
        last_name='Wang',
        profile_img='https://cdnb.artstation.com/p/assets/images/images/020/071/433/large/joshua-carreras-marge-simpson-posted-to-x.jpg?1566245506'
       
        )
    maggie = User(
        email='maggie@aa.io', 
        password='password', 
        first_name='Maggie',
        last_name='Cute',
        profile_img='https://cdnb.artstation.com/p/assets/images/images/020/071/433/large/joshua-carreras-marge-simpson-posted-to-x.jpg?1566245506'
       
        )
    kevin = User(
        email='kevin@aa.io', 
        password='password', 
        first_name='Kevin',
        last_name='Love',
        profile_img='https://cdnb.artstation.com/p/assets/images/images/020/071/433/large/joshua-carreras-marge-simpson-posted-to-x.jpg?1566245506'
        
        )
    jordon = User(
        email='jordon@aa.io', 
        password='password', 
        first_name='Jordon',
        last_name='James',
        profile_img='https://cdnb.artstation.com/p/assets/images/images/020/071/433/large/joshua-carreras-marge-simpson-posted-to-x.jpg?1566245506'
        
        )
    carol = User(
        email='carol@aa.io', 
        password='password', 
        first_name='Carol',
        last_name='Alila',
        profile_img='https://cdnb.artstation.com/p/assets/images/images/020/071/433/large/joshua-carreras-marge-simpson-posted-to-x.jpg?1566245506'
        
        )
    dragon = User(
        email='dragon@aa.io', 
        password='password', 
        first_name='Dragon',
        last_name='Ting',
        profile_img='https://cdnb.artstation.com/p/assets/images/images/020/071/433/large/joshua-carreras-marge-simpson-posted-to-x.jpg?1566245506'
        
        )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(fred)
    db.session.add(kangaskhan)
    db.session.add(maggie)
    db.session.add(kevin)
    db.session.add(jordon)
    db.session.add(carol)
    db.session.add(dragon)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
