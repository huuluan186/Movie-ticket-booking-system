export const getVipPriceIncrementController = (req, res) => {
    try {
        const vipPriceIncrement = parseFloat(process.env.VIP_PRICE_INCREMENT || 1.118);
        return res.status(200).json({ vipPriceIncrement });
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at get client config controller: ' + error.message
        });
    }
};
