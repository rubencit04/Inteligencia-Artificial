# Code Smells detectados: Magic Numbers y Arrow Anti-Pattern (Deep Nesting)

def process_user_payment(user, amount):
    if user.status == 2:  # ¿Qué significa el 2? (Magic Number)
        if user.balance > 0:  # Nesting nivel 1
            if amount < user.balance:  # Nesting nivel 2
                user.balance -= amount
                return True
            else:
                print("No money")
                return False
        else:
            return False
    else:
        return False
