class TaskManager:
    def __init__(self):
        # Base de datos global acoplada a la clase
        self.db = [] 
        
    def add_task(self, title, desc, status):
        # Lógica de creación y guardado mezcladas
        self.db.append({"title": title, "desc": desc, "status": status})
        print("Task added")

    def complete_task(self, title):
        for t in self.db:
            if t["title"] == title:
                t["status"] = 1  # Magic Number (1 = completado)
                print("Task completed")
                return
        print("Task not found")
