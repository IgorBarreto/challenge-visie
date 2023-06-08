from typing import List

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy import and_, or_
from sqlalchemy.orm import Session

from .. import models, serializers
from ..database import get_db

router = APIRouter(prefix="/pessoas", tags=['Pessoas'])


@router.get("/", response_model=List[serializers.PessoaOut])
def get_pessoas(
    db: Session = Depends(get_db),
):
    pessoas = db.query(models.Pessoa).all()
    return pessoas


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=serializers.PessoaOut,
)
def criar_pessoa(
    pessoa: serializers.PessoaCriar,
    db: Session = Depends(get_db),
):
    cpf_ou_rg_existe = (
        db.query(models.Pessoa)
        .filter(
            or_(
                models.Pessoa.rg == pessoa.rg,
                models.Pessoa.cpf == pessoa.cpf,
            )
        )
        .first()
    )

    if cpf_ou_rg_existe is not None:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail='cpf ou rg já cadastrado no sistema',
        )
    nova_pessoa = models.Pessoa(**pessoa.dict())
    db.add(nova_pessoa)
    db.commit()
    db.refresh(nova_pessoa)
    return nova_pessoa


@router.get(
    "/{id}",
    response_model=serializers.PessoaOut,
)
def get_pessoa(
    id: int,
    db: Session = Depends(get_db),
):
    pessoa = (
        db.query(models.Pessoa).filter(models.Pessoa.id_pessoa == id).first()
    )
    if not pessoa:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Pessoa com o id {id} não foi encontrada.',
        )

    return pessoa


@router.delete(
    "/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_pessoa(
    id: int,
    db: Session = Depends(get_db),
):
    pessoa_query = db.query(models.Pessoa).filter(
        models.Pessoa.id_pessoa == id
    )
    pessoa = pessoa_query.first()

    if pessoa is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Pessoa com o id {id} não foi encontrada.',
        )

    pessoa_query.delete(synchronize_session=False)

    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.patch(
    "/{id}",
    response_model=serializers.PessoaOut,
)
def update_partial_pessoa(
    id: int,
    updated_pessoa: serializers.PessoaUpdate,
    db: Session = Depends(get_db),
):
    pessoa = db.get(models.Pessoa, id)
    if pessoa is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Pessoa com o id {id} não foi encontrada.',
        )

    cpf_ou_rg_existe = (
        db.query(models.Pessoa)
        .filter(
            and_(
                or_(
                    models.Pessoa.rg == updated_pessoa.rg,
                    models.Pessoa.cpf == updated_pessoa.cpf,
                )
            ),
            models.Pessoa.id_pessoa != id,
        )
        .first()
    )
    if cpf_ou_rg_existe is not None:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail='cpf ou rg já cadastrado no sistema',
        )
    pessoa_data = updated_pessoa.dict(exclude_unset=True)

    for key, value in pessoa_data.items():
        setattr(pessoa, key, value)
    db.add(pessoa)
    db.commit()
    db.refresh(pessoa)
    return pessoa


@router.put(
    "/{id}",
    response_model=serializers.PessoaOut,
)
def update_pessoa(
    id: int,
    updated_pessoa: serializers.PessoaCriar,
    db: Session = Depends(get_db),
):
    pessoa = (
        db.query(models.Pessoa).filter(models.Pessoa.id_pessoa == id).first()
    )

    if pessoa is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Pessoa com o id {id} não foi encontrada.",
        )
    cpf_ou_rg_existe = (
        db.query(models.Pessoa)
        .filter(
            and_(
                or_(
                    models.Pessoa.rg == updated_pessoa.rg,
                    models.Pessoa.cpf == updated_pessoa.cpf,
                ),
                models.Pessoa.id_pessoa != id,
            ),
        )
        .first()
    )
    if cpf_ou_rg_existe:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail='cpf ou rg já cadastrado no sistema',
        )
    pessoa.rg = updated_pessoa.rg
    pessoa.cpf = updated_pessoa.cpf
    pessoa.nome = updated_pessoa.nome
    pessoa.data_admissao = updated_pessoa.data_admissao
    pessoa.data_nascimento = updated_pessoa.data_nascimento
    pessoa.funcao = (
        updated_pessoa.funcao if updated_pessoa.funcao is not None else None
    )

    db.commit()
    return pessoa
