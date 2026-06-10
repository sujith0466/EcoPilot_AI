from flask import jsonify


class APIError(Exception):
    """Base class for exceptions in this application."""

    def __init__(self, message, status_code=400, payload=None):
        Exception.__init__(self)
        self.message = message
        self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv["error"] = self.message
        return rv


def register_error_handlers(app):
    """Register application-wide error handlers."""

    @app.errorhandler(APIError)
    def handle_api_error(error):
        app.logger.warning(f"APIError: {error.message}")
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response

