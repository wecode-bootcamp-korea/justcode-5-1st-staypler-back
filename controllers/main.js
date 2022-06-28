import * as mainService from '../services/main.js';

export async function promotionController(req, res) {
  try {
    const data = await mainService.getPromotionRooms();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function recommendController(req, res) {
  try {
    const data = await mainService.getRecommendRooms();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function bannerController(req, res) {
  try {
    const data = await mainService.getBannerRooms();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
