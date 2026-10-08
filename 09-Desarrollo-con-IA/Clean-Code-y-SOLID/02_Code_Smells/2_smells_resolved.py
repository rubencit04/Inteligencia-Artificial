from enum import Enum
from dataclasses import dataclass

class UserStatus(Enum):
    INACTIVE = 1
    ACTIVE = 2
    BANNED = 3

@dataclass
class User:
    status: UserStatus
    balance: float

def process_user_payment(user: User, amount: float) -> bool:
    if user.status != UserStatus.ACTIVE:
        return False
        
    if user.balance <= 0:
        return False
        
    if amount > user.balance:
        print("Error: Fondos insuficientes.")
        return False

    user.balance -= amount
    return True
