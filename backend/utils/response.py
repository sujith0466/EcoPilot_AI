from flask import jsonify


def success_response(data: dict | list | None = None, message: str = "Success", status_code: int = 200) -> tuple:
    """Standardized success response format."""
    response = {"status": "success", "message": message}
    if data is not None:
        response["data"] = data
    return jsonify(response), status_code

def error_response(message: str = "An error occurred", status_code: int = 400) -> tuple:
    """Standardized error response format."""
    response = {"status": "error", "message": message}
    return jsonify(response), status_code

