from sqlalchemy import Column, Date, Integer, String

from .database import Base


class Pessoa(Base):
    __tablename__ = "pessoas"

    id_pessoa = Column(Integer, primary_key=True, nullable=False)
    nome = Column(String(100), nullable=False)
    rg = Column(String(100), nullable=False)
    cpf = Column(String(100), nullable=False)
    data_nascimento = Column(Date, nullable=False)
    data_admissao = Column(Date, nullable=False)
    funcao = Column(String(100), nullable=True)
