import * as mainService from '../services/main.js';

export async function promotionController(req, res) {
  try {
    const data = await mainService.getPromotionRooms();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export function recommendController(req, res) {}

export function bannerController(req, res) {}
