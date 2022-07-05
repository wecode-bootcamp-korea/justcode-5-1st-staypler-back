import * as mainService from '../services/main.js';

export async function promotion(_, res) {
  try {
    const data = await mainService.getPromotionRooms();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function recommend(_, res) {
  try {
    const data = await mainService.getRecommendRooms();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function banner(_, res) {
  try {
    const data = await mainService.getBannerRooms();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
