from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@email.com', password='password')
    jontan = User(
        username='Jontan', email='Jontan@gmail.com', password='password')
    abel = User(
        username='abeltesfa', email='abeltesfa@hotmail.com', password='password')
    eddie = User(
        username='labbit', email='LiveLaoLove@email.com', password='password')
    david = User(
        username='dvchung00', email='dvchung@yahoo.com', password='password')
    lynn = User(
        username='lynnsanity', email='lynning@aol.com', password='password')


    db.session.add(demo)
    db.session.add(jontan)
    db.session.add(abel)
    db.session.add(eddie)
    db.session.add(david)
    db.session.add(lynn)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
