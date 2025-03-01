from app import db
from datetime import datetime

class Project(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    name = db.Column(db.String(100),nullable = False)
    total_time = db.Column(db.Integer,default = 0)
    sessions = db.relationship('Session',backref = 'project',cascade = 'all,delete-orphan',lazy = True)


class Session(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    duration = db.Column(db.Integer,nullable = False)
    formatted_time = db.Column(db.String(500),nullable = False)
    timestamp = db.Column(db.DateTime, default = datetime.utcnow)
    project_id=db.Column(db.Integer,db.ForeignKey('project.id'),nullable = False)    