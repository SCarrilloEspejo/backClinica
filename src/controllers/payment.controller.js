const paymentService = require('../services/payment.service');

const createPaymentMethod = async (req, res) => {
  try {
    const data = req.body;
    const newPayment = await paymentService.createPaymentMethod(data);
    res.status(201).json({ success: true, message: 'Forma de pago creada exitosamente', data: newPayment });
  } catch (error) {
    console.error('Error en createPaymentMethod:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    res.status(status).json({ success: false, message });
  }
};

const updatePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updated = await paymentService.updatePaymentMethod(parseInt(id), data);
    res.json({ success: true, message: 'Forma de pago actualizada exitosamente', data: updated });
  } catch (error) {
    console.error('Error en updatePaymentMethod:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    res.status(status).json({ success: false, message });
  }
};

const getAllPaymentMethods = async (req, res) => {
  try {
    const txtSearch = req.headers.txtsearch || req.headers.txtSearch || '';
    const list = await paymentService.getAllPaymentMethods(txtSearch);
    res.json({ success: true, message: txtSearch ? 'Búsqueda completada' : 'Formas de pago obtenidas exitosamente', data: list, count: list.length, search: txtSearch || null });
  } catch (error) {
    console.error('Error en getAllPaymentMethods:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    res.status(status).json({ success: false, message });
  }
};

const getPaymentMethodById = async (req, res) => {
  try {
    const { id } = req.params;
    const pm = await paymentService.getPaymentMethodById(parseInt(id));
    res.json({ success: true, message: 'Forma de pago obtenida exitosamente', data: pm });
  } catch (error) {
    console.error('Error en getPaymentMethodById:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    res.status(status).json({ success: false, message });
  }
};

const searchPaymentMethodsByField = async (req, res) => {
  try {
    const { field, value } = req.params;
    const results = await paymentService.searchPaymentMethodsByField(field, value);
    res.json({ success: true, message: 'Búsqueda completada', data: results, count: results.length });
  } catch (error) {
    console.error('Error en searchPaymentMethodsByField:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    res.status(status).json({ success: false, message });
  }
};

const deletePaymentMethod = async (req, res) => {
  try {
    const paymentId = req.headers.paymentid || req.headers.paymentId || req.headers.formadepagoid;
    if (!paymentId) {
      return res.status(400).json({ success: false, message: "El ID de la forma de pago es requerido en los headers (paymentId)" });
    }

    const result = await paymentService.deletePaymentMethod(parseInt(paymentId));
    res.json({ success: true, message: result.message, data: { id: result.id } });
  } catch (error) {
    console.error('Error en deletePaymentMethod:', error);
    const status = error.status || 500;
    const message = error.message || 'Error interno del servidor';
    res.status(status).json({ success: false, message });
  }
};

module.exports = {
  createPaymentMethod,
  updatePaymentMethod,
  getAllPaymentMethods,
  getPaymentMethodById,
  searchPaymentMethodsByField,
  deletePaymentMethod
};
