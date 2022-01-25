from sqlalchemy import Boolean, Column, Integer, String
from database import Base

class Todo(Base):
    __tablename__ = 'todos'
    id = Column('id', Integer, primary_key = True)
    task = Column('task', String(200))
    isCompleted = Column('isCompleted', Boolean, default=False)