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
export const validateUpdateInfo = (fields, originalFields) => {
    const errors = [];

    const requiredFields = [
        { name: 'username', label: 'tên tài khoản' },
        { name: 'email', label: 'email' },
        { name: 'phone', label: 'số điện thoại' },
    ];

    requiredFields.forEach((field) => {
        if (field.name in fields && !fields[field.name]?.trim()) {
            const err = checkEmpty(field.name);
            errors.push(err);
        }
    });

    // Kiểm tra định dạng email
    const emailErr = checkEmail(fields.email);
    if (emailErr) errors.push(emailErr);

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
