from app.models import db, Team, Player

def seed_teams_and_players():
    league1_team1 = Team(
        league_id=1,
        team_owner_id=1,
        team_name="Demo Extremos",
        team_abre='DEMO',
        team_image='https://esrf.s3.amazonaws.com/Team-Demo.png'
    )
    league1_team2 = Team(
        league_id=1,
        team_owner_id=2,
        team_name="Giannis Jontantetokounmpo",
        team_abre='GiJo',
        team_image='https://esrf.s3.amazonaws.com/Team-Jontantetokounmpo.jpg'
    )
    league1_team3 = Team(
        league_id=1,
        team_owner_id=3,
        team_name="LeGOAT",
        team_abre='BRON',
        team_image='https://esrf.s3.amazonaws.com/Team-LeGOAT.png'
    )
    league1_team4 = Team(
        league_id=1,
        team_owner_id=4,
        team_name="Inspirational Labbits",
        team_abre='STEF',
        team_image='https://esrf.s3.amazonaws.com/Team-Labbit.jpg'
    )
    league1_team5 = Team(
        league_id=1,
        team_owner_id=5,
        team_name="Chungstas",
        team_abre='LUKA',
        team_image='https://esrf.s3.amazonaws.com/Team-Chungstas.PNG'
    )
    league1_team6 = Team(
        league_id=1,
        team_owner_id=6,
        team_name="Lynnsanity",
        team_abre='LIN',
        team_image='https://esrf.s3.amazonaws.com/Team-Lynnsanity.png'
    )

    league2_team1 = Team(
        league_id=2,
        team_owner_id=4,
        team_name="2028 Warriors",
        team_abre='GS',
        team_image='https://esrf.s3.amazonaws.com/Team-Golden-State.jpg'
    )
    league2_team2 = Team(
        league_id=2,
        team_owner_id=1,
        team_name="2028 Cavaliers",
        team_abre='Cle',
        team_image='https://esrf.s3.amazonaws.com/Team-Cleveland.jpg'
    )

    db.session.add(league1_team1)
    db.session.add(league1_team2)
    db.session.add(league1_team3)
    db.session.add(league1_team4)
    db.session.add(league1_team5)
    db.session.add(league1_team6)
    db.session.add(league2_team1)
    db.session.add(league2_team2)

    db.session.commit()

def undo_teams_and_players():
    db.session.execute('TRUNCATE teams RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE players RESTART IDENTITY CASCADE;')
    db.session.commit()
