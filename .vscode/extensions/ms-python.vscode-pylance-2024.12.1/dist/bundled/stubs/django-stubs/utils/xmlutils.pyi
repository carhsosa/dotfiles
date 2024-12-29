from xml.sax.saxutils import XMLGenerator

class UnserializableContentError(ValueError): ...

class SimplerXMLGenerator(XMLGenerator):
    def addQuickElement(
        self,
        name: str,
        contents: str | None = ...,
        attrs: dict[str, str] | None = ...,
    ) -> None: ...
    def characters(self, content: str) -> None: ...
    def startElement(self, name: str, attrs: dict[str, str]) -> None: ...
