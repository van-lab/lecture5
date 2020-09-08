import os
import requests
from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

votes = {"yes": 0, "no": 0, "maybe": 0}

@app.route("/")
def index():
  return render_template("voteindex.html", votes = votes)

# listen to socket for "submit vote" event
@socketio.on("submit vote")
def vote(data):
  selection = data["selection"]
  votes[selection] += 1
  # emit event call "announce vote" and broadcast it
  emit("vote totals", votes, broadcast = True)