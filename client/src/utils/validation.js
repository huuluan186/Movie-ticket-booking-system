export const validateFields = (fields, isRegister = false) => {
    const errors = [];

    if (isRegister) {
        if (!fields.username?.trim()) {
            errors.push({ name: 'username', message: 'Vui lòng nhập tên tài khoản.' });
        }

        if (!fields.phone?.trim()) {
            errors.push({ name: 'phone', message: 'Vui lòng nhập số điện thoại.' });
        } 
        // else if (!/^(0|\+84)[0-9]{9}$/.test(fields.phone)) {
        //     errors.push({ name: 'phone', message: 'Số điện thoại không hợp lệ.' });
        // }

        if (!fields.email?.trim()) {
            errors.push({ name: 'email', message: 'Vui lòng nhập email.' });
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
            errors.push({ name: 'email', message: 'Email không hợp lệ.' });
        }

        if (!fields.password ) {
            errors.push({ name: 'password', message: 'Vui lòng nhập mật khẩu.' });
        }
        if(fields.password && fields.password.length < 6) {
            errors.push({ name: 'password', message: 'Mật khẩu phải có ít nhất 6 ký tự.' });
        }

        if (!fields.confirmPassword) {
            errors.push({ name: 'confirmPassword', message: 'Vui lòng nhập lại mật khẩu xác nhận.' });
        } else if (fields.confirmPassword !== fields.password) {
            errors.push({ name: 'confirmPassword', message: 'Mật khẩu xác nhận không khớp.' });
        }
    } else {
        if (!fields.email?.trim()) {
            errors.push({ name: 'email', message: 'Vui lòng nhập số điện thoại hoặc email.' });
        } else {
            const isEmail = fields.email.includes('@');
            if (isEmail) {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
                    errors.push({ name: 'email', message: 'Email không hợp lệ.' });
                }
            } 
            // else {
            //     // if (!/^(0|\+84)[0-9]{9}$/.test(fields.email)) {
            //     //     errors.push({ name: 'email', message: 'Số điện thoại không hợp lệ.' });
            //     // }
            // }
        }

        if (!fields.password || fields.password.length < 6) {
            errors.push({ name: 'password', message: 'Mật khẩu phải có ít nhất 6 ký tự.' });
        }
    }

    return errors;
};
