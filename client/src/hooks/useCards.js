import { useEffect } from 'react';
import axiosInstance from '../components/api/axiosInstance';
import useStore from '../store'; // 1. Импорт Zustand store

export default function useCards() {
  // 2. Использование Zustand состояния вместо локального useState
  const cards = useStore((state) => state.cards);
  const setCards = useStore((state) => state.setCards);
  const setMyCards = useStore((state) => state.setMyCards);
  const myCards = useStore((state) => state.myCards);

  const setEditModalShow = useStore((state) => state.setEditModalShow);

  useEffect(() => {
    axiosInstance.get('/cards').then((res) => setCards(res.data));
  }, [setCards]);

  const fetchCards = () => {
    axiosInstance
      .get('/cards/my-cards')
      .then((res) => setMyCards(res.data)) // 3. Обновление Zustand состояния
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const cardSubmitHandler = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (!data.title || !data.price || !data.file) return;

    const formData = new FormData(e.target);
    
    axiosInstance
      .post('/cards/my-cards', formData)
      .then((res) => {
        // Убебидились, что cards является массивом перед обновлением
        if (res.data && typeof res.data === 'object' && res.data.id) {
          useStore.getState().addCard(res.data);
        } else {
          console.error('Data not Valid', res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHandler = (id) => {
    axiosInstance
      .delete(`/cards/my-cards/${id}`)
      .then(() => {
        useStore.getState().deletedCard(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const incrementBonus = (id) => {
    axiosInstance
      .put(`/cards/my-cards/${id}/increment-bonus`)
      .then((res) => {
        // setCards((prev) => prev.map((card) => (card.id === id ? res.data : card))); // 7. Обновление Zustand состояния
        useStore.getState().updateCard(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const decrementBonus = (id) => {
    axiosInstance
      .put(`/cards/my-cards/${id}/decrement-bonus`)
      .then((res) => {
        // setCards((prev) => prev.map((card) => (card.id === id ? res.data : card))); // 8. Обновление Zustand состояния
        useStore.getState().updateCard(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    cards,
    setEditModalShow,
    cardSubmitHandler,
    deleteHandler,

    incrementBonus,
    decrementBonus,
    fetchCards,
    myCards,
  };
}
