from app.models import db, Team, Player

def seed_teams_and_players():
    league1_player1 = Player(
        league_id=1,
        player_name='Jiannis Antetokounmpo',
        player_image='https://esrf.s3.amazonaws.com/Player-Jkim.png',
        position='PF',
        team='Budget Bucks',
        bio='Jiannis (#34), a 6\'11" power forward, attended The University of Maryland before joining the big league. \
                Jiannis averaged 34 points, 11.2 assists, 14.9 rebounds, and 11 blocks per game.'
    )

    league1_player2 = Player(
        league_id=1,
        player_name='Abel James',
        player_image='https://esrf.s3.amazonaws.com/Player-Abel.png',
        position='SF',
        team='Riverers',
        bio='Abel (#6), a 6\'9" small forward, displayed his dominance at The University of North Carolina. \
                Abel averaged 66 points, 4.2 assists, 4.4 rebounds, and 16 chase down blocks per game.'
    )

    league1_player3 = Player(
        league_id=1,
        player_name='David Dončić',
        player_image='https://esrf.s3.amazonaws.com/Player-DChung.png',
        position='PG',
        team='Austin Mustangs',
        bio='David (#77), a 6\'7" point guard, came from nowhere and absolutely dominated the game. \
                David averaged 23 points, 32 assists, 2.2 rebounds, and 7 steals per game. He makes John Stockton look average!'
    )

    league1_player4 = Player(
        league_id=1,
        player_name='Stephen Lao',
        player_image='https://esrf.s3.amazonaws.com/Player-Labbit.png',
        position='PG',
        team='Jade City Samurais',
        bio='Stephen (#30), a 6\'2" point guard, put all his haters to sleep. \
                Stephen averaged 90 points, 5 assists, 2.6 rebounds, and 30 three point field goals per game. \
                He is automatic from beyond the arc and has unlimited range.'
    )

    league1_player5 = Player(
        league_id=1,
        player_name='Jeremie Lynn',
        player_image='https://esrf.s3.amazonaws.com/Player-Lynn.PNG',
        position='PG',
        team='New York Knacks',
        bio='Jeremie (#17), a 6\'3" point guard, had a breakout year on the knacks. \
                Jeremie averaged 117 points, 17 assists, 1.7 rebounds, and 1.7 steals per game. \
                He single handedly got fans hyped and brought the New York Knacks back into the spotlight (until Carmelo came back and ruined his mojo).'
    )

    league1_player6 = Player(
        league_id=1,
        player_name='Giannis Antetokounmpo',
        player_image='https://esrf.s3.amazonaws.com/Player-Giannis.PNG',
        position='PF',
        team='Milwaukee Bucks',
        bio='Giannis Sina Ugo Antetokounmpo is a Greek-Nigerian professional basketball player for the Milwaukee Bucks of the National Basketball Association. \
                Antetokounmpo\'s country of origin, in addition to his size, speed, strength, and ball-handling skills have earned him the nickname "Greek Freak".'
    )

    league1_player7 = Player(
        league_id=1,
        player_name='LeBron James',
        player_image='https://esrf.s3.amazonaws.com/Player-Lebron.png',
        position='SF',
        team='LA Lakers',
        bio='LeBron Raymone James Sr. is an American professional basketball player for the Los Angeles Lakers of the National Basketball Association. \
                Nicknamed "King James", he is widely considered one of the greatest players of all time and is often compared to Michael Jordan in debates over the greatest basketball player ever.'
    )

    league1_player8 = Player(
        league_id=1,
        player_name='Luka Dončić',
        player_image='https://esrf.s3.amazonaws.com/Player-Luka.PNG',
        position='PG',
        team='Dallas Mavericks',
        bio='Luka Dončić is a Slovenian professional basketball player for the Dallas Mavericks of the National Basketball Association. \
                He also represents the Slovenian national team. Born in Ljubljana, Dončić shone as a youth player for Union Olimpija before joining the youth academy of Real Madrid.'
    )

    league1_player9 = Player(
        league_id=1,
        player_name='Stephen Curry',
        player_image='https://esrf.s3.amazonaws.com/Player-Steph-Original.png',
        position='PG',
        team='Golden State Warriors',
        bio='Wardell Stephen Curry II is an American professional basketball player for the Golden State Warriors of the National Basketball Association. \
                Widely regarded as one of the greatest basketball players of all time, and as the greatest shooter in NBA history, Curry is credited with \
                    revolutionizing the sport by inspiring teams and players to shoot far more three-point shots.'
    )

    league1_player10 = Player(
        league_id=1,
        player_name='Jeremy Lin',
        player_image='https://esrf.s3.amazonaws.com/Player-Jeremy-Lin.png',
        position='PG',
        team='New York Knicks',
        bio='Jeremy Shu-How Lin is Taiwanese-American professional basketball player who played for a variety of teams in the National Basketball Association. \
                He unexpectedly led a winning turnaround with the New York Knicks of the National Basketball Association (NBA) during the 2011–12 season, generating a cultural phenomenon known as "Linsanity". \
                Lin was the first American of Chinese or Taiwanese descent to play in the NBA, and first Asian American to win an NBA championship.'
    )

    league2_player1 = Player(
        league_id=2,
        player_name='Stephen Curry',
        player_image='https://esrf.s3.amazonaws.com/Player-Steph-Curry.PNG',
        position='PG',
        team='Golden State Warriors',
        bio='For the 14th year in a row in the Warriors vs Cavaliers NBA Finals, Steph Curry is still dominant.'
    )

    league2_player2 = Player(
        league_id=2,
        player_name='Klay Thompson',
        player_image='https://esrf.s3.amazonaws.com/Player-Klay-Thompson.PNG',
        position='SG',
        team='Golden State Warriors',
        bio='For the 14th year in a row in the Warriors vs Cavaliers NBA Finals, Klay Thompson is still considered an essential player as one of the splash bros.'
    )

    league2_player3 = Player(
        league_id=2,
        player_name='Kevin Durant',
        player_image='https://esrf.s3.amazonaws.com/Player-Kevin-Durant.PNG',
        position='SF',
        team='Golden State Warriors',
        bio='For the 14th year in a row in the Warriors vs Cavaliers NBA Finals, Kevin Durant is still basking in all of the super team glory.'
    )

    league2_player4 = Player(
        league_id=2,
        player_name='Ben Simmons',
        player_image='https://esrf.s3.amazonaws.com/Player-Ben-Simmons.PNG',
        position='PF',
        team='Golden State Warriors',
        bio='For the 14th year in a row in the Warriors vs Cavaliers NBA Finals, Ben Simmons is still the rookie of the year with a lot of potential. \
                He has a new found confidence after playing with an all star super team, but still has yet to reach his potential.'
    )

    league2_player5 = Player(
        league_id=2,
        player_name='Anthony Davis',
        player_image='https://esrf.s3.amazonaws.com/Player-Anthony-Davis.PNG',
        position='C',
        team='Golden State Warriors',
        bio='For the 14th year in a row in the Warriors vs Cavaliers NBA Finals, The team welcomes Anthony Davis, a recent addition, to skyrocket their chances at winning the chip.'
    )

    league2_player6 = Player(
        league_id=2,
        player_name='Robo-LeBron',
        player_image='https://esrf.s3.amazonaws.com/Player-Robo-LeBRON.PNG',
        position='PF',
        team='Cleveland LeBrons',
        bio='For the 14th year in a row in the Warriors vs Cavaliers NBA Finals, LeBron James underwent a controversial exoskeleton graft over the off season. \
                He is more machine now than man.'
    )

    league2_player7 = Player(
        league_id=2,
        player_name='LeBron Clone #327',
        player_image='https://esrf.s3.amazonaws.com/Player-LeBRON-Clone327.PNG',
        position='C',
        team='Cleveland LeBrons',
        bio='For the 14th year in a row in the Warriors vs Cavaliers NBA Finals, and after having no real help in years... \
            LeBron has had enough and made a genetically engineered clone of himself, LeBron Clone #327.'
    )

    league2_player8 = Player(
        league_id=2,
        player_name='LeBron Clone #711',
        player_image='https://esrf.s3.amazonaws.com/Player-LeBRON-Clone711.PNG',
        position='SF',
        team='Cleveland LeBrons',
        bio='For the 14th year in a row in the Warriors vs Cavaliers NBA Finals, and after having no real help in years... \
            LeBron has had enough and made a genetically engineered clone of himself, LeBron Clone #711.'
    )

    league2_player9 = Player(
        league_id=2,
        player_name='Bronny James Jr.',
        player_image='https://esrf.s3.amazonaws.com/Player-Bronny-JamesJr.PNG',
        position='PG',
        team='Cleveland LeBrons',
        bio='For the 14th year in a row in the Warriors vs Cavaliers NBA Finals, Bronny James Jr. is now playing alongside his father LeBron James.'
    )

    league2_player10 = Player(
        league_id=2,
        player_name='Kyrie Irving',
        player_image='https://esrf.s3.amazonaws.com/Player-Kyrie-Irving.PNG',
        position='SG',
        team='Cleveland LeBrons',
        bio='For the 14th year in a row in the Warriors vs Cavaliers NBA Finals, Kyrie Irving has embodied his role as Uncle Drew. \
                Unfortunately he has yet to step foot on the court this year and every year before this due to personal reasons.'
    )

    db.session.add(league1_player1)
    db.session.add(league1_player2)
    db.session.add(league1_player3)
    db.session.add(league1_player4)
    db.session.add(league1_player5)
    db.session.add(league1_player6)
    db.session.add(league1_player7)
    db.session.add(league1_player8)
    db.session.add(league1_player9)
    db.session.add(league1_player10)
    db.session.add(league2_player1)
    db.session.add(league2_player2)
    db.session.add(league2_player3)
    db.session.add(league2_player4)
    db.session.add(league2_player5)
    db.session.add(league2_player6)
    db.session.add(league2_player7)
    db.session.add(league2_player8)
    db.session.add(league2_player9)
    db.session.add(league2_player10)

    db.session.commit()


    league1_team1 = Team(
        league_id=1,
        team_owner_id=1,
        team_name="Demo Extremos",
        team_abre='DEMO',
        team_image='https://esrf.s3.amazonaws.com/Team-Demo.png',
        players_on_team=[league1_player1, league1_player2, league1_player3, league1_player4, league1_player5]
    )

    league1_team2 = Team(
        league_id=1,
        team_owner_id=2,
        team_name="Giannis Jontantetokounmpos",
        team_abre='GiJo',
        team_image='https://esrf.s3.amazonaws.com/Team-Jontantetokounmpo.jpg',
        players_on_team=[league1_player1, league1_player2, league1_player6, league1_player7, league1_player10]
    )

    league1_team3 = Team(
        league_id=1,
        team_owner_id=3,
        team_name="LeGOATs",
        team_abre='BRON',
        team_image='https://esrf.s3.amazonaws.com/Team-LeGOAT.png',
        players_on_team=[league1_player2, league1_player4, league1_player7, league1_player9, league1_player10]
    )

    league1_team4 = Team(
        league_id=1,
        team_owner_id=4,
        team_name="Chungstas",
        team_abre='LUKA',
        team_image='https://esrf.s3.amazonaws.com/Team-Chungstas.PNG',
        players_on_team=[league1_player1, league1_player3, league1_player5, league1_player6, league1_player8]
    )

    league1_team5 = Team(
        league_id=1,
        team_owner_id=5,
        team_name="Inspirational Labbits",
        team_abre='STEF',
        team_image='https://esrf.s3.amazonaws.com/Team-Labbit.jpg',
        players_on_team=[league1_player2, league1_player4, league1_player6, league1_player7, league1_player9]
    )

    league1_team6 = Team(
        league_id=1,
        team_owner_id=6,
        team_name="Super Lintendos",
        team_abre='LIN',
        team_image='https://esrf.s3.amazonaws.com/Team-Lynnsanity.png',
        players_on_team=[league1_player3, league1_player5, league1_player8, league1_player9, league1_player10]
    )


    league2_team1 = Team(
        league_id=2,
        team_owner_id=4,
        team_name="2028 Warriors",
        team_abre='GS',
        team_image='https://esrf.s3.amazonaws.com/Team-Golden-State.jpg',
        players_on_team=[league2_player1, league2_player2, league2_player3, league2_player4, league2_player5]
    )

    league2_team2 = Team(
        league_id=2,
        team_owner_id=1,
        team_name="2028 Cavaliers",
        team_abre='Cle',
        team_image='https://esrf.s3.amazonaws.com/Team-Cleveland.jpg',
        players_on_team=[league2_player6, league2_player7, league2_player8, league2_player9, league2_player10]
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

    league1_player1.teams_with_player.append(league1_team1)
    league1_player1.teams_with_player.append(league1_team2)
    league1_player1.teams_with_player.append(league1_team4)

    league1_player2.teams_with_player.append(league1_team1)
    league1_player2.teams_with_player.append(league1_team2)
    league1_player2.teams_with_player.append(league1_team3)
    league1_player2.teams_with_player.append(league1_team5)

    league1_player3.teams_with_player.append(league1_team1)
    league1_player3.teams_with_player.append(league1_team4)
    league1_player3.teams_with_player.append(league1_team6)

    league1_player4.teams_with_player.append(league1_team1)
    league1_player4.teams_with_player.append(league1_team3)
    league1_player4.teams_with_player.append(league1_team5)

    league1_player5.teams_with_player.append(league1_team1)
    league1_player5.teams_with_player.append(league1_team4)
    league1_player5.teams_with_player.append(league1_team6)

    league1_player6.teams_with_player.append(league1_team2)
    league1_player6.teams_with_player.append(league1_team4)
    league1_player6.teams_with_player.append(league1_team5)

    league1_player7.teams_with_player.append(league1_team2)
    league1_player7.teams_with_player.append(league1_team3)
    league1_player7.teams_with_player.append(league1_team5)

    league1_player8.teams_with_player.append(league1_team4)
    league1_player8.teams_with_player.append(league1_team6)

    league1_player9.teams_with_player.append(league1_team3)
    league1_player9.teams_with_player.append(league1_team5)
    league1_player9.teams_with_player.append(league1_team6)

    league1_player10.teams_with_player.append(league1_team2)
    league1_player10.teams_with_player.append(league1_team3)
    league1_player10.teams_with_player.append(league1_team6)


    league2_player1.teams_with_player.append(league2_team1)
    league2_player2.teams_with_player.append(league2_team1)
    league2_player3.teams_with_player.append(league2_team1)
    league2_player4.teams_with_player.append(league2_team1)
    league2_player5.teams_with_player.append(league2_team1)

    league2_player6.teams_with_player.append(league2_team2)
    league2_player7.teams_with_player.append(league2_team2)
    league2_player8.teams_with_player.append(league2_team2)
    league2_player9.teams_with_player.append(league2_team2)
    league2_player10.teams_with_player.append(league2_team2)

    db.session.commit()

def undo_teams_and_players():
    db.session.execute('TRUNCATE teams RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE players RESTART IDENTITY CASCADE;')
    db.session.commit()
