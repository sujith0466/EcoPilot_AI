# Import all models here to ensure they are registered with SQLAlchemy
from models.base import BaseModel  # noqa: F401
from models.user import User  # noqa: F401
from models.carbon_record import CarbonRecord  # noqa: F401
from models.goal import Goal  # noqa: F401

# Example of a future model import:
# from models.user import User

