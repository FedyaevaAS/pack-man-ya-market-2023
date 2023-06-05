import enum
import uuid

from sqlalchemy import Boolean, Column, Enum, Float, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

from core.db import Base


class Order(Base):
    """Заказ."""

    class Status(str, enum.Enum):
        """Статус заказа."""
# подумать какие еще статусы добавить
    OK = "ok"
    FORMED = "formed"

    orderkey = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    packages = relationship(
        'Package',
        secondary='orderpackage',
        back_populates='orders'
    )
    items = relationship("Item", back_populates="order")
    status = Column(
        Enum(
            Status,
            name="order_status",
            values_callable=lambda obj: [e.value for e in obj]
        ),
        nullable=False
    )


class Item(Base):
    sku = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    orderkey = Column(
        UUID(as_uuid=True),
        ForeignKey(Order.orderkey, ondelete="CASCADE"),
        nullable=False
    )
    count = Column(Integer, nullable=False)
    size1 = Column(String(50), nullable=False)
    size2 = Column(String(50), nullable=False)
    size3 = Column(String(50), nullable=False)
    weight = Column(String(50), nullable=False)
    types = relationship(
        'Cargotype',
        secondary='itemcargotypes',
        back_populates='items'
    )


class Cargotype(Base):
    cargotype = Column(String(50), primary_key=True)
    description = Column(String(150), nullable=False)
    items = relationship(
        'Item',
        secondary='itemcargotypes',
        back_populates='types'
    )


class Package(Base):
    cartontype = Column(String(50), primary_key=True)
    length = Column(String(50), nullable=False)
    width = Column(String(50), nullable=False)
    height = Column(String(50), nullable=False)
    displayrfpack = Column(Boolean, nullable=False)
    price = Column(Float, nullable=False)
    orders = relationship(
        'Order',
        secondary='orderpackage',
        back_populates='packages'
    )


class ItemCargotypes(Base):
    id = Column(Integer, primary_key=True)
    sku = Column(UUID(as_uuid=True), ForeignKey(Item.sku), nullable=False)
    cargotype = Column(
        String(50),
        ForeignKey(Cargotype.cargotype),
        nullable=False
    )


class OrderPackage(Base):
    id = Column(Integer, primary_key=True)
    orderkey = Column(
        UUID(as_uuid=True),
        ForeignKey(Order.orderkey),
        nullable=False
    )
    cartontype = Column(
        String(50),
        ForeignKey(Package.cartontype),
        nullable=False
    )
