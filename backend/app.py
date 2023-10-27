from flask import Flask, jsonify, request
from database import create_user, verify_user, create_pet, get_pets, get_pet

# Create Flask app
app = Flask(__name__)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    result = create_user(data)

    return jsonify({"message: ": result})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    result = verify_user(data)

    return jsonify({"message: ": result})

@app.route('/upload-pet', methods=['POST'])
def upload_pet():
    data = request.get_json()
    result = create_pet(data)

    return jsonify({"message ": result})

@app.route('/get-pets', methods=['GET'])
def retrieve_pets():
    result = get_pets()

    if result is None:
        return jsonify({"error: ": "Pets not found"})
    if isinstance(result, str):
        return jsonify({"error: ": result})
    return jsonify({"pets: ": result})

@app.route('/get-pet', methods=['GET'])
def retrieve_pet():
    pet_id = request.args.get('id')

    if pet_id is None:
        return jsonify({"error": "No pet id added to url"})

    result = get_pet(pet_id)
    if isinstance(result, str):
        return jsonify({"error": result})
    return jsonify({"pet": result})
