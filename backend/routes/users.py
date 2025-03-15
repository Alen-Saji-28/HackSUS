from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User
from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta
import os

router = APIRouter()

# Password Hashing Setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Secret key and algorithm for JWT
SECRET_KEY = os.getenv("SECRET_KEY")  # Use .env value instead of hardcoded key
ALGORITHM = "HS256"

# Function to hash password
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Function to verify password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Function to create JWT token
def create_access_token(data: dict):
    expires_delta = timedelta(hours=1)
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# User Registration Route
@router.post("/register/")
def register_user(user: dict, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user["email"]).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = hash_password(user["password"])
    new_user = User(email=user["email"], password_hash=hashed_password, name=user["name"])  # Fix field name
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully"}

# User Login Route
@router.post("/login/")
def login_user(user: dict, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user["email"]).first()
    if not db_user or not verify_password(user["password"], db_user.password_hash):  # Fix field name
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token(data={"sub": db_user.email})
    return {"access_token": token, "token_type": "bearer"}
