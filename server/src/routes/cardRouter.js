const { Router } = require('express');
const { User, Card } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const sharp = require('sharp');
const fs = require('fs/promises');
const upload = require('../middlewares/multer');

const cardRouter = Router();

cardRouter.get('/', async (req, res) => {
  const cards = await Card.findAll();
  res.json(cards);
});

cardRouter
  .route('/my-cards')
  .get(verifyAccessToken, async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const cards = await Card.findAll({
        where: { userId },
        include: {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
        order: [['createdAt', 'DESC']],
      });
      // email создателя первой карточки
      // console.log(cards)
      // const userEmail = cards[0].User.Likes[0].Post.body;
      // console.log(userEmail);
      res.json(cards);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  })
  .post(upload.single('file'), verifyAccessToken, async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'File not found' });
      }
      // создаем имя файла с расширением webp и привязкой к дате
      const name = `${Date.now()}.webp`;
      // создаем буфер с помощью sharp
      const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();
      // создаем файл с помощью fs
      await fs.writeFile(`./public/img/${name}`, outputBuffer);
      const card = await Card.create({
        title: req.body.title,
        price: req.body.price,
        image: name,
        userId: res.locals.user.id,
      });

      const plainCard = await Card.findOne({
        where: {
          id: card.id,
        },
        include: {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      });

      res.json(plainCard);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });

cardRouter.route('/my-cards/:id').delete(verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  if (Number.isNaN(+id)) {
    return res.status(400).json({ message: 'Id must be a number' });
  }

  try {
    const card = await Card.findByPk(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    if (card.userId !== res.locals.user.id) {
      return res.status(401).json({ message: 'Unable to complete' });
    }
    await card.destroy();
    res.json({ message: 'Card deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

cardRouter.route('/my-cards/:id/increment-bonus').put(verifyAccessToken, async (req, res) => {
  try {
    const card = await Card.findByPk(req.params.id);
    if (card.userId !== res.locals.user.id) {
      return res.status(401).json({ message: 'Unable to complete' });
    }

    card.price += 1;
    await card.save();
    res.json(card);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});

cardRouter.route('/my-cards/:id/decrement-bonus').put(verifyAccessToken, async (req, res) => {
  try {
    const card = await Card.findByPk(req.params.id);
    if (card.userId !== res.locals.user.id) {
      return res.status(401).json({ message: 'Unable to complete' });
    }

    if (card.price > 0) {
      card.price -= 1;
      await card.save();
      res.json(card);
    } else {
      res.status(400).json({ message: 'Bonus points cannot be negative' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});

cardRouter
  .route('/my-cards/:id')
  .put(verifyAccessToken, upload.single('file'), async (req, res) => {
    const { id } = req.params;
    try {
      const card = await Card.findByPk(id);
      if (!card) {
        return res.status(404).json({ message: 'Card not found' });
      }
      if (card.userId !== res.locals.user.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      let fileName;
      console.log(req.file);
      if (req.file) {
        fileName = `${Date.now()}.webp`;
        console.log(req.file);
        const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();
        await fs.writeFile(`./public/img/${fileName}`, outputBuffer);
      }

      card.title = req.body.title;
      card.price = req.body.price;
      card.image = fileName;
      await card.save();
      res.json(card);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = cardRouter;
