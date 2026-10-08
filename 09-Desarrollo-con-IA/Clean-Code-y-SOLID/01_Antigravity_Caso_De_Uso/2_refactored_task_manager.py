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

class TaskRepository:
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
    def __init__(self, repository: TaskRepository) -> None:
        self.repository = repository

    def add_task(self, title: str, description: str) -> None:
        new_task = Task(title=title, description=description)
        self.repository.save(new_task)

    def complete_task(self, title: str) -> None:
        task = self.repository.find_by_title(title)
        if task:
            task.status = TaskStatus.COMPLETED
