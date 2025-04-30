import {
    checkEmpty,
    checkEmail,
    checkPassword,
    checkConfirmPassword
} from './helpers';

// ----- validateLogin.js -----
export const validateLogin = (fields) => {
    const errors = [];

    const emailErr = checkEmpty(fields.email, 'email', 'số điện thoại hoặc email') || checkEmail(fields.email);
    if (emailErr) errors.push(emailErr);

    const pwErr = checkPassword(fields.password);
    if (pwErr) errors.push(pwErr);

    return errors;
};

// ----- validateRegister.js -----
export const validateRegister = (fields) => {
    const errors = [];

    ['username', 'phone', 'email'].forEach(name => {
        const err = checkEmpty(fields[name], name, name === 'username' ? 'tên tài khoản' : name);
        if (err) errors.push(err);
    });

    const emailErr = checkEmail(fields.email);
    if (emailErr) errors.push(emailErr);

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

    requiredFields.forEach(({ name, label }) => {
        const err = checkEmpty(fields[name], name, label);
        if (err) errors.push(err);
    });

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
