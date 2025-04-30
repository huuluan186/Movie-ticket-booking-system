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
export const checkPassword = (password) => {
    if (!password) return { name: 'password', message: 'Vui lòng nhập mật khẩu.' };
    if (password.length < 6) return { name: 'password', message: 'Mật khẩu phải có ít nhất 6 ký tự.' };
    return null;
};

// Kiểm tra xác nhận mật khẩu
export const checkConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) return { name: 'confirmPassword', message: 'Vui lòng nhập lại mật khẩu xác nhận.' };
    if (password !== confirmPassword) return { name: 'confirmPassword', message: 'Mật khẩu xác nhận không khớp.' };
    return null;
};

