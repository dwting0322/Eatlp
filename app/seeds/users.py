from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io', 
        password='password', 
        first_name='Demo',
        last_name='Demo',
        bio='I am the Demo User!',
        gender='Robot',
        profile_img='https://www.nicepng.com/png/detail/280-2800064_fisherman-cartoon-download-pokemon-bulbasaur.png'
        
        )
    marnie = User(
        email='marnie@aa.io', 
        password='password', 
        first_name='Marnie',
        last_name='Lara',
        bio='Marnie the Marine Biologist!',
        gender='Female',
        profile_img='https://staticc.sportskeeda.com/editor/2022/06/25cd1-16557699256455.png'

        )
    goku = User(
        email='goku@aa.io', 
        password='password', 
        first_name='Goku',
        last_name='Sun',
        bio='I am Super Saiyan!',
        gender='Male',
        profile_img='https://comisoku.com/wp-content/uploads/2020/12/20201207183158.jpg'
       
        )
    fred = User(
        email='fred@aa.io', 
        password='password', 
        first_name='Fred',
        last_name='Flintstone',
        bio='The real Fred Flinstone!',
        gender='Male',
        profile_img='https://img.3dmgame.com/uploads/images/news/20200721/1595316080_479085.jpg'
     
        )
    kangaskhan = User(
        email='kangaskhan@aa.io', 
        password='password', 
        first_name='Kangaskhan',
        last_name='Wang',
        bio='I am a Pokemon!',
        gender='Male',
        profile_img='https://cdnb.artstation.com/p/assets/images/images/020/071/433/large/joshua-carreras-marge-simpson-posted-to-x.jpg?1566245506'
       
        )
    maggie = User(
        email='maggie@aa.io', 
        password='password', 
        first_name='Maggie',
        last_name='Cute',
        bio='I am Baby!',
        gender='Female',
        profile_img='https://images.ctfassets.net/1nzw6mpfcddc/1AtTtUhO9h5eTH6iwBDvj8/f50694c249a8409a0a024095a170ee8f/MaggieSimpson1.gif'
       
        )
    kevin = User(
        email='kevin@aa.io', 
        password='password', 
        first_name='Kevin',
        last_name='Love',
        bio='I am Kevin!',
        gender='Male',
        profile_img='http://5b0988e595225.cdn.sohucs.com/images/20171101/be517c1f54d84181b270fd7833478547.jpeg'
        
        )
    pikachu = User(
        email='pikachu@aa.io', 
        password='password', 
        first_name='Pikachu',
        last_name='Pika Pika',
        bio='Pika Pika!',
        gender='Male',
        profile_img='https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-blue-version/8/89/Pikachu.jpg'
        
        )
    carol = User(
        email='carol@aa.io', 
        password='password', 
        first_name='Carol',
        last_name='Alila',
        bio='I am Carol!',
        gender='Female',
        profile_img='https://cdn2.ettoday.net/images/2071/2071134.jpg'
        
        )
    dragon = User(
        email='dragon@aa.io', 
        password='password', 
        first_name='Dragon',
        last_name='Ting',
        bio='I am on fire!',
        gender='Male',
        profile_img='https://assets.pokemon.com/assets/cms2/img/pokedex/full/149.png'
        
        )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(goku)
    db.session.add(fred)
    db.session.add(kangaskhan)
    db.session.add(maggie)
    db.session.add(kevin)
    db.session.add(pikachu)
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
