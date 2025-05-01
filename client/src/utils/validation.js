import {
    checkEmpty,
    checkEmail,
    checkPassword,
    checkConfirmPassword,
    checkPhoneNumber
} from './helpers';

// ----- validateLogin.js -----
export const validateLogin = (fields) => {
    const errors = [];

    const input = fields.email?.trim();

    if (!input) {
        const emailErr = checkEmpty(input, 'email', 'số điện thoại hoặc email');
        if (emailErr) errors.push(emailErr);
    } else {
        const isEmail = input.includes('@');
        if (isEmail) {
            const emailErr = checkEmail(input);
            if (emailErr) errors.push(emailErr);
        } else {
            const phoneErr = checkPhoneNumber(input);
            if (phoneErr) errors.push(phoneErr);
        }
    }

    const pwErr = checkPassword(fields.password);
    if (pwErr) errors.push(pwErr);
    console.log(errors);
    return errors;
};


// ----- validateRegister.js -----
export const validateRegister = (fields) => {
    const errors = [];

    // Kiểm tra rỗng cho từng trường cụ thể
    const usernameErr = checkEmpty(fields.username, 'username', 'tên tài khoản');
    if (usernameErr) errors.push(usernameErr);

    const phoneErrEmpty = checkEmpty(fields.phone, 'phone', 'số điện thoại');
    if (phoneErrEmpty) {
        errors.push(phoneErrEmpty);
    } else {
        const phoneErrFormat = checkPhoneNumber(fields.phone,'phone');
        if (phoneErrFormat) errors.push(phoneErrFormat);
    }

    const emailErrEmpty = checkEmpty(fields.email, 'email', 'email');
    if (emailErrEmpty) {
        errors.push(emailErrEmpty);
    } else {
        const emailErrFormat = checkEmail(fields.email);
        if (emailErrFormat) errors.push(emailErrFormat);
    }

    const pwErr = checkPassword(fields.password);
    if (pwErr) errors.push(pwErr);

    const cpwErr = checkConfirmPassword(fields.password, fields.confirmPassword);
    if (cpwErr) errors.push(cpwErr);

    return errors;
};

// ----- validateUpdateInfo.js -----
export const validateUpdateInfo = (fields) => {
    const errors = [];

    const requiredFields = [
        { name: 'username', label: 'tên tài khoản' },
        { name: 'email', label: 'email' },
        { name: 'phone', label: 'số điện thoại' },
    ];

     // Kiểm tra các trường bắt buộc
    requiredFields.forEach(({ name, label }) => {
        const error = checkEmpty(fields[name], name, label);
        if (error) errors.push(error);
    });
    // Kiểm tra định dạng email nếu có giá trị
    if (fields.email) {
        const emailError = checkEmail(fields.email);
        if (emailError) errors.push(emailError);
    }
    // Kiểm tra định dạng số điện thoại nếu có giá trị
    if (fields.phone) {
        const phoneError = checkPhoneNumber(fields.phone,'phone');
        if (phoneError) errors.push(phoneError);
    }
    
    return errors;
};

// ----- validateChangePassword.js -----
export const validateChangePassword = (fields) => {
    const errors = [];

    if (!fields.oldPassword) {
        errors.push({ name: 'oldPassword', message: 'Vui lòng nhập mật khẩu cũ.' });
    }

    const pwErr = checkPassword(fields.newPassword);
    if (pwErr) errors.push({ name: 'newPassword', message: 'Mật khẩu mới không hợp lệ.' });

    const cpwErr = checkConfirmPassword(fields.newPassword, fields.confirmPassword);
    if (cpwErr) errors.push(cpwErr);

    return errors;
};
