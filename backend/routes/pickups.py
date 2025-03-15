from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from database import get_db
from models import PickupRequest
from datetime import datetime

router = APIRouter()

@router.post("/request/")
async def request_pickup(request: Request, db: Session = Depends(get_db)):
    data = await request.json()  # Extract raw JSON data
    required_fields = ["user_id", "address", "waste_type", "weight", "scheduled_time"]
    
    for field in required_fields:
        if field not in data or data[field] is None:
            raise HTTPException(status_code=400, detail=f"Missing required field: {field}")

    try:
        scheduled_time = datetime.strptime(data["scheduled_time"], "%Y-%m-%d %H:%M:%S")  # Ensure MySQL datetime format
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format, use YYYY-MM-DD HH:MM:SS")

    new_pickup = PickupRequest(
        user_id=data["user_id"], 
        address=data["address"], 
        waste_type=data["waste_type"], 
        weight=data["weight"], 
        status="pending",  # Ensure lowercase for MySQL compatibility
        scheduled_time=scheduled_time
    )
    
    db.add(new_pickup)
    db.commit()
    db.refresh(new_pickup)
    
    return {"message": "Pickup scheduled successfully", "pickup_id": new_pickup.id}

@router.post("/accept/{pickup_id}/")
async def accept_pickup(pickup_id: int, request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    if "driver_id" not in data:
        raise HTTPException(status_code=400, detail="Missing driver_id")

    pickup = db.query(PickupRequest).filter(PickupRequest.id == pickup_id).first()
    
    if not pickup or pickup.status.lower() != "pending":  # Normalize case for MySQL
        raise HTTPException(status_code=400, detail="Pickup not available")

    pickup.driver_id = data["driver_id"]
    pickup.status = "accepted"
    pickup.accepted_time = datetime.utcnow()
    db.commit()
    
    return {"message": "Pickup accepted by driver", "pickup_id": pickup_id}

@router.put("/update/{pickup_id}/")
async def update_pickup_status(pickup_id: int, request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    if "status" not in data:
        raise HTTPException(status_code=400, detail="Missing status field")

    pickup = db.query(PickupRequest).filter(PickupRequest.id == pickup_id).first()
    
    if not pickup:
        raise HTTPException(status_code=404, detail="Pickup not found")

    pickup.status = data["status"].lower()  # Normalize case for MySQL
    db.commit()
    
    return {"message": "Pickup status updated"}
