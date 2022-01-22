from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine=create_engine('postgresql://nishiura:nishiura@localhost:5432/fast',
                     echo=True)


Base = declarative_base()

SessionLocal = sessionmaker(bind=engine)
