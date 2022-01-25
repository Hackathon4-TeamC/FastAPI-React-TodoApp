from database import Base, engine
from models import Todo

print('Creating database ...')

Base.metadata.create_all(engine)