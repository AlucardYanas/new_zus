import useStore from '../store';
import axiosInstance from '../components/api/axiosInstance';

export default function useModalCards() {
  const editModalShow = useStore((state) => state.editModalShow);
  const formData = useStore((state) => state.formData);
  const currentCard = useStore((state) => state.currentCard);
  const setEditModalShow = useStore((state) => state.setEditModalShow);
  const setFormData = useStore((state) => state.setFormData);
  const handleFormChange = useStore((state) => state.handleFormChange);
  const setCurrentCard = useStore((state) => state.setCurrentCard);

  const handleEditClick = (card) => {
    setCurrentCard(card);
    setFormData({
      title: card.title,
      price: card.price,
      image: card.file,
    });
    setEditModalShow(true);
  };

  const handleEditSave = async (e, id, data) => {
    e.preventDefault();
    try {
      const updatedFormData = new FormData(e.target);
      const res = await axiosInstance.put(`/cards/my-cards/${id}`, updatedFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      useStore.getState().updateCard(res.data);
      setEditModalShow(false);
    } catch (error) {
      console.error('Failed to update Card:', error);
    }
  };

  return {
    editModalShow,
    formData,
    currentCard,
    setEditModalShow,
    handleEditClick,
    handleEditSave,
    handleFormChange,
  };
}
