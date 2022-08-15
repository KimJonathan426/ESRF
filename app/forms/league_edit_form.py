from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class LeagueEditForm(FlaskForm):
    league_name = StringField('league name', validators=[DataRequired(message='League name is required.'), Length(max=40, message='League name cannot exceed 40 characters.')])
