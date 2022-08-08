from flask.cli import AppGroup
from .users import seed_users, undo_users
from .leagues import seed_leagues, undo_leagues
from .teams_and_players import seed_teams_and_players, undo_teams_and_players

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_leagues()
    seed_teams_and_players()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_leagues()
    undo_teams_and_players()
    # Add other undo functions here
