import abc
import sys
from _typeshed import FileDescriptorOrPath, Unused
from abc import abstractmethod
from collections.abc import AsyncGenerator, AsyncIterator, Awaitable, Callable, Generator, Iterator
from types import TracebackType
from typing import IO, Any, Generic, Protocol, TypeVar, overload, runtime_checkable
from typing_extensions import ParamSpec, Self, TypeAlias

__all__ = [
    "contextmanager",
    "closing",
    "AbstractContextManager",
    "ContextDecorator",
    "ExitStack",
    "redirect_stdout",
    "redirect_stderr",
    "suppress",
    "AbstractAsyncContextManager",
    "AsyncExitStack",
    "asynccontextmanager",
    "nullcontext",
]

if sys.version_info >= (3, 10):
    __all__ += ["aclosing"]

if sys.version_info >= (3, 11):
    __all__ += ["chdir"]

_T = TypeVar("_T")
_T_co = TypeVar("_T_co", covariant=True)
_T_io = TypeVar("_T_io", bound=IO[str] | None)
_ExitT_co = TypeVar("_ExitT_co", covariant=True, bound=bool | None, default=bool | None)
_F = TypeVar("_F", bound=Callable[..., Any])
_P = ParamSpec("_P")

_ExitFunc: TypeAlias = Callable[[type[BaseException] | None, BaseException | None, TracebackType | None], bool | None]
_CM_EF = TypeVar("_CM_EF", bound=AbstractContextManager[Any, Any] | _ExitFunc)

@runtime_checkable
class AbstractContextManager(Protocol[_T_co, _ExitT_co]):
    def __enter__(self) -> _T_co: ...
    @abstractmethod
    def __exit__(
        self, exc_type: type[BaseException] | None, exc_value: BaseException | None, traceback: TracebackType | None, /
    ) -> _ExitT_co: ...

@runtime_checkable
class AbstractAsyncContextManager(Protocol[_T_co, _ExitT_co]):
    async def __aenter__(self) -> _T_co: ...
    @abstractmethod
    async def __aexit__(
        self, exc_type: type[BaseException] | None, exc_value: BaseException | None, traceback: TracebackType | None, /
    ) -> _ExitT_co: ...

class ContextDecorator:
    def _recreate_cm(self) -> Self: ...
    def __call__(self, func: _F) -> _F: ...

class _GeneratorContextManagerBase: ...

class _GeneratorContextManager(_GeneratorContextManagerBase, AbstractContextManager[_T_co, bool | None], ContextDecorator):
    # __init__ and all instance attributes are actually inherited from _GeneratorContextManagerBase
    # adding them there is more trouble than it's worth to include in the stub; see #6676
    def __init__(self, func: Callable[..., Iterator[_T_co]], args: tuple[Any, ...], kwds: dict[str, Any]) -> None: ...
    gen: Generator[_T_co, Any, Any]
    func: Callable[..., Generator[_T_co, Any, Any]]
    args: tuple[Any, ...]
    kwds: dict[str, Any]
    if sys.version_info >= (3, 9):
        def __exit__(
            self, typ: type[BaseException] | None, value: BaseException | None, traceback: TracebackType | None
        ) -> bool | None: ...
    else:
        def __exit__(
            self, type: type[BaseException] | None, value: BaseException | None, traceback: TracebackType | None
        ) -> bool | None: ...

def contextmanager(func: Callable[_P, Iterator[_T_co]]) -> Callable[_P, _GeneratorContextManager[_T_co]]: ...

if sys.version_info >= (3, 10):
    _AF = TypeVar("_AF", bound=Callable[..., Awaitable[Any]])

    class AsyncContextDecorator:
        def _recreate_cm(self) -> Self: ...
        def __call__(self, func: _AF) -> _AF: ...

    class _AsyncGeneratorContextManager(
        _GeneratorContextManagerBase, AbstractAsyncContextManager[_T_co, bool | None], AsyncContextDecorator
    ):
        # __init__ and these attributes are actually defined in the base class _GeneratorContextManagerBase,
        # adding them there is more trouble than it's worth to include in the stub (see #6676)
        def __init__(self, func: Callable[..., AsyncIterator[_T_co]], args: tuple[Any, ...], kwds: dict[str, Any]) -> None: ...
        gen: AsyncGenerator[_T_co, Any]
        func: Callable[..., AsyncGenerator[_T_co, Any]]
        args: tuple[Any, ...]
        kwds: dict[str, Any]
        async def __aexit__(
            self, typ: type[BaseException] | None, value: BaseException | None, traceback: TracebackType | None
        ) -> bool | None: ...

else:
    class _AsyncGeneratorContextManager(_GeneratorContextManagerBase, AbstractAsyncContextManager[_T_co, bool | None]):
        def __init__(self, func: Callable[..., AsyncIterator[_T_co]], args: tuple[Any, ...], kwds: dict[str, Any]) -> None: ...
        gen: AsyncGenerator[_T_co, Any]
        func: Callable[..., AsyncGenerator[_T_co, Any]]
        args: tuple[Any, ...]
        kwds: dict[str, Any]
        async def __aexit__(
            self, typ: type[BaseException] | None, value: BaseException | None, traceback: TracebackType | None
        ) -> bool | None: ...

def asynccontextmanager(func: Callable[_P, AsyncIterator[_T_co]]) -> Callable[_P, _AsyncGeneratorContextManager[_T_co]]: ...

class _SupportsClose(Protocol):
    def close(self) -> object: ...

_SupportsCloseT = TypeVar("_SupportsCloseT", bound=_SupportsClose)

class closing(AbstractContextManager[_SupportsCloseT, None]):
    def __init__(self, thing: _SupportsCloseT) -> None: ...
    def __exit__(self, *exc_info: Unused) -> None: ...

if sys.version_info >= (3, 10):
    class _SupportsAclose(Protocol):
        def aclose(self) -> Awaitable[object]: ...

    _SupportsAcloseT = TypeVar("_SupportsAcloseT", bound=_SupportsAclose)

    class aclosing(AbstractAsyncContextManager[_SupportsAcloseT, None]):
        def __init__(self, thing: _SupportsAcloseT) -> None: ...
        async def __aexit__(self, *exc_info: Unused) -> None: ...

class suppress(AbstractContextManager[None, bool]):
    def __init__(self, *exceptions: type[BaseException]) -> None: ...
    def __exit__(
        self, exctype: type[BaseException] | None, excinst: BaseException | None, exctb: TracebackType | None
    ) -> bool: ...

class _RedirectStream(AbstractContextManager[_T_io, None]):
    def __init__(self, new_target: _T_io) -> None: ...
    def __exit__(
        self, exctype: type[BaseException] | None, excinst: BaseException | None, exctb: TracebackType | None
    ) -> None: ...

class redirect_stdout(_RedirectStream[_T_io]): ...
class redirect_stderr(_RedirectStream[_T_io]): ...

class _BaseExitStack(Generic[_ExitT_co]):
    def enter_context(self, cm: AbstractContextManager[_T, _ExitT_co]) -> _T: ...
    def push(self, exit: _CM_EF) -> _CM_EF: ...
    def callback(self, callback: Callable[_P, _T], /, *args: _P.args, **kwds: _P.kwargs) -> Callable[_P, _T]: ...
    def pop_all(self) -> Self: ...

# In reality this is a subclass of `AbstractContextManager`;
# see #7961 for why we don't do that in the stub
class ExitStack(_BaseExitStack[_ExitT_co], metaclass=abc.ABCMeta):
    def close(self) -> None: ...
    def __enter__(self) -> Self: ...
    def __exit__(
        self, exc_type: type[BaseException] | None, exc_value: BaseException | None, traceback: TracebackType | None, /
    ) -> _ExitT_co: ...

_ExitCoroFunc: TypeAlias = Callable[
    [type[BaseException] | None, BaseException | None, TracebackType | None], Awaitable[bool | None]
]
_ACM_EF = TypeVar("_ACM_EF", bound=AbstractAsyncContextManager[Any, Any] | _ExitCoroFunc)

# In reality this is a subclass of `AbstractAsyncContextManager`;
# see #7961 for why we don't do that in the stub
class AsyncExitStack(_BaseExitStack[_ExitT_co], metaclass=abc.ABCMeta):
    async def enter_async_context(self, cm: AbstractAsyncContextManager[_T, _ExitT_co]) -> _T: ...
    def push_async_exit(self, exit: _ACM_EF) -> _ACM_EF: ...
    def push_async_callback(
        self, callback: Callable[_P, Awaitable[_T]], /, *args: _P.args, **kwds: _P.kwargs
    ) -> Callable[_P, Awaitable[_T]]: ...
    async def aclose(self) -> None: ...
    async def __aenter__(self) -> Self: ...
    async def __aexit__(
        self, exc_type: type[BaseException] | None, exc_value: BaseException | None, traceback: TracebackType | None, /
    ) -> bool: ...

if sys.version_info >= (3, 10):
    class nullcontext(AbstractContextManager[_T, None], AbstractAsyncContextManager[_T, None]):
        enter_result: _T
        @overload
        def __init__(self: nullcontext[None], enter_result: None = None) -> None: ...
        @overload
        def __init__(self: nullcontext[_T], enter_result: _T) -> None: ...  # pyright: ignore[reportInvalidTypeVarUse]  #11780
        def __enter__(self) -> _T: ...
        def __exit__(self, *exctype: Unused) -> None: ...
        async def __aenter__(self) -> _T: ...
        async def __aexit__(self, *exctype: Unused) -> None: ...

else:
    class nullcontext(AbstractContextManager[_T, None]):
        enter_result: _T
        @overload
        def __init__(self: nullcontext[None], enter_result: None = None) -> None: ...
        @overload
        def __init__(self: nullcontext[_T], enter_result: _T) -> None: ...  # pyright: ignore[reportInvalidTypeVarUse]  #11780
        def __enter__(self) -> _T: ...
        def __exit__(self, *exctype: Unused) -> None: ...

if sys.version_info >= (3, 11):
    _T_fd_or_any_path = TypeVar("_T_fd_or_any_path", bound=FileDescriptorOrPath)

    class chdir(AbstractContextManager[None, None], Generic[_T_fd_or_any_path]):
        path: _T_fd_or_any_path
        def __init__(self, path: _T_fd_or_any_path) -> None: ...
        def __enter__(self) -> None: ...
        def __exit__(self, *excinfo: Unused) -> None: ...
