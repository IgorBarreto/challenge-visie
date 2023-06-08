import pytest
from fastapi import status

from app import serializers

from .database import client, session  # noqa


@pytest.fixture()
def test_pessoa(client):  # noqa
    pessoa = {
        'nome': 'Meu nome',
        'rg': '111.234.567-91',
        'cpf': '123.567.218-90',
        'data_nascimento': '1990-09-12',
        'data_admissao': '2020-05-11',
    }
    res = client.post('/pessoas/', json=pessoa)
    pessoa = serializers.PessoaOut(**res.json())
    return pessoa


@pytest.fixture()
def test_pessoa2(client):  # noqa
    pessoa = {
        'nome': 'Meu nome 2',
        'rg': '111.234.567-912',
        'cpf': '123.567.218-902',
        'data_nascimento': '1990-09-22',
        'data_admissao': '2020-05-22',
    }
    res = client.post('/pessoas/', json=pessoa)
    pessoa = serializers.PessoaOut(**res.json())
    return pessoa


def test_root(client):  # noqa
    res = client.get('/')
    s = res.json().get('mensagem')
    assert s == 'Api está no ar!'
    assert res.status_code == 200


def test_criar_pessoa_ja_existe(client, test_pessoa):  # noqa
    pessoa = {
        'nome': 'Meu nome',
        'rg': '111.234.567-91',
        'cpf': '123.567.218-90',
        'data_nascimento': '1990-09-12',
        'data_admissao': '2020-05-11',
    }
    res = client.post('/pessoas/', json=pessoa)
    assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    assert res.json().get('detail') == 'cpf ou rg já cadastrado no sistema'


def test_atualizar_pessoa(client, test_pessoa):  # noqa
    pessoa = {
        'nome': 'Meu nome NOME',
        'rg': '111.234.567-91',
        'cpf': '123.567.218-90',
        'data_nascimento': '1990-09-12',
        'data_admissao': '2020-05-11',
    }
    res = client.put(f'/pessoas/{test_pessoa.id_pessoa}', json=pessoa)
    nova_pessoa = res.json()
    assert nova_pessoa['nome'] == pessoa['nome']
    assert res.status_code == status.HTTP_200_OK


def test_nao_deve_ser_possivel_atualizar_pessoa_2_com_cpf_e_rg_da_pessoa_1(
    client, test_pessoa, test_pessoa2  # noqa
):  # noqa
    # Dados de atualização da pessoa
    dados_pessoa_1 = {
        'nome': 'Meu nome',
        'rg': '111.234.567-91',
        'cpf': '123.567.218-90',
        'data_nascimento': '1990-09-12',
        'data_admissao': '2020-05-11',
    }

    # Realizar a requisição de atualização
    res = client.put(f"/pessoas/{test_pessoa2.id_pessoa}", json=dados_pessoa_1)

    # Verificar o status code esperado
    assert res.status_code == 422  # 422 UNPROCESSABLE ENTITY

    # Verificar se a mensagem de erro está correta
    assert res.json()["detail"] == "cpf ou rg já cadastrado no sistema"


def test_atualizar_parcial_pessoa(client, test_pessoa):  # noqa
    pessoa = {
        'nome': 'Meu nome 1',
    }
    res = client.patch('/pessoas/1', json=pessoa)
    nova_pessoa = res.json()
    assert nova_pessoa['nome'] == pessoa['nome']
    assert nova_pessoa['rg'] == test_pessoa.rg
    assert res.status_code == status.HTTP_200_OK


def test_apagar_pessoa(client, test_pessoa):  # noqa
    res = client.delete(f'/pessoas/{test_pessoa.id_pessoa}')

    assert res.status_code == status.HTTP_204_NO_CONTENT
    res = client.get('/pessoas/')
    assert len(res.json()) == 0
    assert res.status_code == status.HTTP_200_OK
