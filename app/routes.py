from flask import Blueprint, request, jsonify
from app import db
from app.models import Project, Timer, Session

main = Blueprint('main', __name__)

@main.route('/projects', methods=['GET'])
def get_project():
    Projects = Project.query.all()
    data = []
    for project in Projects:
        sessions = [{
            'id':session.id,
            'duration':session.duration,
            'formatted_time':session.formatted_time,
            'timestamp':session.timestamp.isoformat()
        }for session in project.sessions]
        data.append({
            'id':project.id,
            'name':project.name,
            'total_time':project.total_time,
            'sessions':sessions
        })
    return jsonify(data) 

@main.route('/projects', methods=['POST'])
def  add_project():
   data = request.get_json()
   name = data.get('name')
   if not name:
      return jsonify({'error':'project name is required'}),400
   project = Project(name = name )
   db.session.add(project)
   db.session.commit()
   return jsonify({'id':project.id,'name':project.name}),200

@main.route('/projects/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
   project = Project.query.get_or_404(project_id)
   db.session.delete(project)
   db.session.commit()
   return jsonify({'message':'project deleted'})

@main.route('/projects/<int:project_id>/sessions', methods=['POST'])
def add_session(project_id):
   project = Project.query.get_or_404(project_id)
   data = request.get_json()
   duration = data.get('duration')
   formatted_time = data.get('formatted_time')
   if duration is None or formatted_time is None:
      return jsonify({'error':'Both duration and formatted time are required'}),400
   session = Session(duration = duration,formatted_time=formatted_time,project=project)
   project.total_time += duration
   db.session.add(session)
   db.session.commit()
   return jsonify({'id':session.id,
                   'duration':session.duration,
                   'formatted_time':session.formatted_time,
                   'timestamp':session.timestamp.isoformat()
                   }),201

