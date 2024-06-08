from datetime import timedelta
from flask import Flask, session, request, jsonify
from flask_session import Session
from pymongo import MongoClient
import bcrypt
import os
from bson import ObjectId
import uuid
from flask_cors import CORS
from models import text_to_speech
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# session and secret key configuration
app.config["SECRET_KEY"] = os.environ["secret-key"]
app.config["SESSION_TYPE"] = 'filesystem'
app.config.update(
    SESSION_COOKIE_SECURE=True,
    SESSION_COOKIE_SAMESITE='None',
)
app.permanent_session_lifetime = timedelta(days=1000)


# MongoDB connection
client = MongoClient(os.environ['dbURI'])
db = client.database

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)




Session(app)
CORS(app, supports_credentials=True)

@app.route('/')
def home():
    return "Kernel Team API is running"

@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')
    email = request.json.get('email')

    if not username or not password or not email:
        return jsonify({'error': 'Username, password, and email are required'}), 400

    if db.users.find_one({'username': username}):
        return jsonify({'error': 'Username already exists'}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    db.users.insert_one({'username': username, 'password': hashed_password, 'email': email, 'sessionids': []})

    return jsonify({'message': 'User registered successfully'}), 200

@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user = db.users.find_one({'email': email})
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        session_id = str(uuid.uuid4())
        session['session_id'] = session_id
        db.users.update_one({'_id': user['_id']}, {'$push': {'sessionids': session_id}})
        return jsonify({'message': 'Logged in successfully'}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/logout', methods=['POST'])
def logout():
    session_id = session.get('session_id')
    if session_id:
        db.users.update_one({'sessionids': session_id}, {'$pull': {'sessionids': session_id}})
    session.pop('session_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/profile', methods=['GET'])
def profile():
    user_id = session.get('user_id')
    session_id = session.get('session_id')
    if not user_id or not session_id:
        return jsonify({'error': 'Not logged in'}), 401

    user = db.users.find_one({'_id': ObjectId(user_id), 'sessionids': session_id})
    if user:
        return jsonify({'username': user['username'], 'email': user['email']}), 200
    else:
        return jsonify({'error': 'User not found or session invalid'}), 404

@app.route('/authenticate', methods=['GET'])
def authenticate():
    session_id = session.get('session_id')
    if not session_id:
        return jsonify({'authenticated': False}), 200

    user = db.users.find_one({'sessionids': session_id})
    if user:
        return jsonify({'authenticated': True}), 200
    else:
        return jsonify({'authenticated': False}), 200

if __name__ == '__main__':
    app.run(debug=True, port=8000)
