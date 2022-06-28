import * as mainService from '../services/main.js';

export function promotionController(req, res) {}

export function recommendController(req, res) {}

export async function bannerController(req, res) {
  try {
    const data = await mainService.getBannerRooms();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
