import cron from 'node-cron';
import { autoDeleteShowtimesService } from './src/services/showtime.js';

// Chạy mỗi 5 phút
cron.schedule('*/5 * * * *', async () => {
    console.log('Chạy tự động xóa suất chiếu cũ...');
    try {
        const result = await autoDeleteShowtimesService();
        console.log(result.msg);
    } catch (error) {
        console.error('Lỗi khi xóa suất chiếu tự động:', error);
    }
});