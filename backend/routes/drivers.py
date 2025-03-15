from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Driver
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

# Driver Registration Route
@router.post("/register/")
def register_driver(driver: dict, db: Session = Depends(get_db)):
    existing_driver = db.query(Driver).filter(Driver.email == driver["email"]).first()
    if existing_driver:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = hash_password(driver["password"])
    new_driver = Driver(email=driver["email"], password_hash=hashed_password, name=driver["name"], vehicle_make=driver["vehicle_make"])  # Fix field name

    db.add(new_driver)
    db.commit()
    db.refresh(new_driver)
    return {"message": "Driver registered successfully"}

# Driver Login Route
@router.post("/login/")
def login_driver(driver: dict, db: Session = Depends(get_db)):
    db_driver = db.query(Driver).filter(Driver.email == driver["email"]).first()
    if not db_driver or not verify_password(driver["password"], db_driver.password_hash):  # Fix field name
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token(data={"sub": db_driver.email})
    return {"access_token": token, "token_type": "bearer"}
