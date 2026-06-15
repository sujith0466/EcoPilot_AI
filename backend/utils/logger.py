import logging
import os
from logging.handlers import RotatingFileHandler

logger = logging.getLogger("ecopilot")
logger.setLevel(logging.INFO)


def setup_logger(app):
    """Configure rotating file logging and console logging."""
    if not os.path.exists("logs"):
        os.mkdir("logs")

    formatter = logging.Formatter(
        "%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]"
    )

    # Set up rotating file handler
    file_handler = RotatingFileHandler(
        "logs/ecopilot.log", maxBytes=10240000, backupCount=10
    )
    file_handler.setFormatter(formatter)

    # Set up console handler
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)

    if app.debug:
        file_handler.setLevel(logging.DEBUG)
        console_handler.setLevel(logging.DEBUG)
        logger.setLevel(logging.DEBUG)
    else:
        file_handler.setLevel(logging.INFO)
        console_handler.setLevel(logging.INFO)
        logger.setLevel(logging.INFO)

    logger.addHandler(file_handler)
    logger.addHandler(console_handler)

    logger.info("EcoPilot logging setup complete.")


def log_security_event(
    event_type: str, user_id: int, details: str, severity: str = "warning"
):
    msg = f"SECURITY_EVENT: {event_type} | User: {user_id} | Details: {details}"
    if severity == "critical":
        logger.critical(msg)
    elif severity == "error":
        logger.error(msg)
    else:
        logger.warning(msg)

