from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    address = Column(String(500), nullable=True)
    subscription_plan = Column(String(50), default="free")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Driver(Base):
    __tablename__ = "drivers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    vehicle_make = Column(String(255))
    vehicle_model = Column(String(255))
    capacity = Column(String(50))  
    waste_types = Column(String(255))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class PickupRequest(Base):
    __tablename__ = "pickup_requests"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    driver_id = Column(Integer, ForeignKey("drivers.id"), nullable=True)
    pickup_time = Column(DateTime, nullable=False)
    address = Column(String(500), nullable=False)
    waste_type = Column(String(255), nullable=False)
    weight = Column(Integer, nullable=False)
    scheduled_time = Column(DateTime, nullable=False)
    status = Column(String(50), default="pending")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User")
