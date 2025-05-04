export const toSlug = (str) => {
    return str
      .toLowerCase()
      .normalize("NFD") // Tách dấu khỏi ký tự gốc
      .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
      .replace(/đ/g, "d") // Chuyển đ -> d
      .replace(/[^a-z0-9 -]/g, "") // Xóa ký tự đặc biệt
      .replace(/\s+/g, "-") // Thay dấu cách bằng dấu -
      .replace(/-+/g, "-") // Xóa dấu - thừa
      .trim(); // Xóa khoảng trắng đầu & cuối
};