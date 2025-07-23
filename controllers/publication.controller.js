import Publication from '../models/publications.model.js';

export const getPublicationsByIds = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: 'Invalid or missing publication IDs' });
    }

    const publications = await Publication.find({ '_id': { $in: ids } });
    res.status(200).json(publications);
  } catch (error) {
    console.error('Error fetching publications by IDs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


