"""
Application Factory for EcoPilot AI.
Initializes Flask, loads configuration, configures extensions (SQLAlchemy, Limiter, Talisman), 
and registers application blueprints.
"""
import os
from flask import Flask
from flask_cors import CORS
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

    # Configure CORS for Vercel production and local development
    CORS(
        app,
        resources={r"/api/*": {"origins": ["https://eco-pilot-ai-wheat.vercel.app", "http://localhost:5173", "http://127.0.0.1:5173"]}},
        supports_credentials=True
    )

    # Apply configuration
    app.config.from_object(config_by_name[config_name])

    # Initialize Extensions
    db.init_app(app)
    migrate.init_app(app, db)
    limiter.init_app(app)
    cache.init_app(app)

    # Initialize Database Schema
    with app.app_context():
        import models  # noqa: F401
        db.create_all()

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

    from flask_talisman import Talisman

    csp = {
        'default-src': [
            '\'self\'',
            '\'unsafe-inline\'',
            'https://eco-pilot-ai-wheat.vercel.app'
        ],
        'connect-src': [
            '\'self\'',
            'https://eco-pilot-ai-wheat.vercel.app'
        ]
    }

    Talisman(
        app,
        force_https=not app.debug and not app.testing,
        strict_transport_security=True,
        session_cookie_secure=not app.debug and not app.testing,
        content_security_policy=csp,
        frame_options='SAMEORIGIN',
        referrer_policy='strict-origin-when-cross-origin',
        x_content_type_options=True,
        x_xss_protection=True,
    )

    return app

