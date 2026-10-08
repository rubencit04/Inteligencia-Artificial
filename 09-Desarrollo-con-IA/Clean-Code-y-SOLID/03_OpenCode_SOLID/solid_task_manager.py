from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import List, Optional
from enum import Enum

class TaskStatus(Enum):
    PENDING = 0
    COMPLETED = 1

@dataclass
class Task:
    title: str
    description: str
    status: TaskStatus = TaskStatus.PENDING

class ITaskRepository(ABC):
    @abstractmethod
    def save(self, task: Task) -> None:
        pass

    @abstractmethod
    def find_by_title(self, title: str) -> Optional[Task]:
        pass

class InMemoryTaskRepository(ITaskRepository):
    def __init__(self) -> None:
        self._tasks: List[Task] = []

    def save(self, task: Task) -> None:
        self._tasks.append(task)

    def find_by_title(self, title: str) -> Optional[Task]:
        for task in self._tasks:
            if task.title == title:
                return task
        return None

class TaskService:
    def __init__(self, repository: ITaskRepository) -> None:
        self.repository = repository

    def add_task(self, title: str, description: str) -> None:
        task = Task(title=title, description=description)
        self.repository.save(task)

if __name__ == "__main__":
    repo = InMemoryTaskRepository()
    service = TaskService(repository=repo)
    service.add_task("Estudiar IA", "Aprender sobre agentes y Clean Code")
    print("Tarea añadida exitosamente con arquitectura SOLID.")
