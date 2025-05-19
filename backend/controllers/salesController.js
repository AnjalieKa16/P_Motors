// controllers/salesController.js
import { findOrCreateCustomer, createSale} from '../Models/salesModel.js';

export const handlePhysicalSale = async (req, res) => {
  const { phone_number, items, total_amount, employee_id } = req.body;

  if (!phone_number || !items || items.length === 0 || !employee_id || !total_amount) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const customer_id = await findOrCreateCustomer(phone_number);
    const sale_id = await createSale(customer_id, employee_id, total_amount);
    await insertSaleItems(sale_id, items);

    return res.status(200).json({ success: true, message: 'Sale recorded', sale_id });
  } catch (error) {
    console.error('Error handling physical sale:', error.message);
    return res.status(500).json({ success: false, message: 'Failed to process sale' });
  }
};
