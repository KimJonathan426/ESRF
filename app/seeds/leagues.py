from app.models import db, League

def seed_leagues():
    jadel = League(
        owner_id=1,
        league_name='J.A.D.E.L. (Jade League)',
        league_image='https://esrf.s3.amazonaws.com/Demo-League-Logo.jpg',
        team_limit=6,
        team_player_limit=5,
        start_date='15/Aug/2022 11:00',
        start_time='11:00'
    )

    nba_finals_2028 = League(
        owner_id=2,
        league_name='2028 Warriors vs Cavs NBA Finals',
        league_image='https://esrf.s3.amazonaws.com/Demo-League-Logo.jpg',
        team_limit=2,
        team_player_limit=5,
        start_date='15/Aug/2022 11:00',
        start_time='11:00'
    )

    db.session.add(jadel)
    db.session.add(nba_finals_2028)

    db.session.commit()


def undo_leagues():
    db.session.execute('TRUNCATE leagues RESTART IDENTITY CASCADE;')
    db.session.commit()
