// Kiểm tra trống một trường
export const checkEmpty = (value, name, label) => {
    if (!value?.trim()) {
        return { name, message: `Vui lòng nhập ${label}.` };
    }
    return null;
};

// Kiểm tra định dạng email
export const checkEmail = (email) => {
    if (email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { name: 'email', message: 'Email không hợp lệ.' };
    }
    return null;
};

// Kiểm tra mật khẩu
export const checkPassword = (password, fieldName='password') => {
    if (!password) return { name: fieldName, message: 'Vui lòng nhập mật khẩu.' };
    if (password.length < 6) return { name: fieldName, message: 'Mật khẩu phải có ít nhất 6 ký tự.' };
    return null;
};

// Kiểm tra xác nhận mật khẩu
export const checkConfirmPassword = (password, confirmPassword,fieldName='confirmNewPassword') => {
    if (!confirmPassword) return { name: fieldName, message: 'Vui lòng nhập lại mật khẩu xác nhận.' };
    if (password !== confirmPassword) return { name: fieldName, message: 'Mật khẩu xác nhận không khớp.' };
    return null;
};

export const checkPhoneNumber = (phone, fieldName = 'email') => {
    if (!/^\d+$/.test(phone.trim())) return {name: fieldName, message:'Số điện thoại không phải chỉ gồm số.'}
    return null;
}

//đặt name:'email thay vì phone' vì ở đăng nhập sử dụng input chính để đại diện kiểm tra là email

export const BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

export const getImageUrl = (relativePath) => {
    if (!relativePath) return null; // Trả về null nếu không có đường dẫn
    return `${BASE_URL}${relativePath}`;
};

export const formatDate = (dateString) => {
    const date = new Date(dateString); // Chuyển đổi chuỗi thành đối tượng Date
    return date.toLocaleDateString('en-GB'); // Định dạng ngày theo kiểu dd/mm/yyyy
};

// Helper để sắp xếp và phân trang dữ liệu
export const sortMoviesByReleaseDate = (movies, limit = null) => {
    if (movies && movies.length > 0) {
        // Sắp xếp phim theo ngày phát hành
        const sortedMovies = movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        
        // Nếu limit được truyền, cắt mảng theo số lượng phim yêu cầu
        return limit ? sortedMovies.slice(0, limit) : sortedMovies;
    }
    return [];
};

// Hàm chuyển đổi link YouTube sang dạng embed
export const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    // Extract video ID from various YouTube URL formats
    const videoIdMatch = url.match(/(?:v=|\.be\/)([a-zA-Z0-9_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0` : '';
};

// Hàm chuyển đổi văn bản
export const toCapitalize = (str) => {
    return str
      .toLowerCase() // Chuyển thành chữ thường
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ cái đầu
      .join(' ');
};