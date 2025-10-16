from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS
import json
import os
from labs.manager import lab_manager

app = Flask(__name__, static_url_path="", static_folder="dist")
CORS(app)

# Get flags from environment variables
def get_flags():
    flags = {}
    for i in range(1, 12):  # FLAG_1 to FLAG_11
        flag_key = f"FLAG_{i}"
        flags[flag_key] = os.environ.get(flag_key, f"FLAG_{i}_NOT_SET")
    return flags

@app.route('/')
def index():
    return send_from_directory('dist', 'index.html')

@app.route('/api/labs', methods=['GET'])
def get_labs():
    """API endpoint to get all labs configuration"""
    labs = []
    available_labs = lab_manager.get_available_labs()
    
    for lab_id in available_labs:
        lab_info = lab_manager.get_lab_info(lab_id)
        lab_status = lab_manager.get_lab_status(lab_id)
        
        labs.append({
            "id": lab_id,
            "title": lab_info["title"],
            "description": lab_info["description"],
            "difficulty": lab_info["difficulty"],
            "status": lab_status.get("status", "unknown"),
            "completed": lab_status.get("bypassed", False) or lab_status.get("revealed", False)
        })
    
    return jsonify(labs)

@app.route('/api/labs/<int:lab_id>', methods=['GET'])
def get_lab(lab_id):
    """API endpoint to get specific lab configuration"""
    lab_info = lab_manager.get_lab_info(lab_id)
    lab_status = lab_manager.get_lab_status(lab_id)
    
    if lab_info:
        return jsonify({
            "id": lab_id,
            "title": lab_info["title"],
            "description": lab_info["description"],
            "difficulty": lab_info["difficulty"],
            "status": lab_status.get("status", "unknown"),
            "completed": lab_status.get("bypassed", False) or lab_status.get("revealed", False)
        })
    return jsonify({"error": "Lab not found"}), 404

@app.route('/api/chat', methods=['POST'])
def chat():
    """API endpoint to process chat messages with integrated labs"""
    try:
        data = request.get_json()
        message = data.get('message')
        lab_id = data.get('lab_id')
        api_key = data.get('api_key')  # Get API key from request
        
        if not message or not lab_id:
            return jsonify({"error": "Missing message or lab_id"}), 400
        
        if not api_key:
            return jsonify({"error": "API key is required"}), 400
        
        # Process the message using the lab manager with API key
        result = lab_manager.process_message(lab_id, message, api_key)
        
        # Check if challenge is completed and include flag
        flags = get_flags()
        flag_key = f"FLAG_{lab_id}"
        flag = flags.get(flag_key, "FLAG_NOT_AVAILABLE")
        
        response_data = {
            "response": result.get("response", "No response"),
            "success": result.get("success", False)
        }
        
        # If challenge is completed, include the flag
        if result.get("success", False):
            response_data["flag"] = flag
            response_data["challenge_completed"] = True
        
        return jsonify(response_data)
        
    except Exception as e:
        return jsonify({
            "response": f"Server error: {str(e)}",
            "success": False
        }), 500

@app.route('/api/labs/<int:lab_id>/reset', methods=['POST'])
def reset_lab(lab_id):
    """API endpoint to reset a specific lab"""
    try:
        result = lab_manager.reset_lab(lab_id)
        return jsonify(result)
    except Exception as e:
        return jsonify({
            "message": f"Error resetting lab {lab_id}: {str(e)}",
            "success": False
        }), 500

@app.route('/api/labs/<int:lab_id>/status', methods=['GET'])
def get_lab_status(lab_id):
    """API endpoint to get the status of a specific lab"""
    try:
        status = lab_manager.get_lab_status(lab_id)
        return jsonify(status)
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": str(e)
        }), 500

@app.route('/api/labs/<int:lab_id>/flag', methods=['GET'])
def get_lab_flag(lab_id):
    """API endpoint to get the flag for a specific lab if completed"""
    try:
        lab_status = lab_manager.get_lab_status(lab_id)
        flags = get_flags()
        flag_key = f"FLAG_{lab_id}"
        flag = flags.get(flag_key, "FLAG_NOT_AVAILABLE")
        
        if lab_status.get("bypassed", False) or lab_status.get("revealed", False):
            return jsonify({
                "flag": flag,
                "lab_id": lab_id,
                "completed": True
            })
        else:
            return jsonify({
                "error": "Lab not completed yet",
                "lab_id": lab_id,
                "completed": False
            }), 403
            
    except Exception as e:
        return jsonify({
            "error": f"Error getting flag for lab {lab_id}: {str(e)}"
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    flags = get_flags()
    return {
        "status": "healthy", 
        "service": "hub", 
        "labs_loaded": len(lab_manager.get_available_labs()),
        "flags_loaded": len([f for f in flags.values() if f != "FLAG_NOT_SET"])
    }

@app.route('/api/validate-key', methods=['POST'])
def validate_api_key():
    """API endpoint to validate the Gemini API key"""
    try:
        data = request.get_json()
        api_key = data.get('api_key')
        
        if not api_key:
            return jsonify({"error": "API key is required"}), 400
        
        # Test the API key by making a simple request to Gemini
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        # Try a simple test prompt
        response = model.generate_content("Hello")
        
        if response and response.text:
            return jsonify({"success": True, "message": "API key is valid"})
        else:
            return jsonify({"error": "Invalid API key"}), 400
            
    except Exception as e:
        return jsonify({"error": f"Invalid API key: {str(e)}"}), 400

# Serve React static files
@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(os.path.join('dist', path)):
        return send_from_directory('dist', path)
    return send_from_directory('dist', 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) 