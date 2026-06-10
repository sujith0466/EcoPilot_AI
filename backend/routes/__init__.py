from routes.main import main_bp
from routes.calculator import calculator_bp
from routes.dashboard import dashboard_bp


def register_blueprints(app):
    """Register all blueprints with the application."""
    app.register_blueprint(main_bp)
    app.register_blueprint(calculator_bp)
    app.register_blueprint(dashboard_bp)

