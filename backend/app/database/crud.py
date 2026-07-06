from sqlalchemy.orm import Session

from app.models.user import User
from app.models.scheme import Scheme
from app.models.chat import Chat, Bookmark
from app.services.auth_service import hash_password


# ---------- User ----------
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, name: str, email: str, password: str) -> User:
    user = User(name=name, email=email, hashed_password=hash_password(password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


# ---------- Schemes ----------
def get_schemes(db: Session, category: str = None, state: str = None, skip: int = 0, limit: int = 50):
    query = db.query(Scheme)
    if category:
        query = query.filter(Scheme.category == category)
    if state:
        query = query.filter(Scheme.state.in_([state, "All India"]))
    return query.offset(skip).limit(limit).all()


def get_scheme(db: Session, scheme_id: int):
    return db.query(Scheme).filter(Scheme.id == scheme_id).first()


# ---------- Chat history ----------
def save_chat(db: Session, user_id: int, question: str, answer: str, sources_json: str):
    chat = Chat(user_id=user_id, question=question, answer=answer, sources=sources_json)
    db.add(chat)
    db.commit()
    db.refresh(chat)
    return chat


def get_user_chats(db: Session, user_id: int):
    return db.query(Chat).filter(Chat.user_id == user_id).order_by(Chat.created_at.desc()).all()


# ---------- Bookmarks ----------
def add_bookmark(db: Session, user_id: int, scheme_id: int):
    bookmark = Bookmark(user_id=user_id, scheme_id=scheme_id)
    db.add(bookmark)
    db.commit()
    db.refresh(bookmark)
    return bookmark


def get_user_bookmarks(db: Session, user_id: int):
    return db.query(Bookmark).filter(Bookmark.user_id == user_id).all()
