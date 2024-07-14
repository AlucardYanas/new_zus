import Row from 'react-bootstrap/Row';
import React from 'react';
import { useLocation } from 'react-router-dom'; // Импортируем useLocation
import MyCard from './MyCard';
import useStore from '../../store';

export default function CardsWrapper({ showDeleteButton }) {
  const location = useLocation(); // Используем useLocation для получения текущего пути

  const condition = location.pathname.includes('account'); // Проверяем, содержит ли путь 'account'
  const cards = useStore((state) => (condition ? state.myCards : state.cards)); // Выбираем массив карточек на основе условия

  return (
    <Row className="mt-3">
      {cards.map((card) => (
        <MyCard key={card.id} card={card} showDeleteButton={showDeleteButton} />
      ))}
    </Row>
  );
}
