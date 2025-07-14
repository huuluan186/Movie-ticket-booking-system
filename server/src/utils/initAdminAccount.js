import db from '../models/index.js';
import { v4 as uuidv4 } from 'uuid';

export const initAdminAccount = async () => {
    try {
        const [admin] = await db.User.findOrCreate({
            where: { username: 'admin' },
            defaults: {
                user_id: uuidv4(),
                username: 'admin',
                password: '$2b$12$dfnX.xeeW8kKkBVhI6FCWuU0qS/mdDYGxNBHmTIsnIebcH4lYOKMS', // đã mã hoá sẵn
                email: 'admin@gmail.com',
                phone: '038038038',
                user_role: 'admin',
            },
        });

        if (admin._options.isNewRecord) {
            console.log('✅ Admin account created');
        } else {
            console.log('ℹ️ Admin account already exists');
        }
    } catch (err) {
        console.error('❌ Failed to init admin account:', err.message);
    }
};
