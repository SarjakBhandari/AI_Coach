from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.services.auth import *
from models.user import User
from database.db import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register")
def register(username: str, email: str, password: str, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == username).first():
        raise HTTPException(400, "Username exists")
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(400, "Email exists")
    user = User(username=username, email=email, hashed_password=hash_password(password))
    db.add(user); db.commit()
    return {"msg": "Registered"}

@router.post("/login")
def login(username: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(401, "Invalid credentials")
    token = create_token({"sub": user.username})
    return {"access_token": token}

@router.post("/change-password")
def change_password(username: str, old_password: str, new_password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(old_password, user.hashed_password):
        raise HTTPException(401, "Invalid current password")
    user.hashed_password = hash_password(new_password); db.commit()
    return {"msg": "Password changed"}
