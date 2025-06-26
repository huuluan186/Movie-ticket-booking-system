// utils/stringHelpers.js

/**
 * Chuẩn hóa chuỗi tiếng Việt (bỏ dấu, chuyển đổi ký tự đặc biệt)
 * @param {string} str - Chuỗi cần chuẩn hóa
 * @returns {string} Chuỗi đã chuẩn hóa
 */
export const normalizeVietnamese = (str) => {
    if (!str) return '';
    
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Bỏ dấu
      .replace(/đ/g, 'd').replace(/Đ/g, 'D') // Chuyển đ, Đ -> d
      .toLowerCase()
      .trim();
};
  
  /**
   * Kiểm tra username tiếng Việt có trùng nhau không (bỏ qua dấu và khoảng trắng)
   * @param {string} str1 - Chuỗi thứ nhất
   * @param {string} str2 - Chuỗi thứ hai
   * @returns {boolean} Có trùng nhau hay không
   */
export const compareVietnameseUsername = (str1, str2) => {
    if (!str1 || !str2) return false;
    
    const normalized1 = normalizeVietnamese(str1).replace(/\s+/g, '');
    const normalized2 = normalizeVietnamese(str2).replace(/\s+/g, '');
    
    return normalized1 === normalized2;
};
  
const formatStatus = (rawStatus) => {
  return rawStatus
    .split('-')                       // ['coming', 'soon']
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // ['Coming', 'Soon']
    .join(' ');                       // 'Coming Soon'
};