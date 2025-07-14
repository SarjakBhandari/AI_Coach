from sqlalchemy import Column, Integer, Float, String, ForeignKey
from database.db import Base

class Feedback(Base):
    __tablename__ = "feedback"
    id = Column(Integer, primary_key=True)
    player_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    elbow_angle = Column(Float)
    knee_angle = Column(Float)
    shot_type = Column(String(50))
    feedback_text = Column(String(255))

def create_tables():
    from database.db import engine
    Base.metadata.create_all(bind=engine)
