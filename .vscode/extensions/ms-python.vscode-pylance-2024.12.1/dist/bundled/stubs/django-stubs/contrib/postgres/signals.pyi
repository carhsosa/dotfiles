from typing import Any

def get_hstore_oids(connection_alias: str) -> tuple[Any, ...]: ...
def get_citext_oids(connection_alias: str) -> tuple[Any, ...]: ...
def register_type_handlers(connection: Any, **kwargs: Any) -> None: ...
