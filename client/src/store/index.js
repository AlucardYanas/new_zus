import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      cards: [],
      myCards: [],
      user: { status: 'fetching', data: null },
      currentCard: null,
      editModalShow: false,
      formData: { title: '', price: '', image: '' },
      show: false,
      setShow: (modalShow) => set({ show: modalShow }),

      setCards: (newCards) => set({ cards: newCards }),
      setMyCards: (myCards) => set({ myCards }),
      addCard: (newCard) =>
        set((state) => ({
          cards: [newCard, ...state.cards],
          myCards: [newCard, ...state.myCards],
        })),
      deleteCard: (deletedCardId) =>
        set((state) => ({
          cards: state.cards.filter((card) => card.id !== deletedCardId),
          myCards: state.myCards.filter((card) => card.id !== deletedCardId),
        })),
      updateCard: (updatedCard) =>
        set((state) => ({
          cards: state.cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)),
          myCards: state.myCards.map((card) => (card.id === updatedCard.id ? updatedCard : card)),
        })),
      setUser: (data) => set({ user: data }),
      setCurrentCard: (card) => set({ currentCard: card }),
      setEditModalShow: (show) => set({ editModalShow: show }),
      setFormData: (data) => set({ formData: data }),
      handleFormChange: (name, value) =>
        set((state) => ({
          formData: { ...state.formData, [name]: value },
        })),
    }),
    {
      name: 'card-storage', // Название для сохранения состояния в localStorage
      getStorage: () => localStorage, // Определяем localStorage как хранилище
    },
  ),
);

export default useStore;
