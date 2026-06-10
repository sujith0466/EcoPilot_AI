import os
from flask import Flask
from dotenv import load_dotenv

load_dotenv()

from config import config_by_name
from extensions import db, migrate, limiter, cache
from routes import register_blueprints
from utils.errors import register_error_handlers
from utils.logger import setup_logger, logger
from utils.response import error_response


def create_app(config_name=None):
    """
    Application Factory Pattern.
    Creates and configures the Flask application.
    """
    if config_name is None:
        config_name = os.getenv("FLASK_ENV", "development")

    app = Flask(__name__)

    # Apply configuration
    app.config.from_object(config_by_name[config_name])

    # Initialize Extensions
    db.init_app(app)
    migrate.init_app(app, db)
    limiter.init_app(app)
    cache.init_app(app)

    # Setup Logging
    setup_logger(app)

    # Register Blueprints & Errors
    register_blueprints(app)
    register_error_handlers(app)

    @app.errorhandler(Exception)
    def handle_exception(e):
        logger.error(f"Unhandled Exception: {str(e)}", exc_info=True)
        return error_response("An internal server error occurred.", 500)

    @app.errorhandler(400)
    def bad_request(e):
        return error_response("Bad request", 400)

    @app.errorhandler(404)
    def not_found(e):
        return error_response("Resource not found", 404)

    @app.errorhandler(429)
    def ratelimit_handler(e):
        logger.warning(f"Rate limit exceeded: {e.description}")
        return error_response(f"Rate limit exceeded: {e.description}", 429)

    # Security Headers Middleware
    @app.after_request
    def set_security_headers(response):
        headers = app.config.get("SECURITY_HEADERS", {})
        for header, value in headers.items():
            response.headers[header] = value
        return response

    return app

