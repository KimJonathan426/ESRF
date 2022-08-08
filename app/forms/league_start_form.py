from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import League

class LeagueStartForm(FlaskForm):
    start_date = StringField('start date', validators=[DataRequired()])
    start_time = StringField('start time', validators=[DataRequired()])
