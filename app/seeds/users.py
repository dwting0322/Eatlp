from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io', 
        password='password', 
        first_name='Demo',
        last_name='Demo',
        profile_img='https://www.nicepng.com/png/detail/280-2800064_fisherman-cartoon-download-pokemon-bulbasaur.png'
        
        )
    marnie = User(
        email='marnie@aa.io', 
        password='password', 
        first_name='Marnie',
        last_name='Lara',
        profile_img='https://staticc.sportskeeda.com/editor/2022/06/25cd1-16557699256455.png'

        )
    goku = User(
        email='bobbie@aa.io', 
        password='password', 
        first_name='Goku',
        last_name='Son',
        profile_img='https://comisoku.com/wp-content/uploads/2020/12/20201207183158.jpg'
       
        )
    fred = User(
        email='fred@aa.io', 
        password='password', 
        first_name='Fred',
        last_name='Flintstone',
        profile_img='https://img.3dmgame.com/uploads/images/news/20200721/1595316080_479085.jpg'
     
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
        profile_img='https://images.ctfassets.net/1nzw6mpfcddc/1AtTtUhO9h5eTH6iwBDvj8/f50694c249a8409a0a024095a170ee8f/MaggieSimpson1.gif'
       
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
        profile_img='https://img.3dmgame.com/uploads/images/news/20200721/1595316080_479085.jpg'
        
        )
    carol = User(
        email='carol@aa.io', 
        password='password', 
        first_name='Carol',
        last_name='Alila',
        profile_img='https://img.3dmgame.com/uploads/images/news/20191119/1574149623_755993.jpg'
        
        )
    dragon = User(
        email='dragon@aa.io', 
        password='password', 
        first_name='Dragon',
        last_name='Ting',
        profile_img='https://assets.pokemon.com/assets/cms2/img/pokedex/full/149.png'
        
        )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(goku)
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
