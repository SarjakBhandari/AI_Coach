from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.user import User
from app.services.auth import hash_password, verify_password, create_token
from database.db import SessionLocal

auth_router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@auth_router.post("/register")
def register(username: str, email: str, password: str, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == username).first():
        raise HTTPException(status_code=400, detail="Username already exists")
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(username=username, email=email, hashed_password=hash_password(password))
    db.add(user)
    db.commit()
    return {"msg": "Registration successful"}

@auth_router.post("/login")
def login(username: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}

@auth_router.post("/change-password")
def change_password(username: str, old_password: str, new_password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(old_password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect current password")
    user.hashed_password = hash_password(new_password)
    db.commit()
    return {"msg": "Password changed successfully"}
