from typing_extensions import deprecated

class StyleProxy:
    def __init__(self, target) -> None: ...
    def __getattr__(self, attr: str): ...
    def __setattr__(self, attr: str, value) -> None: ...
    def __copy__(self): ...
    def __add__(self, other): ...
    @deprecated("Use copy(obj) or cell.obj = cell.obj + other")
    def copy(self, **kw): ...
    def __eq__(self, other: object) -> bool: ...
    def __ne__(self, other: object) -> bool: ...
