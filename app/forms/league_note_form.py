from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class LeagueNoteForm(FlaskForm):
    league_note_title = StringField('league note title', validators=[DataRequired(message='League note title is required.'), Length(max=40, message='League note title cannot exceed 40 characters.')])
    league_note = StringField('league note', validators=[DataRequired(message='League note is required.'), Length(max=1000, message='League note cannot exceed 1000 characters.')])
