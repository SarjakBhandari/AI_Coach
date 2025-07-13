# models/user.py
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from database.db import engine

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(255))

# ✅ This is the function you're trying to import!
# models/user.py

def create_tables():
    from database.db import engine
    Base.metadata.create_all(bind=engine)

