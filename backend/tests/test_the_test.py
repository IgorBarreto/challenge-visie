import pytest


def add(num1: int, num2: int):
    return num1 + num2


@pytest.mark.parametrize(
    "num1,num2,esperado",
    [
        (3, 2, 5),
        (2, 4, 6),
        (7, -2, 5),
    ],
)
def test_add(num1, num2, esperado):
    print('testing add function')
    sum = add(num1, num2)
    assert sum == esperado
