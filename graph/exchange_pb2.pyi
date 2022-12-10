from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class AttributeRequest(_message.Message):
    __slots__ = ["id"]
    ID_FIELD_NUMBER: _ClassVar[int]
    id: str
    def __init__(self, id: _Optional[str] = ...) -> None: ...

class AttributeResponse(_message.Message):
    __slots__ = ["attributes"]
    class Attribute(_message.Message):
        __slots__ = ["index", "name"]
        INDEX_FIELD_NUMBER: _ClassVar[int]
        NAME_FIELD_NUMBER: _ClassVar[int]
        index: int
        name: str
        def __init__(self, index: _Optional[int] = ..., name: _Optional[str] = ...) -> None: ...
    ATTRIBUTES_FIELD_NUMBER: _ClassVar[int]
    attributes: _containers.RepeatedCompositeFieldContainer[AttributeResponse.Attribute]
    def __init__(self, attributes: _Optional[_Iterable[_Union[AttributeResponse.Attribute, _Mapping]]] = ...) -> None: ...

class RecommendPlayerRequest(_message.Message):
    __slots__ = ["name"]
    NAME_FIELD_NUMBER: _ClassVar[int]
    name: str
    def __init__(self, name: _Optional[str] = ...) -> None: ...

class RecommendPlayerResponse(_message.Message):
    __slots__ = ["players"]
    class RecommendPLayer(_message.Message):
        __slots__ = ["id", "name"]
        ID_FIELD_NUMBER: _ClassVar[int]
        NAME_FIELD_NUMBER: _ClassVar[int]
        id: int
        name: str
        def __init__(self, id: _Optional[int] = ..., name: _Optional[str] = ...) -> None: ...
    PLAYERS_FIELD_NUMBER: _ClassVar[int]
    players: _containers.RepeatedCompositeFieldContainer[RecommendPlayerResponse.RecommendPLayer]
    def __init__(self, players: _Optional[_Iterable[_Union[RecommendPlayerResponse.RecommendPLayer, _Mapping]]] = ...) -> None: ...
