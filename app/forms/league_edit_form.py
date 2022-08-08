from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import League

class LeagueEditForm(FlaskForm):
    league_name = StringField('league name', validators=[DataRequired()])
