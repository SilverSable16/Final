const db = require('../config/db.config.js');
const Factura = db.Factura;  // Modelo Factura
const DetalleFactura = db.DetalleFactura;  // Modelo DetalleFactura

async function getNextFacturaNumber() {
    try {
        const result = await db.sequelize.query(`SELECT SEQ_FACTURA.NEXTVAL AS noFactura FROM DUAL`, {
            type: db.Sequelize.QueryTypes.SELECT
        });
        const noFactura = result[0].NO_FACTURA; 
        console.log('Número de factura generado:', noFactura);
        return noFactura;
    } catch (err) {
        console.error(err);
        throw new Error('Error al obtener el número de factura');
    }
}

exports.realizarCompra = async (req, res) => {
    const t = await db.sequelize.transaction();

    try {
        const { idCliente, idEmpleado, idSucursal, productos, total, correo } = req.body;

        if (!idCliente || !idSucursal || !productos || productos.length === 0 || !total || !correo) {
            return res.status(400).json({ message: 'Datos incompletos en la solicitud' });
        }

        const noFactura = await getNextFacturaNumber();

        // Verificar si ya existe una factura con ese número
        const existingFactura = await Factura.findOne({ where: { noFactura } });
        if (existingFactura) {
            return res.status(409).json({ message: 'El número de factura ya existe.' });
        }

        const nuevaFactura = await Factura.create({
            noFactura,
            serieFactura: 'A',
            fechaFactura: new Date(),
            idCliente,
            idEmpleado,
            idSucursal,
            total,
            correo
        }, { transaction: t });

        let idDetalleIncremental = 1;

        for (let i = 0; i < productos.length; i++) {
            const producto = productos[i];

            if (!producto.idAlimento || !producto.lugarCompra || !producto.costo) {
                throw new Error('Datos incompletos en los productos');
            }

            await DetalleFactura.create({
                idDetalle: idDetalleIncremental++, 
                noFactura: nuevaFactura.noFactura,
                serieFactura: nuevaFactura.serieFactura,
                idAlimento: producto.idAlimento,
                noReserva: producto.noReserva || null,
                costo: producto.costo,
                fechaCompra: new Date(),
                lugarCompra: producto.lugarCompra
            }, { transaction: t });
        }

        await t.commit();

        res.status(201).json({ message: 'Compra realizada con éxito', factura: nuevaFactura });
    } catch (error) {
        await t.rollback();
        console.error('Error en la compra:', error);
        res.status(500).json({ message: 'Error al realizar la compra', error: error.message });
    }
};

exports.retrieveFacturasByCliente = async (req, res) => {
    try {
        const { idCliente } = req.params;

        const facturas = await db.Factura.findAll({
            where: { idCliente: idCliente },
            attributes: ['noFactura', 'serieFactura', 'fechaFactura', 'total']
        });

        if (facturas.length === 0) {
            return res.status(404).json({ message: `No se encontraron facturas para el cliente con id ${idCliente}.` });
        }

        res.status(200).json({
            message: `Facturas para el cliente con id ${idCliente} obtenidas exitosamente.`,
            facturas: facturas
        });

    } catch (error) {
        console.error("Error al obtener las facturas:", error);
        res.status(500).json({ message: "Error al obtener las facturas", error: error.message });
    }
};
