from typing import Any, _T_co

class AmbiguityWarning(Warning): ...

def supercedes(a, b) -> bool: ...
def consistent(a, b) -> bool: ...
def ambiguous(a, b) -> bool: ...
def ambiguities(signatures) -> set[tuple[tuple[_T_co, ...], tuple[_T_co, ...]]]: ...
def super_signature(signatures) -> list[type]: ...
def edge(a, b, tie_breaker=...) -> bool: ...
def ordering(signatures): ...
