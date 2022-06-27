import * as mainRepository from '../models/main.js';

export function getPromotionRooms() {}

export function getRecommendRooms() {}

export async function getBannerRooms() {
  const bannerList = await mainRepository.readRoomsOfBanner();
  return bannerList;
}
