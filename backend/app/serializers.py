from datetime import date

from pydantic import BaseModel


class Pessoa(BaseModel):
    nome: str
    rg: str
    cpf: str
    data_nascimento: date
    data_admissao: date
    funcao: str | None


class PessoaUpdate(BaseModel):
    nome: str | None
    rg: str | None
    cpf: str | None
    data_nascimento: date | None
    data_admissao: date | None
    funcao: str | None


class PessoaCriar(Pessoa):
    ...


class PessoaOut(Pessoa):
    id_pessoa: int

    class Config:
        orm_mode = True
