from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session, sessionmaker
from starlette.requests import Request
from pydantic import BaseModel
from models import Todo
from database import engine


# DB接続用のセッションクラス インスタンスが作成されると接続する
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Pydanticを用いたAPIに渡されるデータの定義 ValidationやDocumentationの機能が追加される
class TodoIn(BaseModel):
    task: str
    isCompleted: bool

# 単一のTodoを取得するためのユーティリティ
def get_todo(db_session: Session, todo_id: int):
    return db_session.query(Todo).filter(Todo.id == todo_id).first()

# DB接続のセッションを各エンドポイントの関数に渡す
def get_db(request: Request):
    return request.state.database

# このインスタンスをアノテーションに利用することでエンドポイントを定義できる
app = FastAPI()

# corsの設定
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def root():
    return {'message': 'Hello World'}

# Todoの全取得
@app.get("/todos/")
def read_todos(database: Session = Depends(get_db)):
    todos = database.query(Todo).all()
    return todos

# 単一のTodoを取得
@app.get("/todos/{todo_id}")
def read_todo(todo_id: int, database: Session = Depends(get_db)):
    todo = get_todo(database, todo_id)
    return todo

# Todoを登録
@app.post("/todos/")
async def create_todo(todo_in: TodoIn,  database: Session = Depends(get_db)):
    todo = Todo(task=todo_in.task, isCompleted=False)
    database.add(todo)
    database.commit()
    todo = get_todo(database, todo.id)
    return todo

# Todoを更新
@app.put("/todos/{todo_id}")
async def update_todo(todo_id: int, todo_in: TodoIn, database: Session = Depends(get_db)):
    todo = get_todo(database, todo_id)
    todo.task = todo_in.task
    todo.isCompleted = todo_in.isCompleted
    database.commit()
    todo = get_todo(database, todo_id)
    return todo

# Todoを削除
@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int, database: Session = Depends(get_db)):
    todo = get_todo(database, todo_id)
    database.delete(todo)
    database.commit()

# リクエストの度に呼ばれるミドルウェア DB接続用のセッションインスタンスを作成
@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    request.state.database = SessionLocal()
    response = await call_next(request)
    request.state.database.close()
    return response