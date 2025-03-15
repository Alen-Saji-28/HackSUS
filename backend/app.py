
from fastapi import FastAPI
# In app.py
import sys
print(sys.path)
import os
# Get the absolute path to the backend directory
backend_path = os.path.dirname(os.path.abspath(__file__))
if backend_path not in sys.path:
    sys.path.append(backend_path)

# Then import directly
from routes import users, drivers, pickups
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Smart Waste Collection API")

app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(drivers.router, prefix="/drivers", tags=["Drivers"])
app.include_router(pickups.router, prefix="/pickups", tags=["Pickups"])
#app.include_router(admin.router, prefix="/admin", tags=["Admin"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change this to frontend URL in production
    allow_credentials=True,
    allow_methods=["http://localhost:3000"],
    allow_headers=["http://localhost:3000"],
)
@app.get("/")
def home():
    return {"message": "Smart Waste Collection Platform is Running"}
