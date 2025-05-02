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
